class MultiAlphabetController {

  /**
  * @param {HTMLElement} parent 
  */
  constructor(parent, alphabetProvider, geneticRunFactory) {
    this.alphabetProvider = alphabetProvider;
    this.geneticRunFactory = geneticRunFactory;

    this.element = document.createElement("div");

    this.title = document.createElement("p");
    this.title.textContent = "Multi-alphabet. Pending to start";
    this.element.appendChild(this.title);

    this.table = document.createElement("div");
    this.element.appendChild(this.table);

    this.runs = [];

    // Add to parent
    parent.appendChild(this.element);
  }

  start(ipaTarget, distance, parameterModel) {
    this._clearTable();
    this.runs = [];

    this.title.textContent = "Multi-alphabet. Run with /" + ipaTarget + "/";

    this.alphabetProvider.getAll()
      .then((alphabetsLoading) => {

        alphabetsLoading.alphabets.forEach(alphabet => {

          this.geneticRunFactory.get(distance, parameterModel)
            .then(run => {
              let rowController = new AlphabetRowController(alphabet);

              this.runs.push(run);
              run.start(ipaTarget, alphabet, rowController);

              this.table.appendChild(rowController.getElement());
            })
            .catch(err => {
              let errorWrapper = { "alphabetName": alphabet.name, "error": err };
              this._addErrorRow(errorWrapper);
            });
        });

        alphabetsLoading.errors
          .forEach(errorWrapper => this._addErrorRow(errorWrapper));
      })
      .catch(err => console.error(err));
  }

  _addErrorRow(errorWrapper) {
    let row = new ErrorRowController(errorWrapper).getElement();
    this.table.appendChild(row);
  }

  _clearTable() {
    while (this.table.firstChild) {
      this.table.removeChild(this.table.firstChild);
    }
  }

  stop() {
    this.runs.forEach(run => run.stop());
  }
}