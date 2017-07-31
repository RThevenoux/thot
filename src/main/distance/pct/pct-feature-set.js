class PctFeatureSet extends AbstractFeatureSet{
  constructor(data) {
    super();
    this.name = "Derive from PCT (Phonologic Corpus Tool)";
    this.mapping = data;
  }

  /**
   * 
   * @param {IpaPhoneme} phoneme 
   */
  parse(phoneme) {
    let feature = this.mapping[phoneme.base];
    return feature;
  }
};