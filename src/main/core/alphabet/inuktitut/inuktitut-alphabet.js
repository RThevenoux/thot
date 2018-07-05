class InuktitutAlphabet {

  /*
    data : {
      consonantKeys: ["c1","c2",...],
      vowelKeys: ["v1","v2",...],
      combinations : {
        "cv":{
          "display":"",
          "ipa":""
        }
      }
    }

    Gene :
      {
        consonant: "",
        vowel: ""
      }
  */

  constructor(data) {
    this.data = data;
    this.name = "Inuktitut";
  }

  mutateGene(gene) {
    if (Math.random() < 0.6) {
      let newConsonant = Random.inArray(this.data.consonantKeys);
      return {
        vowel: gene.vowel,
        consonant: newConsonant
      };
    } else {
      let newVowel = Random.inArray(this.data.vowelKeys);
      return {
        vowel: newVowel,
        consonant: gene.consonant
      };
    }
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
  }

  getRandomGene() {
    let consonant = Random.inArray(this.data.consonantKeys);
    let vowel = Random.inArray(this.data.vowelKeys);

    return {
      consonant: consonant,
      vowel: vowel
    };
  }

  /**
   * @param {Genotype} genotype
   * @returns {Phenotype} 
   */
  generatePhenotype(genotype) {
    let builder = new PhenotypeBuilder();

    genotype.getGenes().forEach(gene => {
      if (gene.consonant || gene.vowel) { // 'H' is ignored
        let combinationKey = gene.consonant + gene.vowel;
        let combination = this.data.combinations[combinationKey];
        builder.add(combination.display, combination.ipa);
      }
    });

    return builder.build();
  }
}