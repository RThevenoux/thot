class IpaPhoneme {
    constructor(base) {
        this.base = base;
        this.nasal = false;
        this.long = false;
    }

    /**
     * @param {String} char 
     */
    combineBase(char){
        this.base += char;
    }
}