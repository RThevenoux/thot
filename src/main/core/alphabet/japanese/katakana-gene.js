class KatakanaGene {

    /**
     * @param {String} consonantKey 
     * @param {String} vowelKey 
     * @param {boolean} choonpu true if choonpu after
     * @param {boolean} sokuon true if sukuon before
     * @param {boolean} n true if /N/ kana after
     */
    constructor(consonantKey, vowelKey, choonpu, sokuon, n) {
        this.consonantKey = consonantKey;
        this.vowelKey = vowelKey;
        this.choonpu = choonpu;
        this.sokuon = sokuon;
        this.n = n;
    };

    /**
     * @returns {KatakanaGene} a copy
     */
    clone() {
        return new KatakanaGene(this.consonantKey, this.vowelKey, this.choonpu, this.sokuon, this.n);
    }

    switchN() {
        this.n != this.n;
    }

    switchChoonpu() {
        this.choonpu != this.choonpu;
    }

    switchSukuon() {
        this.sokuon != this.sokuon;
    }
}