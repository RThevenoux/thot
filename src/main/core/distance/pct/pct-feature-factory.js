class PctFeatureFactory {
  constructor() {
  }

  getFeatureSet(callback) {
    return JSONLoader.load("core/distance/pct/pct-feature-set.json")
      .then(data => new PctFeatureSet(data));
  }

  getFeatureComparator(callback) {
    return JSONLoader.load("core/distance/pct/pct-feature-comparator.json")
      .then(data => new PctFeatureComparator(data));
  }
}