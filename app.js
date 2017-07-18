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
var parentPerChildNode = document.getElementById('parent-per-child');
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

var alphabet;
var featureFactory;

// Click Event
mutationRateNode.onchange = () => {geneticParameters.mutationRate = mutationRateNode.value};
selectionBiasNode.onchange = () => {geneticParameters.sBias = selectionBiasNode.value};
parentPerChildNode.onchange = () => {geneticParameters.parentPerChild = parentPerChildNode.value};
popSizeNode.onchange = () => {geneticParameters.popSize = popSizeNode.value};
elitesNode.onchange = () => {geneticParameters.elites = elitesNode.value};
evolveStartNode.onclick = () => {
  let ipaTarget = inputNode.value;
  console.log("Begin evolution. Target: "+ ipaTarget);
  topPerformers[0].label.style.color = 'darkorange';
  
  featureFactory.getInstance((err, featureSchema) =>{
    let geneticRun = new GeneticRun(ipaTarget, alphabet, featureSchema);
    geneticRun.evolution(listener);
  });
};

window.onload = () => {
  // Set up default display
  mutationRateNode.value = geneticParameters.mutationRate;
  parentPerChildNode.value = geneticParameters.parentPerChild;
  popSizeNode.value = geneticParameters.popSize;
  selectionBiasNode.value = geneticParameters.sBias;
  elitesNode.value = geneticParameters.elites;
  
  // Init singleton
  featureFactory = new PocFeatureFactory();
  alphabet= new KatakanaAlphabet();
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