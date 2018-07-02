class AppController {

  /**
   * 
   * @param {HTMLElement} element 
   */
  constructor(element) {

    this.model = new AppModel();
    element.innerHTML =
      `<div id="keyboard"></div>
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
        <div class="cardlayout" id="card-layout">
          <div class="message" id="welcome-message-card">
            <p> Entrée une séquence API valide et cliquez sur 'start'</p>
          </div>
          <div class="top-performers" id="single-alphabet-card"></div>
          <div class="message" id="multi-alphabet-card">
            <p> Not implemented yet ... ¯\\_(ツ)_/¯ </p>
          </div>
        </div>`;

    this.inputNode = element.querySelector('#textBox');
    this.distanceNode = element.querySelector('#select-distance');
    this.alphabetNode = element.querySelector('#select-alphabet');
    this.cardLayout = element.querySelector('#card-layout');

    this.parameter = new ParametersController(element.querySelector('#parameters'));
    this.singleAlphabet = new SingleAlphabetController(element.querySelector('#single-alphabet-card'));
    this.keyboard = new KeyboardController(element.querySelector('#keyboard'));

    element.querySelector('#start-evolve').onclick = () => this._start();
    element.querySelector('#stop-evolve').onclick = () => this._stop();
    this.keyboard.onClick = (symbol) => this._addIPASymbol(symbol);

    this._init();
  }

  _init() {
    // Add 'Distance' option
    this.model.getDistances()
      .map(distance => new Option(distance.text, distance.value))
      .forEach(option => this.distanceNode.options.add(option));

    // Add 'Alphabet' option
    this.alphabetNode.options.add(new Option("-- ALL --", "#ALL#"));
    this.model.getAlphabets()
      .map(alphabet => new Option(alphabet.text, alphabet.value))
      .forEach(option => this.alphabetNode.options.add(option));

    // Init CardLayout
    this._showCard("welcome-message-card");
  }

  _showCard(cardName) {
    for (let i = 0; i < this.cardLayout.children.length; i++) {
      let element = this.cardLayout.children[i];
      if (element.id === cardName) {
        // Show element
        element.style.display = "block";
      } else {
        // Hide element
        element.style.display = "none";
      }
    }
  }

  _addIPASymbol(symbol) {
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

    if (alphabet === "#ALL#") {
      this._showCard("multi-alphabet-card");
      console.log("'-- ALL --' is not yet implemented");
    } else {
      this._showCard("single-alphabet-card");
      this.model.start(ipaTarget, alphabet, distance, parameterModel, this.singleAlphabet);
    }
  }

  _stop() {
    this.model.stop();
  }
}