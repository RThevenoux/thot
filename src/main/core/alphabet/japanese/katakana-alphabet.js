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

  /**
   * 
   * @param {KatakanaHelper} helper 
   */
  constructor(helper) {
    this.helper = helper;
    this.name = "Katakana";
  }

  /**
   * @param {Genome} genome 
   * @param {Number} mutationRate
   * @returns {Genome} 
   */
  mutateGenome(genome, mutationRate) {
    let result = [];

    let addition = (gene) => {
      result.push(gene);
      result.push(this._getRandomGene());
    };

    let mutation = (gene) => {
      let mutated = this._mutateGene(gene);
      result.push(mutated);
    };

    let deletion = (gene) => {
      if (genome.length == 1) {
        // Do not delete, mutate
        mutation(gene);
      } else {
        // do not add gene
      }
    };

    for (let i = 0; i < genome.length; i++) {
      let gene = genome[i];
      if (Math.random() <= mutationRate) {
        // # Mutation
        let modification = Random.inWeightedArray([addition, deletion, mutation], [1, 1, 5]);
        modification(gene);
      } else {
        // # No mutation
        result.push(gene);
      }
    }
    return result;
  }

  _mutateGene(gene) {
    let mutated = this._copyGene(gene);

    let mutationType = Math.random();
    if (mutationType < 0.35) {
      mutated.vowel = this.helper.changeVowelKey(gene);
    } else if (mutationType >= 0.35 && mutationType < 0.7) {
      let consonant = this.helper.changeConsonantKey(gene);
      mutated.consonant = consonant;
    } else if (mutationType >= 0.7 && mutationType < 0.8) {
      mutated.sokuon = !mutated.sokuon;
    } else if (mutationType >= 0.8 && mutationType < 0.9) {
      mutated.choonpu = !mutated.choonpu;
    } else if (mutationType >= 0.9) {
      mutated.n = !mutated.n;
    }

    return mutated;
  }

  _copyGene(gene) {
    return {
      consonant: gene.consonant,
      vowel: gene.vowel,
      choonpu: gene.choonpu,
      sokuon: gene.sokuon,
      n: gene.n
    };
  }

  /**
   * @param {IpaPhoneme[]} phonemes
   * @returns {Genome} 
   */
  generateRandomGenome(phonemes) {
    let min = 1;
    let phonemePerGlyph = 1.9;
    let length = Math.max(phonemes.length * (1 + (Math.random() - .5) / phonemePerGlyph, min));

    let genome = [];
    for (let i = 0; i < length; i++) {
      genome.push(this._getRandomGene());
    }

    return genome;
  };

  /**
   * @param {Genome} genome
   * @returns {Phenotype} 
   */
  generatePhenotype(genome) {
    let display = "";
    let ipa = "";

    for (let i = 0; i < genome.length; i++) {
      let gene = genome[i];
      let consonantGemination = this.helper.getGemination(gene.consonant);

      if (gene.sokuon && consonantGemination && i != 0) {
        display += '\u30c3'; // ッ
        ipa += consonantGemination;
      }

      let kana = this.helper.getKana(gene);
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

    return new Phenotype(display, ipa);
  };

  _nToIPA(gene, nextGene) {
    let nextNCategory = this.helper.getNCategory(nextGene.consonant);
    switch (nextNCategory) {
      case "m":
        return 'm'; // m
      case "n":
        return 'n'; // m
      case "ng":
        return '\u014B'; // ŋ
      case "vowel":
        return this.helper.getNasalizedVowel(gene.vowel);
      default:
        console.error("invalid 'nCategory':" + nextNCategory);
        return "";
    }
  }

  _getRandomGene() {
    let n = Math.random() < 0.1;
    let sokuon = Math.random() < 0.1;
    let choonpu = Math.random() < 0.1;

    let keys = this.helper.getRandomKeys();

    return {
      consonant: keys.consonant,
      vowel: keys.vowel,
      choonpu: choonpu,
      sokuon: sokuon,
      n: n
    };
  }
}