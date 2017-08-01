class GeneticRun {

  /**
   * 
   * @param {String} ipaTarget 
   * @param {*} alphabet 
   * @param {AbstractFeatureSet} featureSet 
   * @param {AbstractFeatureComparator} featureComparator 
   * @param {ParameterModel} parameters 
   */
  constructor(ipaTarget, alphabet, featureSet, featureComparator, parameters) {
    this.parameters = parameters;
    this.alphabet = alphabet;
    this.ipaTarget = ipaTarget;
    this.scorer = new Scorer(ipaTarget, featureSet, featureComparator);
    this.generator = new Generator(this.alphabet, this.parameters);
    this.population = new Population(parameters.sBiais);
  }

  start(listener){
    this.listener = listener;
    this.stopped = false;
    this.listener.started(this.ipaTarget);

    this._initializePopulation(this.ipaTarget);
    this._evolution();
  }

  stop(){
    this.stopped=true;
  }

  _evolution() {
    if(this.stopped){
      this.listener.stopped();
    }else if (this._isConvergence()) {
      this.listener.finished(this.population, this.generation);
    } else {
      this._newGeneration();
      this.listener.newGeneration(this.population, this.generation);
      setTimeout(() => this._evolution(), 0);
    }
  }

  /**
   * @param {String} ipaTarget 
   */
  _initializePopulation(ipaTarget) {
    let newGeneration = [];
    for (let i = 0; i < this.parameters.popSize; i++) {
      let genome = this.alphabet.generateRandomGenome(ipaTarget);
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
    let score = this.scorer.computeScore(phenotype.ipa);
    return {
      genome: genome,
      display: phenotype.display,
      ipa: phenotype.ipa,
      score: score
    }
  }

  _isConvergence() {
    return this.population.getBest().score == 0 || this.population.generation > this.parameters.maxGeneration;
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