class PocFeatureFactory {
  constructor() {
  }

  getFeatureSet(callback) {
    return JSONLoader.load("core/distance/poc/poc-feature-set.json")
      .then(data => new PocFeatureSet(data));
  }

  getFeatureComparator(callback) {
    return JSONLoader.load("core/distance/poc/poc-feature-comparator.json")
      .then(data => new PocFeatureComparator(data));
  }
}