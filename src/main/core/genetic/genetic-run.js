class GeneticRun {

  /**
   * @param {AbstractFeatureMapper} featureMapper 
   * @param {FeatureSetComparator} featureSetComparator
   * @param {IpaParser} ipaParser
   * @param {ParameterModel} parameters 
   */
  constructor(featureMapper, featureSetComparator, ipaParser, parameters) {
    this.parameters = parameters;
    this.ipaParser = ipaParser;

    this.scorer = new Scorer(featureMapper, featureSetComparator);
    this.generator = new Generator(this.parameters);
    this.population = new Population(parameters.sBiais);
  }

  /**
   * 
   * @param {String} ipaTarget an valid IPA string
   * @param {*} alphabet 
   * @param {*} listener 
   */
  start(ipaTarget, alphabet, listener) {
    this.listener = listener;
    this.stopped = false;
    this.targetPhonemes = this.ipaParser.parsePhonemes(ipaTarget);
    this.scorer.setTargetPhonemes(this.targetPhonemes);
    this._initializePopulation(alphabet);

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

  _initializePopulation(alphabet) {
    let newGeneration = [];
    for (let i = 0; i < this.parameters.popSize; i++) {
      let genotype = alphabet.generateRandomGenotype(this.targetPhonemes);
      let individual = this._createIndivudual(genotype);
      newGeneration.push(individual);
    }
    this.population.newGeneration(newGeneration);
  }

  /**
   * 
   * @param {Genotype} genotype
   * @returns {Individual} 
   */
  _createIndivudual(genotype) {
    let phenotype = genotype.generatePhenotype();
    let phonemes = this.ipaParser.parsePhonemes(phenotype.ipa);
    let distance = this.scorer.computeDistance(phonemes);

    let score = Math.max(0, 1 - distance / this.targetPhonemes.length);

    return new Individual(genotype, phenotype.display, phenotype.ipa, distance, score);
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
      let genotype = this.generator.generateGenotype(this.population);
      let indivual = this._createIndivudual(genotype);
      newGeneration.push(indivual);
    }

    this.population.newGeneration(newGeneration);
  }
}