class KatakanaFactory {

  constructor() {
    this.singleton = null;
  }

  getInstance(callback) {
    if (this.singleton) {
      callback(null, this.singleton);
    } else {
      var that = this;
      let req = new XMLHttpRequest();
      req.onreadystatechange = function () {
        if (req.readyState === 4) {
          if (req.status === 200 || req.status == 0) {
            let data = JSON.parse(req.responseText);
            that.singleton = new KatakanaAlphabet(data);
            callback(null, that.singleton);
          }
        }
      };
      req.open("GET", "alphabet/katakana-data.json", true);
      req.send(null);
    }
  }
}