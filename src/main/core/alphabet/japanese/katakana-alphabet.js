class KatakanaAlphabet {

  /**
   * 
   * @param {KatakanaHelper} helper 
   */
  constructor(helper) {
    this.helper = helper;
    this.name = "Katakana";
  }

  /**
   * 
   * @param {KatakanaGene} gene 
   * @returns {KatakanaGene} a new mutated gene 
   */
  mutateGene(gene) {
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
   * @returns {Genotype}
   */
  generateRandomGenotype(phonemes) {
    let min = 1;
    let phonemePerGlyph = 1.9;
    let length = Math.max(phonemes.length * (1 + (Math.random() - .5) / phonemePerGlyph, min));

    let genes = [];
    for (let i = 0; i < length; i++) {
      genes.push(this.getRandomGene());
    }

    return new Genotype(genes, this);
  };

  /**
   * @param {Genotype} genotype
   * @returns {Phenotype} 
   */
  generatePhenotype(genotype) {
    let builder = new PhenotypeBuilder();
    let genes = genotype.getGenes();

    for (let i = 0; i < genes.length; i++) {
      let gene = genes[i];

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
        builder.add(this.helper.CHOOPNU, IPA_LONG_MARK);
      }

      // Kana "n" (ン) : add a nasal consonant or the IPA_NASAL_MARK
      if (gene.n) {
        let vowelKey = gene.vowelKey;

        let nextConsonantKey = null;
        if (i !== genes.length - 1) {
          nextConsonantKey = genes[i + 1].consonantKey;
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
  getRandomGene() {
    let n = Math.random() < 0.1;
    let sokuon = Math.random() < 0.1;
    let choonpu = Math.random() < 0.1;

    let keys = this.helper.getRandomKeys();

    return new KatakanaGene(keys.consonant, keys.vowel, choonpu, sokuon, n);
  }
}