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
     * @param {Individual[]} population
     * @returns {Genome}
     */
    generateGenome(population) {
        let parents = this._selectParentGenomes(population);
        let child = this._mateGenomes(parents);
        let mutated = this.mutator.mutateGenome(child, this.parameters.mutationRate);
        return mutated;
    }

    /**
     * @param {Individual[]} population
     * @returns {Genome[]}
     */
    _selectParentGenomes(population) {
        let number = this.parameters.parentPerChild;

        let weights = this._getWeights(population);
        let selectedGenomes = [];

        for (let i = 0; i < number; i++) {
            let selected = Random.inWeightedArray(population, weights);
            selectedGenomes.push(selected.genome);
        }

        return selectedGenomes;
    }

    /**
     * @param {Individual[]} population
     * @returns {Number[]}
     */
    _getWeights(population) {
        let bias = this.parameters.sBias;
        return population.map(indivual => 1 / (indivual.score ^ bias));
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