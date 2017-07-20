class Scorer {
  constructor(targetPhoneme, featureSchema) {
    this.featureSchema = featureSchema;
    this.targetFeatures = this._getFeatures(targetPhoneme);
  }

  computeScore(phonemes) {
    let features = this._getFeatures(phonemes);
    let score = getLevenshtein(features, this.targetFeatures, this.featureSchema);
    return score;
  }

  _getFeatures(phonemes) {
    return phonemes.map(x => this.featureSchema.parse(x));
  }
}