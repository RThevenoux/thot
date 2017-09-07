class IpaParser {

  constructor(data) {
    this.normalization = {};
    for(let key in data.normalization){
      this.normalization[key] = data.normalization[key].target;
    }
    
    this.diacritics = data.diacritics;
    this.vowels = data.vowels;
    this.vowelsKey = Object.keys(this.vowels);
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
      // Diacritics
      else if (this.diacritics[char]) {
        let diacritic = this.diacritics[char];
        
        if (!lastPhoneme) {
          throw new Exception("Unexpected diacritics without base : " + char);
        }
        if (combining) {
          throw new Exception("Unexpected diacritics after combining : " + char);
        }

        if (diacritic.ipa === "Nasalized") {
          lastPhoneme.nasal = true;
        } else if (diacritic.ipa === "Long") {
          lastPhoneme.long = true;
        } else {
          // ignore
        }
      }
      // Vowel
      else if (this.vowelsKey.indexOf(char) > -1) {
        if (combining) {
          lastPhoneme.combineBase(char);
          combining = false;
        } else {
          if (lastPhoneme) {
            phonemes.push(lastPhoneme);
          }
          lastPhoneme = IpaPhoneme.vowel(char);
        }
      }
      // Default - expect consonant !
      else {
        if (combining) {
          lastPhoneme.combineBase(char);
          combining = false;
        } else {
          if (lastPhoneme) {
            phonemes.push(lastPhoneme);
          }
          lastPhoneme = IpaPhoneme.consonant(char);
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