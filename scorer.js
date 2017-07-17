function Scorer(targetPhoneme, featureSchema){
    // function
    this.computeScore = _computeScore;
    this._getFeatures = _getFeatures;

    // variable
    this.featureSchema = featureSchema;
    this.targetFeatures = this._getFeatures(targetPhoneme);
}

function _getFeatures(phonemes){
    return phonemes.map(x=> this.featureSchema.parse(x));
}

function _computeScore(phonemes){
    let features = this._getFeatures(phonemes);
    let score =  getLevenshtein(features, this.targetFeatures, this.featureSchema);
    return score;
}