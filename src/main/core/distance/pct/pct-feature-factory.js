class PctFeatureFactory {
  constructor() {
  }

  getFeatureMapper(callback) {
    return JSONLoader.load("core/distance/pct/pct-feature-mapping.json")
      .then(data => new PctFeatureMapper(data));
  }

  getFeatureComparator(callback) {
    var name = "Equal weights on PCT feature";
    return JSONLoader.load("core/distance/pct/pct-feature-comparator.json")
      .then(data => new FeatureComparator(data, name));
  }
}