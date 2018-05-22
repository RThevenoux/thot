class PocFeatureFactory {
  constructor() {
  }

  getFeatureMapper(callback) {
    return JSONLoader.load("core/distance/poc/poc-feature-mapping.json")
      .then(data => new PocFeatureMapper(data));
  }

  getFeatureSetComparator(callback) {
    var name = "Proof of Concept Comparator";
    return JSONLoader.load("core/distance/poc/poc-feature-weight.json")
      .then(weights => new FeatureSetComparator(weights, name));
  }
}