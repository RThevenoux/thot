class PerformersController {

  /**
   * 
   * @param {HTMLElement} Element 
   */
  constructor(element) {
    this.element = element;
    this.size = 10;

    let templateHTML =
      `<div class="display">Top Individuals</div>
<span class="score">Scores</span>`;

    let div = document.createElement("div");
    div.innerHTML = templateHTML;
    div.className = "performer-row title";
    element.appendChild(div);

    this.rows = [];
    for (let i = 0; i < this.size; i++) {
      let row = document.createElement("div");
      row.innerHTML = templateHTML;
      row.className = "performer-row";
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
  }

  /**
   * 
   * @param {*[]} population 
   */
  update(population) {
    for (let i = 0; i < this.rows.length; i++) {
      let individual = population.individuals[i];
      let row = this.rows[i];

      let display = row.querySelector('.display');
      let score = row.querySelector('.score');

      display.textContent = individual.display + " - /" + individual.ipa + "/";
      score.textContent = individual.score;
    }
  }
}