class PocFeatureFactory {
  constructor() {
    this.featureSet = null;
    this.featureComparator = null;
  }

  getFeatureSet(callback) {
    if (this.featureSet) {
      callback(null, this.featureSet);
    } else {
      var that = this;
      JSONLoader.load("core/distance/poc/poc-feature-set.json",
        (err, data) => {
          if (err) {
            callback(err);
            return;
          }
          that.featureSet = new PocFeatureSet(data);
          callback(null, that.featureSet);
        });
    }
  }

  getFeatureComparator(callback) {
    if (this.featureComparator) {
      callback(null, this.featureComparator);
    } else {
      var that = this;
      JSONLoader.load("core/distance/poc/poc-feature-comparator.json",
        (err, data) => {
          if (err) {
            callback(err);
            return;
          }
          that.featureComparator = new PocFeatureComparator(data);
          callback(null, that.featureComparator);
        });
    }
  }
}