var geneticParameters = {
  mutationRate: 0.10,
  parentPerChild: 4,
  sBias: 0.8,
  popSize: 30,
  elites: 3, //should be less then popSize. Else unmanaged error.
  maxGeneration: 1000
};

// GENETIC RUN - BEGIN {
function GeneticRun(ipaTarget, alphabet, featureSchema){
  
  // # declare methodes
  this.evolution = _evolution;
  this._createIndivudual = _createIndivudual;
  this._isConvergence = _isConvergence;
  this._generateRandomPopulation = _generateRandomPopulation;
  this._newGeneration = _newGeneration;
  
  // # init values
  this.alphabet = alphabet;
  this.ipaTarget = ipaTarget;// not used ?
  this.targetPhonemes = parsePhonemes(ipaTarget);
  this.scorer = new Scorer(this.targetPhonemes, featureSchema);
  
  // population
  this.generation = 0;
  this.population = this._generateRandomPopulation();
}

function _evolution(listener) {
  if(this._isConvergence()){
    listener.finish(this.population, this.generation);
  } else {
    this._newGeneration();
    listener.newGeneration(this.population, this.generation);
    setTimeout(() => this.evolution(listener), 0);
  } 
}

function _generateRandomPopulation() {
  let population = [];

  for(let i=0; i<geneticParameters.popSize; i++) {
    let genome = this.alphabet.generateRandomGenome(this.targetPhonemes);
    let individual = this._createIndivudual(genome);
    population.push(individual);
  }

  population.sort((a, b) => a.score - b.score);

  return population;
}

function _createIndivudual(genome){
    let phenotype = this.alphabet.generatePhenotype(genome);
    let phonemes = parsePhonemes(phenotype.ipa);
    let score = this.scorer.computeScore(phonemes);

    return {
        genome: genome,
        display: phenotype.display,
        ipa: phenotype.ipa,
        score: score
    }
}

function _isConvergence(){
  return this.population[0].score == 0 || this.generation > geneticParameters.maxGeneration ;
}

function _newGeneration(){
   // Keep the elite individual
  let newGeneration = this.population.slice(0, geneticParameters.elites);
  
  // Generate other individual
  for(let i=geneticParameters.elites; i< geneticParameters.popSize; i++){
      let parentGenomes = selectParentGenomes(this.population);
      let unmutatedGenome = mateGenomes(parentGenomes);
      let childGenome = this.alphabet.mutateGenome(unmutatedGenome, geneticParameters.mutationRate);
      let indivual = this._createIndivudual(childGenome);
      newGeneration.push(indivual);
  }

  this.population = newGeneration.sort((a, b) => a.score - b.score); 
  this.generation++;
}
// GENETIC RUN - END }

// -- Parent selection -- START
function selectParentGenomes(population) {
  let weightsArray = getWeights(population);
  let selectedGenomes = [];
  
  for(let i=0; i<geneticParameters.parentPerChild; i++) {
    let selectedIndex = weightedRandSelection(weightsArray);
    let genome = population[selectedIndex].genome;
    selectedGenomes.push(genome);
  }

  return selectedGenomes;
}

function weightedRandSelection(weights) {
  let sumOfWeights = weights.reduce((a,b)=>a+b);
  let i, sum = 0, r = Math.random()*sumOfWeights;
  for (i in weights) {
    sum += weights[i];
    if (r <= sum) return i;
  }
}

function getWeights(population) {
  return population.map(indivual => 1/(indivual.score ^ geneticParameters.sBias));
}

// -- Parent selection -- END
function mateGenomes(parents) {
  let n = parents.length;
  let chunkSize = Math.floor(parents[0].length / n);

  let newGenome = [];

  for(let i=0 ; i<n ; i++){
    let startIndex = i*chunkSize;
    let endIndex = (i === n-1? parents[0].length : (i+1)*chunkSize);
    let chunk = parents[i].slice(startIndex, endIndex);
    newGenome = newGenome.concat(chunk);
  }

  return newGenome;
}