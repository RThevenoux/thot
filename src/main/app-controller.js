class AppController {
  /**
   * 
   * @param {ParameterModel} parameters 
   */
  constructor(parameters) {
    let shownPopulationSize = 10;

    this.parameters = parameters;
    this.model = new AppModel();

    this.inputNode = document.getElementById('textBox');
    this.distanceNode = document.getElementById('select-distance');
    this.alphabetNode = document.getElementById('select-alphabet');

    this.topPerformers = [];
    for (let i = 0; i < shownPopulationSize; i++) {
      this.topPerformers.push({
        label: document.getElementById('top-performer' + i),
        score: document.getElementById('score' + i)
      });
    }

    let evolveStartNode = document.getElementById('start-evolve');
    evolveStartNode.onclick = () => this._start();

    this._init();
  }

  _init() {
    //
    this.model.getDistances()
      .map(distance => new Option(distance.text, distance.value))
      .forEach(option => this.distanceNode.options.add(option));
    
    //
    this.model.getAlphabets()
      .map(alphabet => new Option(alphabet.text, alphabet.value))
      .forEach(option => this.alphabetNode.options.add(option));
  }

  /**
   * 
   * @param {String} ipaTarget
   * @param {String} alphabet
   * @param {String} distance
   */
  _start() {
    let ipaTarget = this.inputNode.value;
    let alphabet = this.alphabetNode.value;
    let distance = this.distanceNode.value;
    this.model.start(ipaTarget, alphabet, distance, this.parameters, this);
  }

  _stop() {
    this.model.stop();
  }

  started(ipaTarget) {
    console.log("Start evolution. Target: " + ipaTarget);
    this._updateFirstPerformerColor('darkorange');
  }

  stopped() {
    console.log("Evolution stopped");
  }

  newGeneration(population) {
    let best = population.getBest();
    console.log('generations #' + population.generation + " best:" + best.score + " | " + best.display);
    this._displayData(population);
  }

  finished(population) {
    this._displayData(population);
    this._updateFirstPerformerColor('darkgreen');

    let winner = population.getBest();
    console.log("WINNER : " + winner.display + " score:" + winner.score);
  }

  _updateFirstPerformerColor(color) {
    this.topPerformers[0].label.style.color = color;
  }

  _displayData(population) {
    for (let i = 0; i < this.topPerformers.length; i++) {
      let individual = population.individuals[i];
      let view = this.topPerformers[i];

      view.label.textContent = individual.display + " - /" + individual.ipa + "/";
      view.score.textContent = individual.score;
    }
  }
}