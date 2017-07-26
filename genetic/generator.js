class Generator {
    constructor(mutator, parameters) {
        this.mutator = mutator;
        this.parameters = parameters;
    };

    generateGenome(population) {
        let parents = this._selectParents(population);
        let child = this._mateGenomes(parents);
        let mutated = this.mutator.mutateGenome(child, this.parameters.mutationRate);
        return mutated;
    }

    _selectParents(population) {
        let number = this.parameters.parentPerChild;

        let weightsArray = this._getWeights(population);
        let selectedGenomes = [];

        for (let i = 0; i < number; i++) {
            let selectedIndex = this._weightedRandSelection(weightsArray);
            let genome = population[selectedIndex].genome;
            selectedGenomes.push(genome);
        }

        return selectedGenomes;
    }

    _weightedRandSelection(weights) {
        let sumOfWeights = weights.reduce((a, b) => a + b);
        let i, sum = 0, r = Math.random() * sumOfWeights;
        for (i in weights) {
            sum += weights[i];
            if (r <= sum) return i;
        }
    }

    _getWeights(population) {
        let bias = this.parameters.sBias;
        return population.map(indivual => 1 / (indivual.score ^ bias));
    }

    _mateGenomes(parents) {
        let n = parents.length;
        let chunkSize = Math.floor(parents[0].length / n);

        let newGenome = [];

        for (let i = 0; i < n; i++) {
            let startIndex = i * chunkSize;
            let endIndex = (i === n - 1 ? parents[0].length : (i + 1) * chunkSize);
            let chunk = parents[i].slice(startIndex, endIndex);
            newGenome = newGenome.concat(chunk);
        }

        return newGenome;
    }
}