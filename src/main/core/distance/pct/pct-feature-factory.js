class PctFeatureFactory {
  constructor() {
    this.featureSet = null;
    this.featureComparator = null;
  }

  getFeatureSet(callback) {
    if (this.featureSet) {
      callback(null, this.featureSet);
    } else {
      var that = this;
      JSONLoader.load("core/distance/pct/pct-feature-set.json",
        (err, data) => {
          if (err) {
            callback(err);
            return;
          }
          that.featureSet = new PctFeatureSet(data);
          callback(null, that.featureSet);
        });
    }
  }

  getFeatureComparator(callback) {
    if (this.featureComparator) {
      callback(null, this.featureComparator);
    } else {
      var that = this;
      JSONLoader.load("core/distance/pct/pct-feature-comparator.json",
        (err, data) => {
          if (err) {
            callback(err);
            return;
          }
          that.featureComparator = new PctFeatureComparator(data);
          callback(null, that.featureComparator);
        });
    }
  }
}