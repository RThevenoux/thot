class InuktitutFactory {
  constructor() {
    this.singleton = null;
  }

  get(callback) {
    if (this.singleton) {
      callback(null, this.singleton);
    } else {
      var that = this;
      JSONLoader.load("core/alphabet/inuktitut/inuktitut-data.json",
        (err, input) => {
          if (err) {
            callback(err);
            return;
          }

          let data = {
            consonantKeys: [],
            vowelKeys: [],
            combinations: {}
          };

          data.vowelKeys = Object.keys(input.vowels);

          for (let consonantKey in input.consonant) {
            data.consonantKeys.push(consonantKey);

            let consonant = input.consonant[consonantKey];
            for (let i = 0; i < data.vowelKeys.length; i++) {

              let vowelKey = data.vowelKeys[i];
              let vowelIpa = input.vowels[vowelKey];
              let ipa = consonant.ipa + vowelIpa;
              let display = consonant.combinations[i];
              data.combinations[consonantKey + vowelKey] = {
                "ipa": ipa,
                "display": display
              }
            }
          }

          that.singleton = new InuktitutAlphabet(data);
          callback(null, that.singleton);
        }
      );
    }
  }
}