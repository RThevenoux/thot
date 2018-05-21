class Scorer {

  /**
   * @param {AbstractFeatureMapper} featureMapper 
   * @param {FeatureComparator} featureComparator 
   */
  constructor(featureMapper, featureComparator) {
    this.featureMapper = featureMapper;
    this.featureComparator = featureComparator;

    this.insertionCost = 2;
    this.deletionCost = 2;
  }

  /**
   * @param {IpaPhoneme[]} targetPhonemes 
   */
  setTargetPhonemes(targetPhonemes) {
    this.targetFeatures = this.featureMapper.parseArray(targetPhonemes);
  }

  /**
   * @param {IpaPhoneme[]}
   * @returns {Number} 
   */
  computeDistance(challengerPhonemes) {
    let challengerFeatures = this.featureMapper.parseArray(challengerPhonemes);
    return this._levenshtein(challengerFeatures, this.targetFeatures);
  }

  /**
  * Compute the edit distance between the two given Features array
  * @param {Features[]} a
  * @param {Features[]} b
  * @returns {Number}
  */
  _levenshtein(a, b) {
    if (a.length === 0) return b.length * this.insertionCost;
    if (b.length === 0) return a.length * this.insertionCost;

    let matrix = [];

    // increment along the first column of each row
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i * this.insertionCost];
    }

    // increment each column in the first row
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j * this.insertionCost;
    }

    // Fill in the rest of the matrix
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        let featuresA = a[j - 1];
        let featuresB = b[i - 1];

        let distance = this.featureComparator.distance(featuresA, featuresB);

        let substitution = matrix[i - 1][j - 1] + distance;
        let insertion = matrix[i][j - 1] + this.insertionCost;
        let deletion = matrix[i - 1][j] + this.deletionCost;

        matrix[i][j] = Math.min(substitution, insertion, deletion);
      }
    }

    return matrix[b.length][a.length];
  }
}