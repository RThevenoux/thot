class VowelPhoneme extends AbstractPhoneme {

  /**
   * @param {IpaSymbol} symbol 
   */
  constructor(symbol) {
    super(symbol.base, "vowel");
    this.height = symbol.height;
    this.backness = symbol.backness;
    this.rounded = symbol.rounded
  }
}