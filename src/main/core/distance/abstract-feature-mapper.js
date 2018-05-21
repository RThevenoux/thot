class AbstractFeatureMapper {
    constructor() { }

    /**
     * @param {IpaPhoneme[]} phonemes
     * @returns {Features[]} 
     */
    parseArray(phonemes) {
        return phonemes.map(x => this.parse(x));
    }
}