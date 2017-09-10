class IpaParserFactory {
  get() {
    return JSONLoader.load("core/ipa/ipa-data.json")
      .then(data => {
        let normalization = {};
        for (let key in data.normalization) {
          normalization[key] = data.normalization[key].target;
        }

        let mapping = {};
        for (let key in data.combining) {
          mapping[key] = { "type": "combining" };
        }
        for (let key in data.diacritics) {
          let diacritic = data.diacritics[key];
          diacritic.type = "diacritic";
          diacritic.base = key;
          mapping[key] = diacritic;
        }
        for (let key in data.vowels) {
          let vowel = data.vowels[key];
          vowel.type = "vowel";
          vowel.base = key;
          mapping[key] = vowel;
        }
        for (let key in data.consonants) {
          let consonant = data.consonants[key];
          consonant.type = "consonant";
          consonant.base = key;
          mapping[key] = consonant;
        }

        return new IpaParser(mapping, normalization);
      });
  }
}