var mutationRate = 0.10;
var sexNumber = 4;
var sBias = 0.8;
var popSize = 30;
var elites = 3;

function beginEvolution(ipaTarget){
  let ipaPhonemes = parsePhonemes(ipaTarget);
  let targetPhonoVectors = phonemesToFeatures(ipaPhonemes);
  
  let initialPopulation = generateRandomPopulation(popSize, targetPhonoVectors, ipaPhonemes);

  evolution(targetPhonoVectors, initialPopulation, 0, listener);
}

function evolution(targetFeatures, population, generation, listener) {
  population.sort((a, b) => a.score - b.score);

  if(isConvergence(population, generation)){
    listener.finish(population, generation);
  } else {
    newPopulation = generateNewPopulation(population, targetFeatures);  
     setTimeout(()=>evolution(targetFeatures, newPopulation, generation+1, listener), 0);
     listener.newGeneration(population, generation);
  } 
}

function selectParents(population) {
  let weightsArray = getWeights(population);
  let selectedParents = [];
  let s = 0;
  while (s < sexNumber) {
    let selectedIndex = weightedRandSelection(weightsArray);
    selectedParents.push(population[selectedIndex].kanas);
    s++;
  }
  return selectedParents;
}

function weightedRandSelection(weights) {
  var sumOfWeights = weights.reduce((a,b)=>a+b);
  var i, sum = 0, r = Math.random()*sumOfWeights;
  for (i in weights) {
    sum += weights[i];
    if (r <= sum) return i;
  }
}

function getWeights(population) {
  return population.map(indivual => 1/(indivual.score^sBias));
}

function mateGenomes(parents) {

  let n = parents.length;
  let chunk = Math.floor(parents[0].length / n);

  let newGenome = [];

  for(let i=0 ; i<n ; i++){
    let startIndex = i*chunk;
    let endIndex = (i === n-1? parents[0].length : (i+1)*chunk);
    newGenome = newGenome.concat(parents[i].slice(startIndex, endIndex));
  }

  return newGenome;
}

function generateNewPopulation(population, targetFeatures) {
  let newGeneration = [];

  for(let i=0;i< popSize;i++){
    if(i < elites) {
      newGeneration.push(population[i]);
    } else {
      
      let selectedParents = selectParents(population);
      let unmutatedChild = mateGenomes(selectedParents);
      let child = mutateGenome(unmutatedChild);

      newGeneration.push(createIndivudual(child, targetFeatures));
    }
  }

  return newGeneration;
}

function createIndivudual(kanas, targetFeatures){
    let challengerIpa = kanasToIpa(kanas);
    let challengerPhonemes = parsePhonemes(challengerIpa);
    let challengerFeatures = phonemesToFeatures(challengerPhonemes); 
    let score =  getLevenshtein(challengerFeatures, targetFeatures, featureSchema);

    return {
        kanas:kanas,
        display:String.prototype.concat(...kanas),
        score:score
    }
}

function generateRandomPopulation(popSize, targetFeatures, ipaPhonemes) {
  let population = [];

  for(let i=0;i<popSize;i++) {
    let kanas = generateRandomKanas(ipaPhonemes);
    population.push(createIndivudual(kanas, targetFeatures));
  }

  return population;
}

function isConvergence(population, generation){
  return population[0].score == 0 || generation > 1000 ;
}