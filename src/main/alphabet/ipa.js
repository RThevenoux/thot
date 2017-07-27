class IPA {
  constructor() { };

  static parsePhonemes(ipaString) {
    if (!ipaString || ipaString.length === 0) {
      return [];
    }

    let normalized = this._normalize(ipaString);

    let simplification = {
      'ʷ': 'w',// Labiovelarisation
      'ʲ': 'j'// Palatalisation
    }

    let simplified = this._replaceAll(normalized, simplification);

    return this._parse(simplified);
  }

  static _normalize(input) {
    let normalization = {
      '\u0067': '\u0261', // LATIN SMALL LETTER G > LATIN SMALL LETTER SCRIPT G
      "\u02A6": "t͡s", // ʦ
      "ʣ": "d͡z", // ʣ
      "ʧ": "t͡ʃ", // ʧ
      "ʤ": "d͡ʒ", // ʤ
      "ʨ": "t͡ɕ", // ʨ
      "ʥ": "d͡ʑ", // ʥ
      "ɚ": "ə˞", // ɚ
      "ɝ": "ɜ˞", // ɝ
      "\u035C": "\u0361", // COMBINING DOUBLE BREVE BELOW > COMBINING DOUBLE INVERTED BREVE
      ":": "\u02D0", // COLON > MODIFIER LETTER TRIANGULAR COLON
      "˗": "̠", // retracted
    };

    let tmp = this._replaceAll(input, normalization);

    return tmp.normalize("NFD");
  }

  static _parse(normalized) {
    let phonemes = [];

    let lastPhoneme = null;
    let combining = false;

    for (let i = 0; i < normalized.length; i++) {
      let char = normalized[i];
      if (char === "\u0303") { // ~ : nasal
        if (!lastPhoneme) {
          throw new Exception("Unexpected '~' without base");
        }
        if (combining) {
          throw new Exception("Unexpected '~' after combining");
        }
        lastPhoneme.nasal = true;
      } else if (char === "\u0361") { // COMBINING DOUBLE BREVE
        if (!lastPhoneme) {
          throw new Exception("Unexpected 'COMBINING DOUBLE BREVE' without base");
        }
        combining = true;
      } else {
        if (combining) {
          lastPhoneme.base += char;
          combining = false;
        } else {
          if (lastPhoneme) {
            phonemes.push(lastPhoneme);
          }
          lastPhoneme = {
            'base': char
          }
        }
      }
    }
    phonemes.push(lastPhoneme);
    return phonemes;
  }

  static _replaceAll(input, actions) {
    let tmp = input;
    for (let key in actions) {
      let regex = new RegExp(key, 'gi');
      tmp = tmp.replace(regex, actions[key]);
    }
    return tmp;
  }
} 