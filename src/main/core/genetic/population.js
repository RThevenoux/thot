class Population {
    /**
     * 
     * @param {Number} selectionBiais 
     */
    constructor(selectionBiais){
        /**
         * @type {Number}
         */
        this.generation = 0;
        /**
         * @type {Individual[]}
         */
        this.individuals = [];
        /**
         * @type {Number[]}
         */
        this.weights = [];
        /**
         * @type {Number}
         */
        this.selectionBiais = selectionBiais;
    }

    /**
     * 
     * @param {Individual[]} individuals 
     */
    newGeneration(individuals){
        this.individuals = individuals.sort((a, b) => a.distance - b.distance);
        this.weights = this.individuals.map(indivual => 1 / (indivual.distance ^ this.selectionBiais));
        this.generation++;
    }

    /**
     * @returns {Number}
     */
    getBest(){
        return this.individuals[0];
    }

    /**
     * 
     * @param {Number} eliteNumber 
     */
    getElite(eliteNumber){
        return this.individuals.slice(0, eliteNumber);
    }

    /**
     * @returns {Individual}
     */
    select(){
        return Random.inWeightedArray(this.individuals, this.weights);
    }
}