class PocFeatureFactory {
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
            that.singleton = new PocFeatureSchema(data);
            callback(null, that.singleton);
          }
        }
      };
      req.open("GET", "feature/poc-feature-data.json", true);
      req.send(null);
    }
  }
}

class PocFeatureSchema {
  constructor(data) {
    this.name = "Proof Of Concept";
    this.mapping = data;
    this.features = [
      {
        "name": "height",
        "type": "number",
        "min": 0,
        "max": 6,
        "weight": 1
      },
      {
        "name": "backness",
        "type": "number",
        "min": 0,
        "max": 2,
        "weight": 0.5
      },
      {
        "name": "roundedness",
        "type": "number",
        "min": 0,
        "max": 2,
        "weight": 1
      },
      {
        "name": "nasal",
        "type": "number",
        "min": 0,
        "max": 1,
        "weight": 0.5
      }
    ];
  }

  parse(phoneme) {
    let feature = this.mapping[phoneme.base];
    feature.nasal = (phoneme.nasal ? 1 : 0);
    return feature;
  }
  
};

