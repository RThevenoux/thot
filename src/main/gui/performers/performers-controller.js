class PerformersController {

  /**
   * 
   * @param {HTMLElement} Element 
   */
  constructor(element) {
    this.size = 10;

    let templateHTML =
      `<div class="display"></div>
      <div class="ipa"></div>
      <div class="score"></div>`;

    let titleRow = document.createElement("div");
    titleRow.innerHTML = templateHTML;
    titleRow.className = "performer-row title";
    this._setRowValues(titleRow, ["Top Individuals", "IPA", "Score"]);
    element.appendChild(titleRow);

    this.rows = [];
    for (let i = 0; i < this.size; i++) {
      let row = document.createElement("div");
      row.innerHTML = templateHTML;
      row.className = "performer-row";
      this._setRowValues(row, "", "", "");
      element.appendChild(row);
      this.rows.push(row);
    }
  };

  /**
   * @param {boolean} highligthed 
   */
  highligthFirst(highligthed) {
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
  update(population) {
    for (let i = 0; i < this.rows.length; i++) {
      let individual = population.individuals[i];
      let row = this.rows[i];

      let score = Math.floor(individual.score * 100) + " %";

      this._setRowValues(row, [individual.display, "/" + individual.ipa + "/", score]);
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
}