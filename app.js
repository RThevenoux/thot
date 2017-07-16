var target = "";
var lowestScore = Infinity;
var topPerformerGenome = [];
var mutationRate = 0.10;
var sexNumber = 4;
var sBias = 0.8;
var popSize = 30;
var elites = 3;

// Define character space
const CHAR_SPACE_MIN = 32;
const CHAR_SPACE_MAX = 126;

// Define nodes
var topPerformerNode1 = document.getElementById('top-performer1');
var topPerformerNode2 = document.getElementById('top-performer2');
var topPerformerNode3 = document.getElementById('top-performer3');
var topPerformerNode4 = document.getElementById('top-performer4');
var topPerformerNode5 = document.getElementById('top-performer5');
var topPerformerNode6 = document.getElementById('top-performer6');
var topPerformerNode7 = document.getElementById('top-performer7');
var topPerformerNode8 = document.getElementById('top-performer8');
var topPerformerNode9 = document.getElementById('top-performer9');
var topPerformerNode10 = document.getElementById('top-performer10');

var scoreNode1 = document.getElementById('score1');
var scoreNode2 = document.getElementById('score2');
var scoreNode3 = document.getElementById('score3');
var scoreNode4 = document.getElementById('score4');
var scoreNode5 = document.getElementById('score5');
var scoreNode6 = document.getElementById('score6');
var scoreNode7 = document.getElementById('score7');
var scoreNode8 = document.getElementById('score8');
var scoreNode9 = document.getElementById('score9');
var scoreNode10 = document.getElementById('score10');

var inputNode = document.getElementById('textBox');
var evolveStartNode = document.getElementById('start-evolve');
var mutationRateNode = document.getElementById('mutation-rate');
var sexNumberNode = document.getElementById('sex-number');
var popSizeNode = document.getElementById('pop-size');
var selectionBiasNode = document.getElementById('selection-bias');
var elitesNode = document.getElementById('elites');
var ipaNode = document.getElementById('ipa');


// Click Event
evolveStartNode.onclick = () => beginEvolution(inputNode.value);
mutationRateNode.onchange = () => {mutationRate = mutationRateNode.value};
selectionBiasNode.onchange = () => {sBias = selectionBiasNode.value};
sexNumberNode.onchange = () => {sexNumber = sexNumberNode.value};
popSizeNode.onchange = () => {popSize = popSizeNode.value};
elitesNode.onchange = () => {elites = elitesNode.value};

// Set up default display
mutationRateNode.value = mutationRate;
sexNumberNode.value = sexNumber;
popSizeNode.value = popSize;
selectionBiasNode.value = sBias;
elitesNode.value = elites;

function addIPA(value){
  inputNode.value += value;
}

function beginEvolution(target) {

  let ipaPhonemes = parsePhonemes(target);
  let targetPhonoVectors = phonemesToFeatures(ipaPhonemes);

  topPerformerNode1.style.color = 'darkorange';
  
  let initialPop = generateRandomPopulationOfSize(popSize);
  let initialScores = getScoresForEntirePopulation(initialPop, targetPhonoVectors);

  evolution(targetPhonoVectors, initialPop, initialScores,0);
}

function evolution(targetPhonoVectors, pop, scores, generation) {
  let [sortedPop, sortedScores] = getSortedPopAndScores(scores, pop);
  pop = generateNewPopulation(sortedPop, sortedScores);
  scores = getScoresForEntirePopulation(pop, targetPhonoVectors);
  console.log('generations #'+generation+" best:"+sortedPop[0]);

  if(isConvergence(sortedPop, sortedScores,generation)){
    displayData(sortedPop, sortedScores);
    topPerformerNode1.style.color = 'darkgreen';
    console.log("WINNER : "+sortedPop[0]);
    return;
  } else {
    setTimeout(()=>evolution(targetPhonoVectors, pop, scores, generation+1), 0);
    displayData(sortedPop, sortedScores);
  } 
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


function displayData(sortedPop, sortedScores) {
  topPerformerNode1.textContent = getStringFromGenome(sortedPop[0]);
  topPerformerNode2.textContent = getStringFromGenome(sortedPop[1]);
  topPerformerNode3.textContent = getStringFromGenome(sortedPop[2]);
  topPerformerNode4.textContent = getStringFromGenome(sortedPop[3]);
  topPerformerNode5.textContent = getStringFromGenome(sortedPop[4]);
  topPerformerNode6.textContent = getStringFromGenome(sortedPop[5]);
  topPerformerNode7.textContent = getStringFromGenome(sortedPop[6]);
  topPerformerNode8.textContent = getStringFromGenome(sortedPop[7]);
  topPerformerNode9.textContent = getStringFromGenome(sortedPop[8]);
  topPerformerNode10.textContent = getStringFromGenome(sortedPop[9]);
  scoreNode1.textContent = sortedScores[0];
  scoreNode2.textContent = sortedScores[1];
  scoreNode3.textContent = sortedScores[2];
  scoreNode4.textContent = sortedScores[3];
  scoreNode5.textContent = sortedScores[4];
  scoreNode6.textContent = sortedScores[5];
  scoreNode7.textContent = sortedScores[6];
  scoreNode8.textContent = sortedScores[7];
  scoreNode9.textContent = sortedScores[8];
  scoreNode10.textContent = sortedScores[9];
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
    console.log("challengerIpa: "+challengerIpa);
    let challengerPhonemes = parsePhonemes(challengerIpa);
    let challengerFeatures = phonemesToFeatures(challengerPhonemes); 
    return getLevenshtein(challengerFeatures, targetPhonoVectors,featureSchema);
}

function generateRandomPopulationOfSize() {
  let randPopulation = [];
  for(i=0;i<popSize;i++) {
    randPopulation.push(generateRandomGenomeOfLength());
  }
  return randPopulation;
}

function generateRandomGenomeOfLength() {
  return [getRandomKana(),getRandomKana(),getRandomKana(),getRandomKana(),getRandomKana(),getRandomKana(),getRandomKana(),getRandomKana()];
}

function getStringFromGenome(genome) {
  return String.prototype.concat(...genome);
}