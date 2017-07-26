class IPA {
  constructor() { };

  static normalize(string) {
    // simplification
    string = string.replace(/ʷ/g, 'w'); // Labiovelarisation simplified
    string = string.replace(/ʲ/g, 'j'); // Palatalisation simplified

    // IPA normalization
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

    for (let key in normalization) {
      let regex = new RegExp(key, 'gi');
      string = string.replace(regex, normalization[key]);
    }


    return string.normalize("NFD");
  }

  static parsePhonemes(ipaString) {
    if (!ipaString || ipaString.length === 0) {
      return [];
    }

    let normalized = this.normalize(ipaString);

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
} 