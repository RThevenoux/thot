var shownPopulationSize = 10;

// Define nodes
var topPerformers = [];
for(let i=0;i<shownPopulationSize;i++){
  topPerformers.push({
    label: document.getElementById('top-performer'+i),
    score: document.getElementById('score'+i)
  });
}

var inputNode = document.getElementById('textBox');
var evolveStartNode = document.getElementById('start-evolve');
var mutationRateNode = document.getElementById('mutation-rate');
var sexNumberNode = document.getElementById('sex-number');
var popSizeNode = document.getElementById('pop-size');
var selectionBiasNode = document.getElementById('selection-bias');
var elitesNode = document.getElementById('elites');
var ipaNode = document.getElementById('ipa');

var listener = {
  newGeneration(sortedPop, sortedScores,generation){
    console.log('generations #'+generation+" best:"+sortedPop[0]);
    displayData(sortedPop, sortedScores);
  },

  finish(sortedPop, sortedScores,generation){
    displayData(sortedPop, sortedScores);
    topPerformers[0].label.style.color = 'darkgreen';
    console.log("WINNER : "+sortedPop[0]+" score:"+sortedScores[0]);
  }
};

// Click Event
mutationRateNode.onchange = () => {mutationRate = mutationRateNode.value};
selectionBiasNode.onchange = () => {sBias = selectionBiasNode.value};
sexNumberNode.onchange = () => {sexNumber = sexNumberNode.value};
popSizeNode.onchange = () => {popSize = popSizeNode.value};
elitesNode.onchange = () => {elites = elitesNode.value};
evolveStartNode.onclick = () => {
  let ipaTarget = inputNode.value;
  console.log("Begin evolution. Target: "+ ipaTarget);
  topPerformers[0].label.style.color = 'darkorange';

  beginEvolution(ipaTarget, listener);
};

// Set up default display
mutationRateNode.value = mutationRate;
sexNumberNode.value = sexNumber;
popSizeNode.value = popSize;
selectionBiasNode.value = sBias;
elitesNode.value = elites;

function addIPA(value){
  inputNode.value += value;
}

function displayData(sortedPop, sortedScores) {
  for(let i=0;i<shownPopulationSize;i++){
    topPerformers[i].label.textContent = getStringFromGenome(sortedPop[i]);
    topPerformers[i].score.textContent = sortedScores[i];
  }
}

function getStringFromGenome(genome) {
  return String.prototype.concat(...genome);
}