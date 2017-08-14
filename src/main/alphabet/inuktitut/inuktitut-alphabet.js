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

    Genome : array of Gene
    Gene :
      {
        consonant: "",
        vowel: ""
      }
  */

  constructor(data) {
    console.log(JSON.stringify(data));
    this.data = data;
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
        mutate(gene);
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
    if (Math.random() < 0.6) {
      return {
        vowel: gene.vowel,
        consonant: Random.inArray(this.data.consonantKeys)
      };
    } else {
      return {
        vowel: Random.inArray(this.data.vowelKeys),
        consonant: gene.consonant
      };
    }
  }

  /**
   * @param {IpaPhoneme[]} ipaPhonemes
   * @returns {Genome} 
   */
  generateRandomGenome(ipaTarget) {
    let phonemeNumber = IPA.parsePhonemes(ipaTarget).length;
    let min = 1;
    let phonemePerGlyph = 1.9;
    let length = Math.max(phonemeNumber * (1 + (Math.random() - .5) / phonemePerGlyph, min));

    let genome = [];
    for (let i = 0; i < length; i++) {
      genome.push(this._getRandomGene());
    }

    return genome;
  }

  _getRandomGene() {
    let consonant = Random.inArray(this.data.consonantKeys);
    let vowel = Random.inArray(this.data.vowelKeys);

    return {
      consonant: consonant,
      vowel: vowel
    };
  }

  /**
   * @param {Genome} genome
   * @returns {Phenotype} 
   */
  generatePhenotype(genome) {
    let display = "";
    let ipa = "";

    for (let i = 0; i < genome.length; i++) {
      let gene = genome[i];
      let combinationKey = gene.consonant + gene.vowel;
      let combination = this.data.combinations[combinationKey];
      display += combination.display;
      ipa += combination.ipa;
    }

    return new Phenotype(display, ipa);
  }
}