class Scorer {

  /**
   * 
   * @param {String} targetIpaString 
   * @param {AbstractFeatureSet} featureSet 
   * @param {AbstractFeatureComparator} featureComparator 
   */
  constructor(targetIpaString, featureSet, featureComparator) {
    this.featureSet = featureSet;
    let phonemes = IPA.parsePhonemes(targetIpaString);   
    this.targetFeatures = this.featureSet.parseArray(phonemes);
    this.comparator = new Levenshtein(featureComparator);
  }

  /**
   * @param {String} ipaString
   * @returns {Number} 
   */
  computeScore(ipaString) {
    let phonemes = IPA.parsePhonemes(ipaString);
    let features = this.featureSet.parseArray(phonemes);
    return this.comparator.distance(features, this.targetFeatures);
  }
}