class AbstractFeatureMapper {
    constructor() { }

    /**
     * @param {IpaPhoneme[]} phonemes
     * @returns {FeatureSet[]} 
     */
    parseArray(phonemes) {
        return phonemes.map(x => this.parse(x));
    }
}