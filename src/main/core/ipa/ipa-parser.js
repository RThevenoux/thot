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

    let phonemes = [];

    let lastPhoneme = null;
    let combining = false;

    for (let i = 0; i < normalized.length; i++) {
      let symbol = this._getSymbol(normalized[i]);
      if (!symbol) {
        console.log("Invalid character: " + normalized[i]);
        continue;
      }

      switch (symbol.type) {
        case "combining": {// COMBINING DOUBLE BREVE
          if (!lastPhoneme) {
            throw new Exception("Unexpected 'COMBINING DOUBLE BREVE' without base");
          }
          combining = true;
        }
          break;
        case "diacritic": {
          if (!lastPhoneme) {
            throw new Exception("Unexpected diacritics without base : " + char);
          }
          if (combining) {
            throw new Exception("Unexpected diacritics after combining : " + char);
          }
          if (symbol.ipa === "Nasalized") {
            lastPhoneme.nasal = true;
          } else if (symbol.ipa === "Long") {
            lastPhoneme.long = true;
          } else {
            // ignore
          }
        }
          break;
        case "vowel": {
          if (combining) {
            lastPhoneme.combineBase(symbol.base);
            combining = false;
          } else {
            if (lastPhoneme) {
              phonemes.push(lastPhoneme);
            }
            lastPhoneme = IpaPhoneme.vowel(symbol.base);
          }
        }
          break;
        case "consonant": {
          if (combining) {
            lastPhoneme.combineBase(symbol.base);
            combining = false;
          } else {
            if (lastPhoneme) {
              phonemes.push(lastPhoneme);
            }
            lastPhoneme = IpaPhoneme.consonant(symbol.base);
          }
        }
        default:
          break;
      }
    }
    phonemes.push(lastPhoneme);
    return phonemes;
  }

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