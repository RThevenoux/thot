const NASAL_MARK = '\u0303'; // COMBINING TILDE
const LONG_MARK = '\u02D0'; // MODIFIER LETTER TRIANGULAR COLON

class Ipa {
  constructor() {
    this.parserFactory = new IpaParserFactory();
  }

  getParser() {
    return new Promise((resolve, reject) => {

      if (this.singleton) {
        resolve(this.singleton);
      } else {
        let that = this;
        this.parserFactory.get()
          .then(parser => {
            that.singleton = parser;
            resolve(parser);
          })
          .catch(reject);
      }
    });
  }
}