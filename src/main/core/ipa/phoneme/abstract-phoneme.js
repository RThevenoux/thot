class AbstractPhoneme {
  constructor(base, type) {
    this.base = base;
    this.type = type;
    this.coarticaltions = [];
    this.quantity = new IpaQuantity();
  }

  /**
   * 
   * @param {IpaSymbol} symbol 
   */
  updateArticulation(symbol) {
    // Need to be Override
  }

  /**
   * 
   * @param {IpaSymbol} symbol 
   */
  updateCoarticulation(symbol) {
    this.coarticaltions.push(symbol.diacritic.label);
  }
}