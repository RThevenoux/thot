class GeneticRun {

  /**
   * 
   * @param {String} ipaTarget 
   * @param {*} alphabet 
   * @param {AbstractFeatureSet} featureSet 
   * @param {AbstractFeatureComparator} featureComparator 
   * @param {ParameterModel} parameters 
   */
  constructor(alphabet, featureSet, featureComparator, ipaParser, parameters) {
    this.parameters = parameters;
    this.alphabet = alphabet;
    this.ipaParser = ipaParser;

    this.scorer = new Scorer(featureSet, featureComparator);
    this.generator = new Generator(this.alphabet, this.parameters);
    this.population = new Population(parameters.sBiais);
  }

  start(ipaTarget, listener) {
    this.listener = listener;
    this.stopped = false;
    this.targetPhonemes = this.ipaParser.parsePhonemes(ipaTarget);
    this.scorer.setTargetPhonemes(this.targetPhonemes);
    this._initializePopulation();

    this._evolution();

    this.listener.started(ipaTarget);
  }

  stop() {
    this.stopped = true;
  }

  _evolution() {
    if (this.stopped) {
      this.listener.stopped();
    } else if (this._isConvergence()) {
      this.listener.finished(this.population, this.generation);
    } else {
      this._newGeneration();
      this.listener.newGeneration(this.population, this.generation);
      setTimeout(() => this._evolution(), 0);
    }
  }

  _initializePopulation() {
    let newGeneration = [];
    for (let i = 0; i < this.parameters.popSize; i++) {
      let genome = this.alphabet.generateRandomGenome(this.targetPhonemes);
      let individual = this._createIndivudual(genome);
      newGeneration.push(individual);
    }
    this.population.newGeneration(newGeneration);
  }

  /**
   * 
   * @param {Genome} genome
   * @returns {Individual} 
   */
  _createIndivudual(genome) {
    let phenotype = this.alphabet.generatePhenotype(genome);
    let phonemes = this.ipaParser.parsePhonemes(phenotype.ipa);
    let distance = this.scorer.computeDistance(phonemes);

    let score = Math.max(0, 1 - distance / this.targetPhonemes.length);

    return {
      genome: genome,
      display: phenotype.display,
      ipa: phenotype.ipa,
      distance: distance,
      score: score
    }
  }

  _isConvergence() {
    return this.population.getBest().distance == 0 || this.population.generation > this.parameters.maxGeneration;
  }

  _newGeneration() {
    let eliteNumber = this.parameters.elites;
    let popSize = this.parameters.popSize;

    // Keep the elite individual
    let newGeneration = this.population.getElite(eliteNumber);

    // Generate other individual
    for (let i = eliteNumber; i < popSize; i++) {
      let genome = this.generator.generateGenome(this.population);
      let indivual = this._createIndivudual(genome);
      newGeneration.push(indivual);
    }

    this.population.newGeneration(newGeneration);
  }
}