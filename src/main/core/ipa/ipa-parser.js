class IpaParser {

  constructor(mapping, normalization) {
    this.mapping = mapping;
    this.normalization = normalization;
  }

  /**
  * @param {String} ipaString
  * @returns {IpaPhoneme[]} 
  */
  parsePhonemes(ipaString) {
    if (!ipaString || ipaString.length === 0) {
      return [];
    }

    let normalized = this._normalize(ipaString);

    let simplification = {
      '\u02B7': 'w',// Labiovelarisation : MODIFIER LETTER SMALL W > Letter 'w'
      '\u02B2': 'j' // Palatalisation : MODIFIER LETTER SMALL J > Letter 'j'
    };

    let simplified = this._replaceAll(normalized, simplification);

    return this._parse(simplified);
  }

  _normalize(input) {
    let tmp = this._replaceAll(input, this.normalization);
    tmp = tmp.normalize("NFD");
    tmp = tmp.replace(/\u0063\u0327/g, "\u00E7"); // LATIN SMALL LETTER C WITH CEDILLA
    return tmp;
  }

  _parse(normalized) {
    let builder = new IpaTranscriptionBuilder();
    for (let i = 0; i < normalized.length; i++) {
      let symbol = this._getSymbol(normalized[i]);
      if (!symbol) {
        console.log("Invalid character: " + normalized[i]);
      } else {
        builder.add(symbol);
      }
    }
    let phonemes = builder.end();
    return phonemes;
  }

  /**
   * @param {String} char
   * @returns {IpaSymbol} 
   */
  _getSymbol(char) {
    let symbol = this.mapping[char];
    return symbol;
  }

  _replaceAll(input, actions) {
    let tmp = input;
    for (let key in actions) {
      let regex = new RegExp(key, 'gu');
      tmp = tmp.replace(regex, actions[key]);
    }
    return tmp;
  }
}