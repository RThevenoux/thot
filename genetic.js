var mutationRate = 0.10;
var sexNumber = 4;
var sBias = 0.8;
var popSize = 30;
var elites = 3;

function beginEvolution(ipaTarget){
  let ipaPhonemes = parsePhonemes(ipaTarget);
  let targetPhonoVectors = phonemesToFeatures(ipaPhonemes);
  
  let initialPop = generateRandomPopulation(popSize, ipaPhonemes);
  let initialScores = getScoresForEntirePopulation(initialPop, targetPhonoVectors);

  evolution(targetPhonoVectors, initialPop, initialScores, 0, listener);
}

function evolution(targetPhonoVectors, pop, scores, generation, listener) {
  let [sortedPop, sortedScores] = getSortedPopAndScores(scores, pop);
  pop = generateNewPopulation(sortedPop, sortedScores);
  scores = getScoresForEntirePopulation(pop, targetPhonoVectors);

  if(isConvergence(sortedPop, sortedScores, generation)){
    listener.finish(sortedPop, sortedScores, generation);
  } else {
    setTimeout(()=>evolution(targetPhonoVectors, pop, scores, generation+1, listener), 0);
    listener.newGeneration(sortedPop, sortedScores, generation);
  } 
}

function getSortedPopAndScores(scoresArray, popArray) {
  //1) combine the arrays:
  var list = [];
  for (var j in scoresArray)
      list.push({'genome': popArray[j], 'score': scoresArray[j]});
  
  //2) sort:
  list.sort(function(a, b) {
      return ((a.score < b.score) ? -1 : ((a.score == b.score) ? 0 : 1));
  });
  
  //3) separate them back out:
  for (var k = 0; k < list.length; k++) {
      popArray[k] = list[k].genome;
      scoresArray[k] = list[k].score;
  }
    
  return [popArray, scoresArray];
}

function selectNindividuals(popArray, scoresArray) {
  let weightsArray = getWeights(scoresArray);
  let selectedIndividuals = [];
  let s = 0;
  while (s < sexNumber) {
    selectedIndividuals.push(popArray[weightedRandSelection(weightsArray)]);
    s++;
  }
  return selectedIndividuals;
}

function weightedRandSelection(weights) {
  var sumOfWeights = weights.reduce((a,b)=>a+b);
  var i, sum = 0, r = Math.random()*sumOfWeights;
  for (i in weights) {
    sum += weights[i];
    if (r <= sum) return i;
  }
}

function getWeights(scores) {
  return scores.map(s => 1/(s^sBias));
}

function mateGenomesGetNewGenome(...args) {
  let n = args.length;
  let chunk = Math.floor(args[0].length / n);
  let m = 0;
  let newGenome = [];
  while (m < n){
    if(m === n-1){
      newGenome = newGenome.concat(args[m].slice(m*chunk, args[0].length));
    }
    else {
      newGenome = newGenome.concat(args[m].slice(m*chunk, (m+1)*chunk));
    }
    m++;
  }
  return mutateGenome(newGenome);
}

function getScoresForEntirePopulation(population, targetPhonoVectors) {
  let newScores = [];
  let j = 0;
  while (j < population.length) {
    newScores.push(getScore(population[j], targetPhonoVectors));
    j++;
  }
  return newScores;
}

function getScore(kanas, targetPhonoVectors) {
    let challengerIpa = kanasToIpa(kanas);
    let challengerPhonemes = parsePhonemes(challengerIpa);
    let challengerFeatures = phonemesToFeatures(challengerPhonemes); 
    return getLevenshtein(challengerFeatures, targetPhonoVectors,featureSchema);
}

function generateNewPopulation(sortedPop, sortedScores) {
  let newGeneration = [];
  let p = 0;
  while(p < popSize) {
    if(p < elites) {
      newGeneration.push(sortedPop[p]);
    }
    else {
      newGeneration.push(
        mateGenomesGetNewGenome(
          ...selectNindividuals(sortedPop, sortedScores)
        )
      );
    }
    p++;
  }
  return newGeneration;
}

function generateRandomPopulation(popSize, ipaPhonemes) {
  let population = [];

  for(i=0;i<popSize;i++) {
    population.push(generateRandomKanas(ipaPhonemes));
  }

  return population;
}

function isConvergence(sortedPop, sortedScores,generation){
  return sortedScores[0] == 0 || generation > 1000 ;//|| isExtremum(sortedPop);
}

function isExtremum(sortedPop){
  let rate = 0.9;
  for(j=0;j<sortedPop.length*rate;j++){
    if(! isGenomeEquals(sortedPop[0],sortedPop[j])){
      return false;
    }
  }

  return true;
}

function isGenomeEquals(genomeA, genomeB){
  if(genomeA.length != genomeB.length){
    return false;
  }

  for(i=0; i<genomeA.length ; i++){
    if(genomeA[i] != genomeB[i]){
      return false;
    }
  }

  return true;
}