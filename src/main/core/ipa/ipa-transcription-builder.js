class IpaTranscriptionBuilder {
  constructor() {
    this.phonemes = [];
    this.lastPhoneme = null;
    this.combining = false;
  }

  /**
   * 
   * @param {IpaSymbol} symbol 
   */
  add(symbol) {
    switch (symbol.type) {
      case "combining": this._combining();       break;
      case "diacritic": this._diacritic(symbol); break;
      case "vowel"    : this._vowel(symbol);     break;
      case "consonant": this._consonant(symbol); break;
      default: break;
    }
  }

  _consonant(symbol) {
    if (this.combining) {
      this.lastPhoneme.combineBase(symbol.base);
      this.combining = false;
    } else {
      if (this.lastPhoneme) {
        this.phonemes.push(this.lastPhoneme);
      }
      this.lastPhoneme = IpaPhoneme.consonant(symbol.base);
    }
  }
  
  _combining() {
    if (!this.lastPhoneme) {
      throw new Exception("Unexpected 'COMBINING DOUBLE BREVE' without base");
    }
    this.combining = true;
  }

  _diacritic(symbol) {
    if (!this.lastPhoneme) {
      throw new Exception("Unexpected diacritics without base : " + char);
    }
    if (this.combining) {
      throw new Exception("Unexpected diacritics after combining : " + char);
    }
    if (symbol.ipa === "Nasalized") {
      this.lastPhoneme.nasal = true;
    } else if (symbol.ipa === "Long") {
      this.lastPhoneme.long = true;
    } else {
      // ignore
    }
  }

  _vowel(symbol) {
    if (this.combining) {
      this.lastPhoneme.combineBase(symbol.base);
      this.combining = false;
    } else {
      if (this.lastPhoneme) {
        this.phonemes.push(this.lastPhoneme);
      }
      this.lastPhoneme = IpaPhoneme.consonant(symbol.base);
    }
  }

  end() {
    this.phonemes.push(this.lastPhoneme);
    return this.phonemes;
  }
}