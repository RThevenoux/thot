class KatakanaHelper {

    /*  
      data: {
        consonant:{
          gemination: "" || false,
          nCategory: "m","n","ng","vowel"
          vowels:{
            vowel:{  
              display: '',
              ipa: ""
            }
          }
        }
      }

      vowelCombination : {vowel:[consonant]}
    */

    constructor(data, vowelCombination) {
        this.data = data;
        this.vowelCombination = vowelCombination;
    }

    /** return the IPA representation of the sound produce by /Q/ before the consonant */
    getGemination(consonantKey) {
        return this.data[consonantKey].gemination;
    }

    /** return the category of how if /N/ react is present before the consonant*/
    getNCategory(consonantKey) {
        return this.data[consonantKey].nCategory;
    }

    /** return the IPA representation of the nazalised vowel */
    getNasalizedVowel(vowelKey) {
        let singleVowelKana = this.getKana({ 'consonant': "", "vowel": vowelKey });
        return singleVowelKana.ipa + NASAL_MARK;
    }

    /** returns try to find another valid vowelKey for this consonnant and return it.
     * If there is no other vowelKey, return the original vowelKey
     * @param {KanaKey} key
     * @returns {String}*/
    changeVowelKey(key) {
        let consonantDesc = this.data[key.consonant];
        let otherVowels = Object.keys(consonantDesc.vowels);
        otherVowels.splice(otherVowels.indexOf(key.vowel), 1);
        if (otherVowels.length > 0) {
            return Util.randomInArray(otherVowels);
        } else {
            return key.vowel;
        }
    }

    /** Returns try to find another valid consonantKey for this vowel and return it.
     * If there is no other consonantKey, return the original consonantKey
     * @param {KanaKey} key
     * @returns {String}*/
    changeConsonantKey(key) {
        let otherConsonants = new Set(this.vowelCombination[key.vowel]);
        otherConsonants.delete(key.consonant);
        if (otherConsonants.size > 0) {
            return Util.randomInArray([...otherConsonants]);
        } else {
            return key.consonant;
        }
    }

    /**
     * @param {KanaKey} key 
     * @returns {KanaDescription} */
    getKana(key) {
        return this.data[key.consonant].vowels[key.vowel];
    }

    /**
     * @returns {KanaKey}
     */
    getRandomKeys() {
        let consonant = Util.randomInArray(Object.keys(this.data));
        let vowel = Util.randomInArray(Object.keys(this.data[consonant].vowels));
        return {
            consonant: consonant,
            vowel: vowel
        };
    }
}