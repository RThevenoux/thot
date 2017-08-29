class InuktitutFactory {

  constructor() {
  }

  get() {
    return JSONLoader.load("core/alphabet/inuktitut/inuktitut-data.json")
      .then(input => {
        let data = this._parseData(input);
        return new InuktitutAlphabet(data);
      });
  }

  _parseData(input) {
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

    return data;
  }
}