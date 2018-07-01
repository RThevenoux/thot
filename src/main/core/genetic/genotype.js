class Genotype {
    /**
     * 
     * @param {*[]} genes
     * @param {*} alphabet
     */
    constructor(genes, alphabet) {
        this.genes = genes;
        this.alphabet = alphabet;
    }

    /**
     * @returns {*[]}
     */
    getGenes() {
        return this.genes;
    }

    /**
    * @param {Number} mutationRate
    * @returns {Genotype} A new mutated Genotype
    */
    mutateGenome(mutationRate) {
        let result = [];

        let addition = (gene) => {
            result.push(gene);
            result.push(this.alphabet.getRandomGene());
        };

        let mutation = (gene) => {
            let mutated = this.alphabet.mutateGene(gene);
            result.push(mutated);
        };

        let deletion = (gene) => {
            if (this.genes.length == 1) {
                // Do not delete, mutate
                mutation(gene);
            } else {
                // do not add gene
            }
        };

        for (let i = 0; i < this.genes.length; i++) {
            let gene = this.genes[i];
            if (Math.random() <= mutationRate) {
                // Mutation
                let modification = Random.inWeightedArray([addition, deletion, mutation], [1, 1, 5]);
                modification(gene);
            } else {
                // No mutation
                result.push(gene);
            }
        }

        return new Genotype(result, this.alphabet);
    }

    /**
     * @returns {Phenotype}
     */
    generatePhenotype() {
        return this.alphabet.generatePhenotype(this);
    }
}