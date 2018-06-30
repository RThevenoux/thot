class KatakanaAlphabet {

  /*
  *  Genome : array of KatakanaGene
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
   * @param {KatakanaGene[]} genome 
   * @param {Number} mutationRate
   * @returns {KatakanaGene[]} 
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

  /**
   * 
   * @param {KatakanaGene} gene 
   * @returns {KatakanaGene} a new mutated gene 
   */
  _mutateGene(gene) {
    let mutated = gene.clone();

    let mutationType = Math.random();
    if (mutationType < 0.35) {
      mutated.vowelKey = this.helper.alternativeVowelKey(gene.consonantKey, gene.vowelKey);
    } else if (mutationType >= 0.35 && mutationType < 0.7) {
      mutated.consonantKey = this.helper.alternativeConsonantKey(gene.consonantKey, gene.vowelKey);
    } else if (mutationType >= 0.7 && mutationType < 0.8) {
      mutated.switchSukuon();
    } else if (mutationType >= 0.8 && mutationType < 0.9) {
      mutated.switchChoonpu();
    } else if (mutationType >= 0.9) {
      mutated.switchN();
    }

    return mutated;
  }

  /**
   * @param {IpaPhoneme[]} phonemes
   * @returns {KatakanaGene[]} genome as an array of KatakanaGene
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
   * @param {KatakanaGene[]} genome
   * @returns {Phenotype} 
   */
  generatePhenotype(genome) {
    let builder = new PhenotypeBuilder();

    for (let i = 0; i < genome.length; i++) {
      let gene = genome[i];

      // Sokuon (gemination)
      if (gene.sokuon && i != 0) {
        let geminationData = this.helper.getGeminationData(gene.consonantKey);
        if (geminationData.available) {
          builder.add(this.helper.SOKUON, geminationData.ipa);
        }
      }

      // Main information
      let kana = this.helper.getKana(gene.consonantKey, gene.vowelKey);
      builder.add(kana.display, kana.ipa);

      // Choonpu (long vowel)
      if (gene.choonpu) {
        builder.add(this.helper.CHOOPNU, LONG_MARK);
      }

      // Kana "n" (ン) : add a nasal consonant or the NASAL_MARK
      if (gene.n) {
        let vowelKey = gene.vowelKey;

        let nextConsonantKey = null;
        if (i !== genome.length - 1) {
          nextConsonantKey = genome[i + 1].consonantKey;
        }

        let ipa = this.helper.nToIPA(vowelKey, nextConsonantKey);
        builder.add(this.helper.N, ipa);
      }
    }

    return builder.build();
  };

  /**
   * @returns {KatakanaGene}
   */
  _getRandomGene() {
    let n = Math.random() < 0.1;
    let sokuon = Math.random() < 0.1;
    let choonpu = Math.random() < 0.1;

    let keys = this.helper.getRandomKeys();

    return new KatakanaGene(keys.consonant, keys.vowel, choonpu, sokuon, n);
  }
}