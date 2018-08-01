class PctFeatureMapper extends AbstractFeatureMapper {
  constructor(data) {
    super();
    this.name = "Derive from PCT (Phonologic Corpus Tool)";
    this.mapping = data;
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

    let features = new FeatureSet(baseFeatures);

    phoneme.coarticulation.forEach(coarticaltion => {
      switch (coarticaltion) {
        case "Nasalized":
          features.add('nasal', '+');
          break;
        case "Labialized":
          features.add('labial', "+");
          features.add('round', "+");
          break;
      }
    });

    if (phoneme.quantity.isLong()) {
      features.add('long', '+');
    }

    return features;
  }
};