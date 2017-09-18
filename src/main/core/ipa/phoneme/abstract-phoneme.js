class AbstractPhoneme {
  constructor(base, type) {
    this.base = base;
    this.type = type;
    this.coarticaltions = [];
    this.quantity = new IpaQuantity();
  }
}