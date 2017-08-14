class PocFeatureSet extends AbstractFeatureSet {
  constructor(mapping) {
    super();
    this.name = "Proof of Concept Feature Set";
    this.mapping = mapping;
  }

  /**
   * 
   * @param {IpaPhoneme} phoneme
   * @returns {Features}
   */
  parse(phoneme) {
    let feature = this.mapping[phoneme.base];
    if (feature) {
      feature.nasal = (phoneme.nasal ? 1 : 0);
      return feature;
    } else {
      return null;
    }
  }
};

