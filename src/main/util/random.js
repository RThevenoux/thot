class Random {
    /**
     * 
     * @param {*[]} items
     * @returns {*}
     */
    static inArray(items) {
        let index = Math.floor(Math.random() * items.length);
        return items[index];
    }

    /**
     * 
     * @param {*[]} items 
     * @param {Number[]} weights
     */
    static inWeightedArray(items, weights) {
        let index = this._randomIndexWeighted(weights);
        return items[index];
    }

    static _randomIndexWeighted(weights) {
        let sumOfWeights = weights.reduce((a, b) => a + b);
        let sum = 0;
        let r = Math.random() * sumOfWeights;
        for (let i in weights) {
            sum += weights[i];
            if (r <= sum) return i;
        }
    }
}