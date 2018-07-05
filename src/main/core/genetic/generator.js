class Generator {

    /**
     * @param {ParameterModel} parameters 
     */
    constructor(parameters) {
        this.parameters = parameters;
    };

    /**
     * @param {Population} population
     * @returns {Genotype}
     */
    generateGenotype(population) {
        let parents = this._selectParentGenotypes(population);
        let child = this._mateGenotypes(parents);
        let mutated = child.mutateGenotype(this.parameters.mutationRate);

        return mutated;
    }

    /**
     * @param {Population} population
     * @returns {Genotype[]}
     */
    _selectParentGenotypes(population) {
        let number = this.parameters.parentPerChild;

        let selectedGenotypes = [];
        for (let i = 0; i < number; i++) {
            let selected = population.select();
            selectedGenotypes.push(selected.genotype);
        }

        return selectedGenotypes;
    }

    /**
     * @param {Genotype[]} genotypes
     * @returns {Genotype}
     */
    _mateGenotypes(genotypes) {
        let n = genotypes.length;
        let defaultSize = genotypes[0].getGenes().length;
        let chunkSize = Math.floor(defaultSize / n);

        let newGenes = [];
        for (let i = 0; i < n; i++) {
            let startIndex = i * chunkSize;
            let endIndex = (i === n - 1 ? defaultSize : (i + 1) * chunkSize);
            let chunk = genotypes[i].getGenes().slice(startIndex, endIndex);
            newGenes = newGenes.concat(chunk);
        }

        return new Genotype(newGenes, genotypes[0].alphabet);
    }
}