class PctFeatureFactory {
  constructor() {
  }

  getFeatureMapper(callback) {
    return JSONLoader.load("core/distance/pct/pct-feature-mapping.json")
      .then(data => new PctFeatureMapper(data));
  }

  getFeatureSetComparator(callback) {
    var name = "Equal weights on PCT feature";
    return JSONLoader.load("core/distance/pct/pct-feature-weight.json")
      .then(weights => new FeatureSetComparator(weights, name));
  }
}