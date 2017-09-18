class IpaTranscriptionBuilder {
  constructor() {
    this.phonemes = [];
    this.pendingPhoneme = null;
    this.combining = false;
  }

  /**
   * @param {IpaSymbol} symbol 
   */
  add(symbol) {
    if (this.combining) {
      switch (symbol.type) {
        case "vowel":
        case "consonant":
          this.pendingPhoneme.combineBase(symbol.base);
          this.combining = false;
          break;
        default:
          throw this._unexpectedSymbol(symbol);
      }
    } else {
      switch (symbol.type) {
        case "combining": this._combining(symbol); break;
        case "diacritic": this._diacritic(symbol); break;
        case "vowel": this._vowel(symbol); break;
        case "consonant": this._consonant(symbol); break;
        default: break;
      }
    }
  }

  end() {
    this._endPhoneme();
    return this.phonemes;
  }

  _consonant(symbol) {
    this._endPhoneme();
    this.pendingPhoneme = new ConsonantPhoneme(symbol);
  }

  _combining(symbol) {
    if (!this.pendingPhoneme) {
      throw this._unexpectedSymbol(symbol);
    }
    this.combining = true;
  }

  _diacritic(symbol) {
    if (!this.pendingPhoneme) {
      throw this._unexpectedSymbol(symbol);
    }

    if (symbol.diacritic.type === "co-articulation") {
      this.pendingPhoneme.coarticaltions.push(symbol.diacritic.label);
    } else if (symbol.diacritic.type === "length") {
      this.pendingPhoneme.quantity.update(symbol);
    }
  }

  _vowel(symbol) {
    this._endPhoneme();
    this.pendingPhoneme = new VowelPhoneme(symbol);
  }

  _endPhoneme() {
    if (this.pendingPhoneme) {
      this.phonemes.push(this.pendingPhoneme);
      this.pendingPhoneme = null;
    }
  }

  _unexpectedSymbol(symbol) {
    return new Exception("Unexpected symbol. Combining= " + this.combining
      + "isPendingPhonemen= " + (this.pendingPhoneme ? true : false)
      + ", symboleType= " + symbol.type + ", symbol: " + symbol.base);
  }
}