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
    if (!feature) {
      return null;
    }

    phoneme.coarticaltions.forEach(coarticaltion => {
      switch (coarticaltion) {
        case "Nasalized":
          feature.nasal = '+';
          break;
        case "Labialized":
          feature.labial = "+";
          feature.round = "+";
          break;
      }
    });

    if (phoneme.quantity.isLong()) {
      feature.long = '+';
    }

    return feature;
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