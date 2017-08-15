class AlphabetProvider {

  constructor() {
    this.alphabets = [
      {
        "name": "katakana",
        "display": "Katakana",
        "factory": new KatakanaFactory()
      },
      {
        "name": "inuktitut",
        "display": "Inuktitut",
        "factory": new InuktitutFactory()
      }
    ];
  }

  get(name, callback) {
    let alphabet = this.alphabets.find(alphabet => alphabet.name == name);
    if (alphabet) {
      alphabet.factory.get(callback);
    } else {
      console.error("Alphabet not found: " + name);
    }
  }
}