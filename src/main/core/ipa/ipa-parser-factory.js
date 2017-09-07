class IpaParserFactory {
  get() {
    return JSONLoader.load("core/ipa/ipa-data.json")
      .then(data => {
        return new IpaParser(data)
      });
  }
}