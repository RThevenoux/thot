class IpaParserFactory {
  get() {
    return JSONLoader.load("core/ipa/ipa-data.json")
      .then(data => {
        let data2 = new IpaDataCommented();
        data.diacritics = data2.diacritics;
        data.normalization = data2.normalization;
        return new IpaParser(data)
      });
  }
}