class KatakanaFactory {

  constructor() {
    this.singleton = null;
  }

  getInstance2(callback) {
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

  getInstance(callback) {
    if (this.singleton) {
      callback(null, this.singleton);
    } else {
      var that = this;
      JSONLoader.load("alphabet/katakana-data-2.json",
        (err, data) => {
          if (err) {
            callback(err);
            return;
          }

          let array = [];
          for (let conson in data) {
            let vowels = data[conson];
            for (let vowel in vowels) {
              let kana = vowels[vowel];
              if (kana) {
                let ipa = conson + vowel;
                array.push({
                  kana: kana,
                  ipa: ipa
                });
              }
            }
          }

          //array.forEach(x=>console.log(x.kana+" > "+x.ipa));

          that.singleton = new KatakanaAlphabet(array);
          callback(null, that.singleton);
        });
    }
  }
}