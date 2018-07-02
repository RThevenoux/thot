class ArabFactory {

  constructor() {
  }

  get() {
    return JSONLoader.load("core/alphabet/arab/arab-data.json")
      .then(data => {
        return new BasicAlphabet(data, "Arab");
      });
  }
}