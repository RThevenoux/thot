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
      },
      {
        "name": "cyrillic",
        "display": "Cyrillic",
        "factory": new CyrillicFactory()
      },
      {
        "name": "elder-futhark",
        "display": "Elder Futhark",
        "factory": new ElderFutharkFactory()
      },
      {
        "name": "arab",
        "display": "Arab",
        "factory": new ArabFactory()
      }
    ];
  }

  get(name) {
    return new Promise((resolve, reject) => {
      let alphabet = this.alphabets.find(alphabet => alphabet.name == name);
      if (!alphabet) {
        reject("Alphabet not found: " + name);
        return;
      }

      if (alphabet.singleton) {
        resolve(alphabet.singleton);
      } else {
        alphabet.factory.get()
          .then(
          x => {
            alphabet.singleton = x;
            resolve(alphabet.singleton);
          }
          )
          .catch(reject);
      }
    });
  }
}