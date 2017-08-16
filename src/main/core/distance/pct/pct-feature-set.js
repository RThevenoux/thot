class PctFeatureSet extends AbstractFeatureSet {
  constructor(data) {
    super();
    this.name = "Derive from PCT (Phonologic Corpus Tool)";
    this.mapping = data;
  }

  /**
   * 
   * @param {IpaPhoneme} phoneme
   * @returns {Features}
   */
  parse(phoneme) {
    let feature = this._find(phoneme.base);
    if (feature) {

      if (phoneme.nasal) {
        feature.nasal = '+';
      }

      if (phoneme.long) {
        feature.long = '+';
      }
      
      return feature;
    } else {
      return null;
    }
  }

  _find(base) {
    let features = this.mapping[base];
    if (features) {
      let copy = {};
      for (let f in features) {
        copy[f] = features[f];
      }
      return copy;
    } else {
      return null;
    }
  }
};