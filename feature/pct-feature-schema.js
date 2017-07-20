class PctFeatureFactory {
  constructor() {
    this.singleton = null;
  }

  getInstance(callback) {
    if (this.singleton) {
      callback(null,
        this.singleton);
    } else {
      var that = this;
      let req = new XMLHttpRequest();
      req.onreadystatechange = function () {
        if (req.readyState === 4) {
          if (req.status === 200 || req.status == 0) {
            let data = JSON.parse(req.responseText);
            that.singleton = new PctFeatureSchema(data);
            callback(null, that.singleton);
          }
        }
      };
      req.open("GET", "feature/pct-feature-data.json", true);
      req.send(null);
    }
  }
}

class PctFeatureSchema {
  constructor(data) {
    this.name = "Derive from Phonologic Corpus Tool";
    this.mapping = data;
    this.features = [
      {
        "name": "anterior",
        "type": "value",
        "weight": 1
      },
      {
        "name": "approximant",
        "type": "value",
        "weight": 1
      },
      {
        "name": "back",
        "type": "value",
        "weight": 1
      },
      {
        "name": "consonantal",
        "type": "value",
        "weight": 1
      },
      {
        "name": "constricted glottis",
        "type": "value",
        "weight": 1
      },
      {
        "name": "continuant",
        "type": "value",
        "weight": 1
      },
      {
        "name": "coronal",
        "type": "value",
        "weight": 1
      },
      {
        "name": "delayed_release",
        "type": "value",
        "weight": 1
      },
      {
        "name": "diphthong",
        "type": "value",
        "weight": 1
      },
      {
        "name": "distributed",
        "type": "value",
        "weight": 1
      },
      {
        "name": "dorsal",
        "type": "value",
        "weight": 1
      },
      {
        "name": "front",
        "type": "value",
        "weight": 1
      },
      {
        "name": "front-diphthong",
        "type": "value",
        "weight": 1
      },
      {
        "name": "high",
        "type": "value",
        "weight": 1
      },
      {
        "name": "labial",
        "type": "value",
        "weight": 1
      },
      {
        "name": "labiodental",
        "type": "value",
        "weight": 1
      },
      {
        "name": "lateral",
        "type": "value",
        "weight": 1
      },
      {
        "name": "long",
        "type": "value",
        "weight": 1
      },
      {
        "name": "low",
        "type": "value",
        "weight": 1
      },
      {
        "name": "nasal",
        "type": "value",
        "weight": 1
      },
      {
        "name": "round",
        "type": "value",
        "weight": 1
      },
      {
        "name": "segment",
        "type": "value",
        "weight": 1
      },
      {
        "name": "sonorant",
        "type": "value",
        "weight": 1
      },
      {
        "name": "spread glottis",
        "type": "value",
        "weight": 1
      },
      {
        "name": "stress",
        "type": "value",
        "weight": 1
      },
      {
        "name": "strident",
        "type": "value",
        "weight": 1
      },
      {
        "name": "syllabic",
        "type": "value",
        "weight": 1
      },
      {
        "name": "tap",
        "type": "value",
        "weight": 1
      },
      {
        "name": "tense",
        "type": "value",
        "weight": 1
      },
      {
        "name": "trill",
        "type": "value",
        "weight": 1
      },
      {
        "name": "voice",
        "type": "value",
        "weight": 1
      }
    ];
  }

  parse(phoneme) {
    let feature = this.mapping[phoneme.base];
    return feature;
  }
};