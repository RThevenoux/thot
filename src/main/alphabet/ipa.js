class IPA {
  constructor() { };

  static normalize(string) {
    // simplification
    string = string.replace(/ʷ/g, 'w'); // Labiovelarisation simplified
    string = string.replace(/ʲ/g, 'j'); // Labiovelarisation simplified

    // IPA normalization
    let normalization = {
      'g': 'ɡ', // U+0067 > U+0261
      "ʦ": "t͡s",
      "ʣ": "d͡z",
      "ʧ": "t͡ʃ",
      "ʤ": "d͡ʒ",
      "ʨ": "t͡ɕ",
      "ʥ": "d͡ʑ",
      "ɚ": "ə˞",
      "ɝ": "ɜ˞",
      "͜": "͡",
      ":": "ː", // U+003A > U+02D0 (Chrone)
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
    let lastPhoneme = {};

    for (let i = 0; i < normalized.length; i++) {
      let char = normalized[i];
      if (char === "\u0303") {
        if (lastPhoneme == null) {
          throw new Exception("Unexpected '~' without base");
        }
        lastPhoneme.nasal = true;
      } else {
        if (i != 0) {
          phonemes.push(lastPhoneme);
        }
        lastPhoneme = {
          'base': char
        };
      }
    }

    phonemes.push(lastPhoneme);
    return phonemes;
  }
} 