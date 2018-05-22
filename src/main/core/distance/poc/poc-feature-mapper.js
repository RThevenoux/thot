class PocFeatureMapper extends AbstractFeatureMapper {
  constructor(mapping) {
    super();
    this.name = "Proof of Concept Feature Set";
    this.mapping = mapping;
  }

  /**
   * 
   * @param {IpaPhoneme} phoneme
   * @returns {FeatureSet}
   */
  parse(phoneme) {
    let baseFeatures = this.mapping[phoneme.base];
    if (!baseFeatures) {
      return null;
    }

    let featureSet = new FeatureSet(baseFeatures);
    featureSet.add('nasal', (phoneme.nasal ? 1 : 0));
    return featureSet;
  }
};

