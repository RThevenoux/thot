class Individual {

    /**
     * @param {Genotype} genotype 
     * @param {String} display 
     * @param {String} ipa 
     * @param {Number} distance 
     * @param {Number} score 
     */
    constructor(genotype, display, ipa, distance, score) {
        this.genotype = genotype;
        this.display = display;
        this.ipa = ipa;
        this.distance = distance;
        this.score = score;
    }
}