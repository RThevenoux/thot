class AlphabetRowController {

  constructor(alphabet) {
    this.formater = new Formater();

    this.alphabetName = alphabet.name;
    this.element = document.createElement("div");
    this.element.className = "my-row";

    this.cellName = document.createElement("div");
    this.cellName.textContent = this.alphabetName;
    this.cellName.className = "cell-alphabet";
    this.element.appendChild(this.cellName);

    this.cellDisplay = document.createElement("div");
    this.cellDisplay.className = "cell-display";
    this.element.appendChild(this.cellDisplay);

    this.cellIpa = document.createElement("div");
    this.cellIpa.className = "cell-ipa";
    this.element.appendChild(this.cellIpa);

    this.cellScore = document.createElement("div");
    this.cellScore.className = "cell-score";
    this.element.appendChild(this.cellScore);

    this.cellGeneration = document.createElement("div");
    this.cellGeneration.className = "cell-generation";
    this.element.appendChild(this.cellGeneration);

    this.cellStatus = document.createElement("div");
    this.cellStatus.className = "cell-status";
    this.element.appendChild(this.cellStatus);

    this._updateStatus("Pending");
  }

  getElement() {
    return this.element;
  }

  started(ipaTarget) {
    this._updateStatus("Started");
  }

  stopped() {
    this._updateStatus("Stopped");
  }

  newGeneration(population) {
    this._updatePopulation(population);
  }

  finished(population) {
    this._updatePopulation(population);
    this._updateStatus("Finished");
  }

  _updatePopulation(population){
    let best = population.getBest();
    let score = this.formater.toPercent(best.score);
    let ipa = this.formater.toIPA(best.ipa);

    this.cellDisplay.textContent = best.display;
    this.cellIpa.textContent = ipa;
    this.cellScore.textContent = score;
    this.cellGeneration.textContent = population.generation;
  }

  _updateStatus(newStatus){
    this.cellStatus.textContent = newStatus;
  }
}