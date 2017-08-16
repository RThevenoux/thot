class Scorer {

  /**
   * 
   * @param {String} targetIpaString 
   * @param {AbstractFeatureSet} featureSet 
   * @param {AbstractFeatureComparator} featureComparator 
   */
  constructor(targetIpaString, featureSet, featureComparator) {
    this.featureSet = featureSet;
    this.phonemes = IPA.parsePhonemes(targetIpaString);
    this.targetFeatures = this.featureSet.parseArray(this.phonemes);
    this.comparator = new Levenshtein(featureComparator);
  }

  /**
   * @param {String} ipaString
   * @returns {Number} 
   */
  computeDistance(challengerIPA) {
    let challengerPhonemes = IPA.parsePhonemes(challengerIPA);
    let challengerFeatures = this.featureSet.parseArray(challengerPhonemes);
    return this.comparator.distance(challengerFeatures, this.targetFeatures);
  }

  /**
   * @returns {Number} 
   */
  getTargetPhonemeLength() {
    return this.phonemes.length;
  }
}