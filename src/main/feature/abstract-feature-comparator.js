class AbstractFeatureComparator {
    constructor() {}

    distance(a, b) {
        let scoreSum = 0;
        let weightSum = 0;

        this.descriptors.forEach(featureDesc => {
            let featureA = a[featureDesc.name];
            let featureB = b[featureDesc.name];
            scoreSum += this._oneFeatureDistance(featureA, featureB, featureDesc) * featureDesc.weight;
            weightSum += featureDesc.weight;
        });

        return scoreSum / weightSum;
    }

    _oneFeatureDistance(featureA, featureB, featureDesc) {
        switch (featureDesc.type) {
            case "number": return this._numberDistance(featureA, featureB, featureDesc);
            case "value": return this._valueDistance(featureA, featureB, featureDesc);
            default: return 0;
        }
    }

    _numberDistance(a, b, featureDesc) {
        return Math.abs(a - b) / (featureDesc.max - featureDesc.min);
    }

    _valueDistance(a, b, featureDesc) {
        return (a === b ? 0 : 1);
    }
}