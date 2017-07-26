class PocFeatureSet extends AbstractFeatureSet {
  constructor(mapping) {
    super();
    this.name = "Proof of Concept Feature Set";
    this.mapping = mapping;
  }

  parse(phoneme) {
    let feature = this.mapping[phoneme.base];
    feature.nasal = (phoneme.nasal ? 1 : 0);
    return feature;
  }
};

