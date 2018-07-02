class CyrillicFactory {

  constructor() {
  }

  get() {
    return JSONLoader.load("core/alphabet/cyrillic/cyrillic-data.json")
      .then(data => {
        return new BasicAlphabet(data, "Cyrillic");
      });
  }
}