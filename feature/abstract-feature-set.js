class AbstractFeatureSet {
    constructor() { }

    parseArray(phonemes) {
        return phonemes.map(x => this.parse(x));
    }
}