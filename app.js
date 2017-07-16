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

var listener = {
  newGeneration(population, generation){
    console.log('generations #'+generation+" best:"+population[0].kanas);
    displayData(population);
  },

  finish(population, generation){
    displayData(population);
    topPerformers[0].label.style.color = 'darkgreen';
    console.log("WINNER : "+population[0].kanas+" score:"+population[0].score);
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

window.onload = () => {
  // Set up default display
  mutationRateNode.value = mutationRate;
  sexNumberNode.value = sexNumber;
  popSizeNode.value = popSize;
  selectionBiasNode.value = sBias;
  elitesNode.value = elites;
}

function addIPA(value){
  inputNode.value += value;
}

function displayData(population) {
  for(let i=0; i<topPerformers.length; i++){
    topPerformers[i].label.textContent = population[i].display;
    topPerformers[i].score.textContent = population[i].score;
  }
}