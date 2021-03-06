class SingleAlphabetController {

  /**
   * @param {HTMLElement} parent 
   */
  constructor(parent, alphabetProvider, geneticRunFactory) {
    this.size = 10;
    this.alphabetProvider = alphabetProvider;
    this.geneticRunFactory = geneticRunFactory;
    this.formater = new Formater();

    let rowTemplate =
      `<div class="display"></div>
       <div class="ipa"></div>
       <div class="score"></div>`;

    let titleRow = this._createRow(["Top Individuals", "IPA", "Score"], true, rowTemplate);
    parent.appendChild(titleRow);

    this.rows = [];
    for (let i = 0; i < this.size; i++) {
      let row = this._createRow(["", "", ""], false, rowTemplate);
      parent.appendChild(row);
      this.rows.push(row);
    }
  };

  _createRow(values, title, template) {
    let row = document.createElement("div");
    row.innerHTML = template;
    row.className = "my-row" + (title ? " title" : "");
    this._setRowValues(row, values);
    return row;
  }

  /**
   * @param {boolean} highligthed 
   */
  _highligthFirst(highligthed) {
    let row = this.rows[0];
    let display = row.querySelector('.display');
    display.className = 'display' + (highligthed ? " highlighted" : "");

    let ipa = row.querySelector('.ipa');
    ipa.className = 'ipa' + (highligthed ? " highlighted" : "");
  }

  /**
   * 
   * @param {*[]} population 
   */
  _updateRows(population) {
    for (let i = 0; i < this.rows.length; i++) {
      let individual = population.individuals[i];
      let row = this.rows[i];

      let score = this.formater.toPercent(individual.score);
      let ipa = this.formater.toIPA(individual.ipa);

      this._setRowValues(row, [individual.display, ipa, score]);
    }
  }

  _setRowValues(row, values) {

    let display = row.querySelector('.display');
    let ipa = row.querySelector('.ipa');
    let score = row.querySelector('.score');

    display.textContent = values[0];
    ipa.textContent = values[1];
    score.textContent = values[2];
  }

  /**
   * 
   * @param {String} ipaTarget
   * @param {String} alphabetName 
   * @param {String} distanceName 
   * @param {ParameterModel} parameters
   */
  start(ipaTarget, alphabetName, distanceName, parameters) {
    this.stop();

    console.log("Load strategies... (target: " + ipaTarget + ", alphabet: " + alphabetName + ", distance: " + distanceName + ')');

    Promise.all([
      this.geneticRunFactory.get(distanceName, parameters),
      this.alphabetProvider.get(alphabetName)])
      .then(([geneticRun, alphabet]) => {
        this.geneticRun = geneticRun;
        this.geneticRun.start(ipaTarget, alphabet, this);
      })
      .catch(err => console.error(err));
  }

  stop() {
    if (this.geneticRun) {
      console.log("Stop Single Alphabet");
      this.geneticRun.stop();
    }
  }

  started(ipaTarget) {
    console.log("Start evolution. Target: " + ipaTarget);
    this._highligthFirst(false);
  }

  stopped() {
    console.log("Evolution stopped");
  }

  newGeneration(population) {
    this._updateRows(population);
    let best = population.getBest();
    console.log('generations #' + population.generation + " best:" + best.score + " | " + best.display);
  }

  finished(population) {
    this._updateRows(population);
    this._highligthFirst(true);

    let winner = population.getBest();
    console.log("WINNER : " + winner.display + " score:" + winner.score);
  }
}