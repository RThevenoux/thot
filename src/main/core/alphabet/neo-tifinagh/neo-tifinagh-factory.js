class NeoTifinaghFactory {

  constructor() {
  }

  get() {
    return JSONLoader.load("core/alphabet/neo-tifinagh/neo-tifinagh-data.json")
      .then(data => {
        return new BasicAlphabet(data, "Neo-Tifinagh");
      });
  }
}