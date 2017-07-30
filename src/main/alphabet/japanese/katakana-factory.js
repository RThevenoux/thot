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
            let vowels = data[consonant];
            for (let vowel in vowels) {
              let kana = vowels[vowel];
              if (kana) {
                let ipa = consonant + vowel;

                let consonantDesc = katakanas[consonant];
                if (!consonantDesc) {
                  consonantDesc = {
                    gemination: consonant,
                    nCategory: "m",
                    vowels: {}
                  };
                  katakanas[consonant] = consonantDesc;
                }
                consonantDesc.vowels[vowel] = {
                  display: kana,
                  ipa: ipa
                };

                this.add(vowelCombination, vowel, consonant);
              }
            }
          }

          that.singleton = new KatakanaAlphabet(katakanas, vowelCombination);
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