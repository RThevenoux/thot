class KatakanaFactory {

  constructor() {
    this.singleton = null;
  }

  getInstance(callback) {
    if (this.singleton) {
      callback(null, this.singleton);
    } else {
      var that = this;
      JSONLoader.load("alphabet/japanese/katakana-data.json",
        (err, data) => {
          if (err) {
            callback(err);
            return;
          }

          let vowelCombination = {};
          let katakanas = {};

          for (let consonant in data) {
            let consonantInput = data[consonant];
            let consonantDesc = {
              gemination: consonantInput.gemination,
              nCategory: consonantInput.nCategory,
              vowels: {}
            };
            katakanas[consonant] = consonantDesc;

            for (let vowel in consonantInput.vowels) {
              let kana = consonantInput.vowels[vowel];

              if (kana) {
                let ipa = consonantInput.ipa + vowel;
                consonantDesc.vowels[vowel] = {
                  display: kana,
                  ipa: ipa
                };

                this.add(vowelCombination, vowel, consonant);
              }
            }
          }
          let helper = new KatakanaHelper(katakanas, vowelCombination);
          that.singleton = new KatakanaAlphabet(helper);
          callback(null, that.singleton);
        });
    }
  }

  add(map, key, value) {
    let changes = map[key];
    if (!changes) {
      changes = [];
      map[key] = changes;
    }
    changes.push(value);
  }
}