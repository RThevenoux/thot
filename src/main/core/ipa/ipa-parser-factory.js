class IpaParserFactory {
  get() {
    return JSONLoader.load("core/ipa/ipa-data.json")
      .then(data => {
        let normalization = {};
        for (let key in data.normalization) {
          normalization[key] = data.normalization[key].target;
        }

        let mapping = {};

        data.combining.forEach(key => mapping[key] = IpaSymbol.combining(key));

        for (let key in data.diacritics) {
          let diacritic = data.diacritics[key];
          mapping[key] = IpaSymbol.diacritic(key, diacritic.ipa);
        }
        for (let key in data.vowels) {
          let vowel = data.vowels[key];
          mapping[key] = IpaSymbol.vowel(key, vowel.height, vowel.backness, vowel.rounded);
        }
        for (let key in data.consonants) {
          let consonant = data.consonants[key];
          mapping[key] = IpaSymbol.consonant(key, consonant.manner, consonant.place, consonant.voiced);
        }

        return new IpaParser(mapping, normalization);
      });
  }
}