class KatakanaFactory {

  constructor() {
    this.singleton = null;
  }

  getInstance(callback) {
    if (this.singleton) {
      callback(null, this.singleton);
    } else {
      var that = this;
      JSONLoader.load("alphabet/katakana-data.json",
        (err, data) => {
          if (err) {
            callback(err);
            return;
          }
          that.singleton = new KatakanaAlphabet(data);
          callback(null, that.singleton);
        });
    }
  }
}