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

    document.getElementById('start-evolve').onclick = () => this._start();
    document.getElementById('stop-evolve').onclick = () => this._stop();

    this.performers = new PerformersController(document.getElementById('performers'));

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
    this.performers.highligthFirst(false);
  }

  stopped() {
    console.log("Evolution stopped");
  }

  newGeneration(population) {
    this.performers.update(population);
    let best = population.getBest();
    console.log('generations #' + population.generation + " best:" + best.score + " | " + best.display);
  }

  finished(population) {
    this.performers.update(population);
    this.performers.highligthFirst(true);

    let winner = population.getBest();
    console.log("WINNER : " + winner.display + " score:" + winner.score);
  }
}