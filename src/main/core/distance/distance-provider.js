class DistanceProvider {
    constructor() {
        this.distances = [
            {
                "name": "pct",
                "display": "PCT based",
                "factory": new PctFeatureFactory()
            },
            {
                "name": "poc",
                "display": "Proof of concept",
                "factory": new PocFeatureFactory()
            }
        ];
    }

    get(name, callback) {
        let distance = this.distances.find(distance => distance.name == name);
        if (!distance) {
            callback("Alphabet not found: " + name);
            return;
        }

        distance.factory.getFeatureSet((err, featureSet) => {
            if (err) {
                callback(err);
                return;
            }

            distance.factory.getFeatureComparator((err, featureComparator) => {
                if (err) {
                    callback(err);
                    return;
                }

                callback(null, {
                    featureSet: featureSet,
                    featureComparator: featureComparator
                });
            })
        });
    }
}