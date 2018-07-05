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

  /**
   * Return a list of alphabets
   * @param {String[]} names if null or empty, return all declared alphabets
   * @returns { {'alphabets': Promise<Alphabet>[], 'errors':  {'alphabetName': string, 'error': err } [] } }
   */
  getAll(names) {
    if (!names || names.length == 0) {
      names = this.alphabets.map(desc => desc.name);
    }

    return new Promise((resolve, reject) => {
      let count = 0;
      let result = {
        'alphabets': [],
        'errors': []
      };

      let incrementCounter = () => {
        count++;
        if (count === names.length) {
          resolve(result);
        }
      };

      names.forEach(name => {
        this.get(name)
          .then(alphabet => {
            result.alphabets.push(alphabet);
            incrementCounter();
          })
          .catch(err => {
            result.errors.push({ 'alphabetName': name, 'error': err });
            incrementCounter();
          });
      });
    });
  }
}