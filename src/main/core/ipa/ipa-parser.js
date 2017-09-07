class IpaParser {

  constructor(data) {
    this.normalization = data.normalization;
    this.diacritics = data.diacritics;
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
      '\u02B2': 'j' // Palatalisation : MODIFIER LETTER SMALL J > LEtter 'j'
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
      let char = normalized[i];

      if (char === "\u0361") {// COMBINING DOUBLE BREVE
        if (!lastPhoneme) {
          throw new Exception("Unexpected 'COMBINING DOUBLE BREVE' without base");
        }
        combining = true;
      }
      else if (this.diacritics.indexOf(char) > -1) {
        if (!lastPhoneme) {
          throw new Exception("Unexpected diacritics without base : " + char);
        }
        if (combining) {
          throw new Exception("Unexpected diacritics after combining : " + char);
        }

        if (char === NASAL_MARK) {
          lastPhoneme.nasal = true;
        } else if (char === '\u02D0') {
          lastPhoneme.long = true;
        } else {
          // ignore
        }
      }
      // Default - base character
      else {
        if (combining) {
          lastPhoneme.combineBase(char);
          combining = false;
        } else {
          if (lastPhoneme) {
            phonemes.push(lastPhoneme);
          }
          lastPhoneme = new IpaPhoneme(char);
        }
      }
    }
    phonemes.push(lastPhoneme);
    return phonemes;
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