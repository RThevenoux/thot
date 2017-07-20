var geneticParameters = {
  mutationRate: 0.10,
  parentPerChild: 4,
  sBias: 0.8,
  popSize: 30,
  elites: 3, //should be less then popSize. Else unmanaged error.
  maxGeneration: 1000
};

// GENETIC RUN - BEGIN {
class GeneticRun {

  constructor(ipaTarget, alphabet, featureSet, featureComparator) {
    this.alphabet = alphabet;
    this.ipaTarget = ipaTarget;
    this.scorer = new Scorer(ipaTarget, featureSet, featureComparator);
    this.generator = new Generator(this.alphabet);

    this._initializePopulation(ipaTarget);
  }

  start(listener){
    this.listener = listener;
    this.stopped = false;
    this.listener.started(this.ipaTarget);
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

  _initializePopulation(ipaTarget) {
    let targetPhonemes = IPA.parsePhonemes(ipaTarget);

    let newPpopulation = [];
    for (let i = 0; i < geneticParameters.popSize; i++) {
      let genome = this.alphabet.generateRandomGenome(targetPhonemes);
      let individual = this._createIndivudual(genome);
      newPpopulation.push(individual);
    }

    this.population = newPpopulation.sort((a, b) => a.score - b.score);
    this.generation = 0;
  }

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
    return this.population[0].score == 0 || this.generation > geneticParameters.maxGeneration;
  }

  _newGeneration() {
    let eliteNumber = geneticParameters.elites;
    let popSize = geneticParameters.popSize;

    // Keep the elite individual
    let newGeneration = this.population.slice(0, eliteNumber);

    // Generate other individual
    for (let i = geneticParameters.elites; i < popSize; i++) {
      let genome = this.generator.generateGenome(this.population);
      let indivual = this._createIndivudual(genome);
      newGeneration.push(indivual);
    }

    this.population = newGeneration.sort((a, b) => a.score - b.score);
    this.generation++;
  }
}