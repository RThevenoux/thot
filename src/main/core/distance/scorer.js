class Scorer {

  /**
   * @param {AbstractFeatureSet} featureSet 
   * @param {AbstractFeatureComparator} featureComparator 
   */
  constructor(featureSet, featureComparator) {
    this.featureSet = featureSet;
    this.comparator = new Levenshtein(featureComparator);
  }

  /**
   * @param {IpaPhoneme[]} targetPhonemes 
   */
  setTargetPhonemes(targetPhonemes) {
    this.targetFeatures = this.featureSet.parseArray(targetPhonemes);
  }

  /**
   * @param {IpaPhoneme[]}
   * @returns {Number} 
   */
  computeDistance(challengerPhonemes) {
    let challengerFeatures = this.featureSet.parseArray(challengerPhonemes);
    return this.comparator.distance(challengerFeatures, this.targetFeatures);
  }
}