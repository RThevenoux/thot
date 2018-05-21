class PocFeatureFactory {
  constructor() {
  }

  getFeatureMapper(callback) {
    return JSONLoader.load("core/distance/poc/poc-feature-mapping.json")
      .then(data => new PocFeatureMapper(data));
  }

  getFeatureComparator(callback) {
    var name = "Proof of Concept Comparator";
    return JSONLoader.load("core/distance/poc/poc-feature-comparator.json")
      .then(data => new FeatureComparator(data, name));
  }
}