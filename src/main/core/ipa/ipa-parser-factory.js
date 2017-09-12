class IpaParserFactory {
  get() {
    return JSONLoader.load("core/ipa/ipa-data.json")
      .then(data => {
        let normalization = {};
        for (let key in data.normalization) {
          normalization[key] = data.normalization[key].target;
        }

        let mapping = {};

        // Combining
        data.combining.forEach(key => mapping[key] = IpaSymbol.combining(key));

        // Diacritics
        for (let type in data.diacritics) {
          let typeBundle = data.diacritics[type];
          for (let key in typeBundle) {
            let diacritic = typeBundle[key];
            mapping[key] = IpaSymbol.diacritic(key, diacritic.ipa, type);
          }
        }

        // Vowels
        for (let height in data.vowels) {
          let heightBundle = data.vowels[height];
          for (let backness in heightBundle) {
            let couple = heightBundle[backness];
            let unroundedVowel = couple[0];
            if (unroundedVowel) {
              mapping[unroundedVowel] = IpaSymbol.vowel(unroundedVowel, height, backness, false);
            }
            let roundedVowel = couple[1];
            if (roundedVowel) {
              mapping[roundedVowel] = IpaSymbol.vowel(roundedVowel, height, backness, true);
            }
          }
        }

        // Consonants
        for (let manner in data.consonants) {
          let mannerBundle = data.consonants[manner];
          for (let key in mannerBundle) {
            let consonant = mannerBundle[key];
            let lateral = (consonant.lateral ? true : false);
            mapping[key] = IpaSymbol.consonant(key, manner, consonant.place, consonant.voiced, lateral);
          }
        }

        return new IpaParser(mapping, normalization);
      });
  }
}