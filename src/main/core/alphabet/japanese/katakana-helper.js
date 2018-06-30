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

    this.SOKUON = '\u30c3'; // ッ
    this.CHOOPNU = '\u30FC'; // ー
    this.N = '\u30F3'; // ン
  }

  /**
  * @param {String} consonantKey
  * @param {String} vowelKey 
  * @returns {KanaDescription}
  */
  getKana(consonantKey, vowelKey) {
    return this.data[consonantKey].vowels[vowelKey];
  }

  /** Returns a data structure reflecting the effect of /Q/ before the consonant
   * { 'available' : boolean // true if gemination is available for this consonant
   *   'ipa' : string // the ipa value of the gemination sound
   * }
   * @param {String} consonantKey
   * @returns {String}
   */
  getGeminationData(consonantKey) {
    let value = this.data[consonantKey].gemination;

    if (value) {
      return {
        'available': true,
        'ipa': value
      };
    } else {
      return {
        'available': false,
        'ipa': null
      };
    }
  }

  /**
  * @param {String} vowelKey
  * @param {String} nextConsonantKey Null if no following consonant
  * @returns {String}
  */
  nToIPA(vowelKey, nextConsonantKey) {
    if (!nextConsonantKey) {
      return '\u0274'; // ɴ
    }

    let nextNCategory = this.data[nextConsonantKey].nCategory;
    switch (nextNCategory) {
      case "m":
        return 'm'; // m
      case "n":
        return 'n'; // m
      case "ng":
        return '\u014B'; // ŋ
      case "vowel":
        return this._getNasalizedVowel(vowelKey);
      default:
        console.error("invalid 'nCategory':" + nextNCategory);
        return "";
    }
  }

  /** Returns the IPA representation of the nazalised vowel
   * @param {String} vowelKey
   * @returns {String}
   */
  _getNasalizedVowel(vowelKey) {
    let singleVowelKana = this.getKana("", vowelKey);
    return singleVowelKana.ipa + NASAL_MARK;
  }

  /** returns try to find another valid vowelKey for this consonnant and return it.
   * If there is no other vowelKey, return the original vowelKey
   * @param {String} consonantKey
   * @param {String} vowelKey
   * @returns {String} an alternative vowelKey
   */
  alternativeVowelKey(consonantKey, vowelKey) {
    let consonantDesc = this.data[consonantKey];
    let otherVowels = Object.keys(consonantDesc.vowels);
    otherVowels.splice(otherVowels.indexOf(vowelKey), 1);
    if (otherVowels.length > 0) {
      return Random.inArray(otherVowels);
    } else {
      return vowelKey;
    }
  }

  /** Returns try to find another valid consonantKey for this vowel and return it.
   * If there is no other consonantKey, return the original consonantKey
   * @param {String} consonantKey
   * @param {String} vowelKey
   * @returns {String} an alterntive consonantKey
   */
  alternativeConsonantKey(consonantKey, vowelKey) {
    let otherConsonants = new Set(this.vowelCombination[vowelKey]);
    otherConsonants.delete(consonantKey);
    if (otherConsonants.size > 0) {
      return Random.inArray([...otherConsonants]);
    } else {
      return consonantKey;
    }
  }

  /**
   * @returns { {consonant: String, vowel: String } }
   */
  getRandomKeys() {
    let consonant = Random.inArray(Object.keys(this.data));
    let vowel = Random.inArray(Object.keys(this.data[consonant].vowels));
    return {
      consonant: consonant,
      vowel: vowel
    };
  }
}