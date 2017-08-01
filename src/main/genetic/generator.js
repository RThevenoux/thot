class Generator {

    /**
     * @param {*} mutator 
     * @param {ParameterModel} parameters 
     */
    constructor(mutator, parameters) {
        this.mutator = mutator;
        this.parameters = parameters;
    };

    /**
     * @param {Population} population
     * @returns {Genome}
     */
    generateGenome(population) {
        let parents = this._selectParentGenomes(population);
        let child = this._mateGenomes(parents);
        let mutated = this.mutator.mutateGenome(child, this.parameters.mutationRate);
        return mutated;
    }

    /**
     * @param {Population} population
     * @returns {Genome[]}
     */
    _selectParentGenomes(population) {
        let number = this.parameters.parentPerChild;

        let selectedGenomes = [];
        for (let i = 0; i < number; i++) {
            let selected = population.select();
            selectedGenomes.push(selected.genome);
        }

        return selectedGenomes;
    }

    /**
     * @param {Genome[]} population
     * @returns {Genome}
     */
    _mateGenomes(genomes) {
        let n = genomes.length;
        let chunkSize = Math.floor(genomes[0].length / n);

        let newGenome = [];
        for (let i = 0; i < n; i++) {
            let startIndex = i * chunkSize;
            let endIndex = (i === n - 1 ? genomes[0].length : (i + 1) * chunkSize);
            let chunk = genomes[i].slice(startIndex, endIndex);
            newGenome = newGenome.concat(chunk);
        }

        return newGenome;
    }
}