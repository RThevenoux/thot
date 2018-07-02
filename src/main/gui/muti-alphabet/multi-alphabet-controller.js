class MultiAlphabetController {

  /**
  * @param {HTMLElement} parent 
  */
  constructor(parent, alphabetProvider, geneticRunFactory) {
    this.alphabetProvider = alphabetProvider;
    this.geneticRunFactory = geneticRunFactory;

    let html = document.createElement("p");
    html.textContent = "Not implemented yet ... ¯\\_(ツ)_/¯";
    html.className = "message";
    parent.appendChild(html);
  }

  start(ipaTarget, distance, parameterModel) {
    console.log("'-- ALL --' is not yet implemented");
    
    this.alphabetProvider.getAll()
      .then((alphabetsLoading) => {
        console.log("Loaded alphabets (" + alphabetsLoading.alphabets.length + "): ");
        alphabetsLoading.alphabets.forEach(alphabet => {
          console.log(" - " + alphabet.name);
        });
        console.log("Errors (" + alphabetsLoading.errors.length + ") :");
        alphabetsLoading.errors.forEach(error => {
          console.log(" - " + error.alphabetName + " " + error.error);
        });
      })
      .catch(err => console.error(err));
  }

  stop() {

  }
}