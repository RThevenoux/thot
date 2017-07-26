class AppController {
  constructor(parameters) {
    let shownPopulationSize = 10;

    this.parameters = parameters;
    this.model = new AppModel();

    this.topPerformers = [];
    for (let i = 0; i < shownPopulationSize; i++) {
      this.topPerformers.push({
        label: document.getElementById('top-performer' + i),
        score: document.getElementById('score' + i)
      });
    }

    let evolveStartNode = document.getElementById('start-evolve');
    let inputNode = document.getElementById('textBox');
    evolveStartNode.onclick = () => this.start(inputNode.value);
  }

  start(ipaTarget) {
    this.model.start(ipaTarget, this.parameters, this);
  }

  stop(){
    this.model.stop();
  }

  started(ipaTarget){
    console.log("Start evolution. Target: " + ipaTarget);
    this.updateFirstPerformerColor('darkorange');
  }

  stopped(){
    console.log("Evolution stopped");
  }

  newGeneration(population, generation) {
    let best = population[0];
    console.log('generations #' + generation + " best:" + best.score + " | " + best.display);
    this.displayData(population);
  }

  finished(population, generation) {
    this.displayData(population);
    this.updateFirstPerformerColor('darkgreen');

    let winner = population[0];
    console.log("WINNER : " + winner.display + " score:" + winner.score);
  }

  updateFirstPerformerColor(color) {
    this.topPerformers[0].label.style.color = color;
  }

  displayData(population) {
    for (let i = 0; i < this.topPerformers.length; i++) {
      let individual = population[i];
      let view = this.topPerformers[i];

      view.label.textContent = individual.display + " - /" + individual.ipa + "/";
      view.score.textContent = individual.score;
    }
  }
}