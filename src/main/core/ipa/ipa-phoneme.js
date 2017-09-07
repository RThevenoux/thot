class IpaPhoneme {

    static vowel(base, property) {
        let phoneme = new IpaPhoneme(base);
        phoneme.vowel = property;
        return phoneme;
    }

    static consonant(base, property) {
        let phoneme =  new IpaPhoneme(base);
        phoneme.consonant = property;
        return phoneme;
    }

    constructor(base) {
        this.base = base;
        this.nasal = false;
        this.long = false;
    }

    /**
     * @param {String} char 
     */
    combineBase(char) {
        this.base += char;
    }
}