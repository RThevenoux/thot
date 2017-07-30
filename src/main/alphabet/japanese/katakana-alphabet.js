class KatakanaAlphabet {
  /*
    Genome : array of Gene
    Gene :
      {
        consonant: "",
        vowel: "",
        choonpu: bool, // true if choonpu after
        sokuon: bool, // true if sukuon before
        n: bool, //true if /N/ kana after 
      }
  */

  /*
    vowelCombination : {vowel:[consonant]}

    katakanas: {
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
  */
  constructor(katakanas, vowelCombination) {
    console.log(JSON.stringify(vowelCombination));
    this.katakanas = katakanas;
    this.vowelCombination = vowelCombination;
    this.name = "Katakana"
  }

  mutateGenome(genome, mutationRate) {
    let result = [];

    for (let i = 0; i < genome.length; i++) {
      let gene = genome[i];
      if (Math.random() <= mutationRate) {
        // # Mutation
        let mutationType = Math.random();
        if (mutationType < 0.2) {
          // Duplication p=0.2
          result.push(gene);
          result.push(gene);
        } else if (mutationType >= 0.2 && mutationType < 0.4) {
          // Deletion p=0.2
          // do not add gene
        } else {
          let mutated = this._mutateGene(gene)
          // mutation p=0.2
          result.push(mutated);
        }
      } else {
        // # No alteration
        result.push(gene);
      }
    }
    return result;
  }

  _mutateGene(gene) {
    let mutationType = Math.random();
    let mutated = {
      consonant: gene.consonant,
      vowel: gene.vowel,
      choonpu: gene.choonpu,
      sokuon: gene.sokuon,
      n: gene.n
    };

    if (mutationType < 0.35) {
      // Change vowel
      let consonantDesc = this.katakanas[gene.consonant];
      let otherVowels = Object.keys(consonantDesc.vowels);
      otherVowels.splice(otherVowels.indexOf(gene.vowel), 1);
      if (otherVowels.length > 0) {
        mutated.vowel = this._randomInArray(otherVowels);
      }
    } else if (mutationType >= 0.35 && mutationType < 0.7) {
      // Change consonant
      let otherConsonants = new Set(this.vowelCombination[gene.vowel]);
      otherConsonants.delete(gene.consonant);
      if (otherConsonants.size > 0) {
        mutated.consonant = this._randomInArray([...otherConsonants]);
      }
    } else if (mutationType >= 0.7 && mutationType < 0.8) {
      mutated.sokuon = !mutated.sokuon;
    } else if (mutationType >= 0.8 && mutationType < 0.9) {
      mutated.choonpu = !mutated.choonpu;
    } else if (mutationType >= 0.9) {
      mutated.n = !mutated.n;
    }

    return mutated;
  }

  generateRandomGenome(ipaPhonemes) {
    let length = ipaPhonemes.length * (1 + (Math.random() - .5));
    let genome = [];
    for (let i = 0; i < length; i++) {
      genome.push(this._getRandomGene());
    }

    let tmp = this.generatePhenotype(genome);
    let tmp2 = "";
    genome.forEach(x => tmp2 += (x.sokuon ? 'Q' : '') + x.consonant + x.vowel + (x.choonpu ? 'R' : '') + (x.n ? 'N' : ''));
    console.log("Random: l=" + genome.length + " p:" + tmp2 + " i:" + tmp.ipa + " d:" + tmp.display);

    return genome;
  };

  generatePhenotype(genome) {
    let display = "";
    let ipa = "";

    for (let i = 0; i < genome.length; i++) {
      let gene = genome[i];
      let consonant = this.katakanas[gene.consonant];
      let kana = consonant.vowels[gene.vowel];

      if (gene.sokuon && consonant.gemination && i != 0) {
        display += '\u30c3'; // ッ
        ipa += consonant.gemination;
      }

      display += kana.display;
      ipa += kana.ipa;

      if (gene.choonpu) {
        display += '\u30FC'; // ー
        ipa += '\u02D0'; // 'ː', long vowel 
      }

      if (gene.n) {
        display += '\u30F3'; // ン
        if (i === genome.length - 1) {
          ipa += '\u0274'; // ɴ
        } else {
          let nextGene = genome[i + 1];
          ipa += this._nToIPA(gene, nextGene);
        }
      }
    }

    return {
      ipa: ipa,
      display: display
    };
  };

  _nToIPA(gene, nextGene) {
    let nextConsonant = this.katakanas[nextGene.consonant];
    switch (nextConsonant.nCategory) {
      case "m":
        return 'm'; // m
      case "n":
        return 'n'; // m
      case "ng":
        return '\u014B'; // ŋ
      case "vowel":
        let simpleVowel = this.katakanas[""].vowels[gene.vowel];
        return simpleVowel + NASAL_MARK;
      default:
        console.error("invalid 'nCategory':" + nextConsonant.nCategory);
        return "";
    }
  }

  _getRandomGene() {
    let n = Math.random() < 0.1;
    let sokuon = Math.random() < 0.1;
    let choonpu = Math.random() < 0.1;

    let consonant = this._randomInArray(Object.keys(this.katakanas));
    let vowel = this._randomInArray(Object.keys(this.katakanas[consonant].vowels));

    return {
      consonant: consonant,
      vowel: vowel,
      choonpu: choonpu,
      sokuon: sokuon,
      n: n
    };
  }

  _randomInArray(array) {
    let index = Math.floor(Math.random() * array.length);
    return array[index];
  }
}