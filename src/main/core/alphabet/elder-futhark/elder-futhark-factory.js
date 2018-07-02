class ElderFutharkFactory {

  constructor() {
  }

  get() {
    return JSONLoader.load("core/alphabet/elder-futhark/elder-futhark-data.json")
      .then(data => {
        return new BasicAlphabet(data, "Elder Futhark");
      });
  }
}