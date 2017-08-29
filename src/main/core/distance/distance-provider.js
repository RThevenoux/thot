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

  get(name) {
    return new Promise((resolve, reject) => {
      let distance = this.distances.find(distance => distance.name == name);
      if (!distance) {
        reject("Distance not found: " + name);
        return;
      }

      if (distance.singleton) {
        resolve(distance.singleton);
      } else {
        Promise.all([
          distance.factory.getFeatureSet(),
          distance.factory.getFeatureComparator()
        ])
          .then(([featureSet, featureComparator]) => {
            distance.singleton = {
              featureSet: featureSet,
              featureComparator: featureComparator
            };
            resolve(distance.singleton);
          })
          .catch(reject);
      }
    });

  }
}