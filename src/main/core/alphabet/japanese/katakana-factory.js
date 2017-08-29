
// -- NOTA :
// After [s, z, n, j], 'u' > [ʉ͍]
// --

class KatakanaFactory {

  constructor() {
  }

  get() {
    return JSONLoader.load("core/alphabet/japanese/katakana-data.json")
      .then(input => {
        let helper = this._parse(input);
        return new KatakanaAlphabet(helper);
      });
  }

  _parse(input) {
    let vowelCombination = {};
    let katakanas = {};
    let vowels = input.vowels;

    for (let consonantKey in input.consonants) {
      let consonantInput = input.consonants[consonantKey];
      let consonantDesc = {
        gemination: consonantInput.gemination,
        nCategory: consonantInput.nCategory,
        vowels: {}
      };

      for (let vowelKey in consonantInput.vowels) {
        let kana = consonantInput.vowels[vowelKey];

        if (kana.ipa) {
          let ipa = kana.ipa;
          let display = kana.display;

          this._add(vowelCombination, consonantDesc, vowelKey, consonantKey, ipa, display);
        } else if (kana) {
          let ipa = consonantInput.ipa + vowels[vowelKey];
          let display = kana;

          this._add(vowelCombination, consonantDesc, vowelKey, consonantKey, ipa, display);
        }
      }

      katakanas[consonantKey] = consonantDesc;
    }
    return new KatakanaHelper(katakanas, vowelCombination);
  }

  _add(vowelCombination, consonantDesc, vowelKey, consonantKey, ipa, display) {
    let changes = vowelCombination[vowelKey];
    if (!changes) {
      changes = [];
      vowelCombination[vowelKey] = changes;
    }
    changes.push(consonantKey);

    consonantDesc.vowels[vowelKey] = {
      display: display,
      ipa: ipa
    };
  }

}