class AppController {

  /**
   * 
   * @param {HTMLElement} element 
   */
  constructor(element) {

    this.model = new AppModel();
    element.innerHTML = `<div id="keyboard"></div>
        <div class="top-bar">
            <div class="input__container">
                <h2>Your name</h2>
                <div class="name-input">
                    <input type="text" id="textBox" />
                    <select id="select-alphabet"></select>
                    <select id="select-distance"></select>
                    <button id="start-evolve">Evolve Me</button>
                    <button id="stop-evolve">Stop</button>
                </div>
            </div>
            <div class="parameters" id="parameters"></div>
        </div>
        <div class="top-performers" id="performers"></div>`;

    this.inputNode = element.querySelector('#textBox');
    this.distanceNode = element.querySelector('#select-distance');
    this.alphabetNode = element.querySelector('#select-alphabet');

    this.parameter = new ParametersController(element.querySelector('#parameters'));
    this.performers = new PerformersController(element.querySelector('#performers'));
    this.keyboard = new KeyboardController(element.querySelector('#keyboard'));

    element.querySelector('#start-evolve').onclick = () => this._start();
    element.querySelector('#stop-evolve').onclick = () => this._stop();
    this.keyboard.onClick = (symbol) => this._addIPASymbol(symbol);

    this._init();
  }

  _init() {
    this.model.getDistances()
      .map(distance => new Option(distance.text, distance.value))
      .forEach(option => this.distanceNode.options.add(option));

    this.model.getAlphabets()
      .map(alphabet => new Option(alphabet.text, alphabet.value))
      .forEach(option => this.alphabetNode.options.add(option));
  }

  _addIPASymbol(symbol){
    this.inputNode.value += symbol;
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
    let parameterModel = this.parameter.model;
    this.model.start(ipaTarget, alphabet, distance, parameterModel, this);
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