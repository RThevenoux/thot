class BasicAlphabet {

    /*
      data : {
        "display1": "ipa1",
        "display2": "ipa2",
        ...
      }
  
      Gene :
        {
          display: ""
        }
    */

    constructor(data, name) {
        this.data = data;
        this.name = name;
    }

    mutateGene(gene) {
        return this.getRandomGene();
    }

    /**
    * @param {IpaPhoneme[]} phonemes
    * @returns {Genotype} 
    */
    generateRandomGenotype(phonemes) {
        let genes = [];
        for (let i = 0; i < phonemes.length; i++) {
            genes.push(this.getRandomGene());
        }
        return new Genotype(genes, this);
    }

    getRandomGene() {
        return {
            display: Random.inArray(Object.keys(this.data))
        };
    }

    /**
    * @param {Genotype} genotype
    * @returns {Phenotype} 
    */
    generatePhenotype(genotype) {
        let builder = new PhenotypeBuilder();
        genotype.getGenes().forEach(gene => {
            let ipa = this.data[gene.display];
            builder.add(gene.display, ipa);
        });
        return builder.build();
    }
}