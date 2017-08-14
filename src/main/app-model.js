class AppModel {
  constructor() {
    this.distanceProvider = new DistanceProvider();
    this.alphabetProvider = new AlphabetProvider();
    this.geneticRun = null;
  }

  /**
   * 
   * @param {String} ipaTarget
   * @param {String} alphabet 
   * @param {String} distance 
   * @param {ParameterModel} parameters 
   * @param {*} listener 
   */
  start(ipaTarget, alphabet, distance, parameters, listener) {
    console.log("Load strategies... (target: " + ipaTarget + ", alphabet: " + alphabet + ", distance: " + distance + ')');

    this.loadStrategies(alphabet, distance, (err, items) => {
      console.log("| Feature Set : " + items.featureSet.name);
      console.log("|  Comparator : " + items.featureComparator.name);
      console.log("|    Alphabet : " + items.alphabet.name);

      this.stop();
      this.geneticRun = new GeneticRun(ipaTarget, items.alphabet, items.featureSet, items.featureComparator, parameters);
      this.geneticRun.start(listener);
    });
  }

  stop() {
    if (this.geneticRun) {
      console.log("Stop genetic run");
      this.geneticRun.stop();
    }
  }

  getAlphabets() {
    return this.alphabetProvider.alphabets
      .map(alphabet => { return { "text": alphabet.display, "value": alphabet.name } });
  }

  getDistances() {
    return this.distanceProvider.distances
      .map(distance => { return { "text": distance.display, "value": distance.name } });
  }

  loadStrategies(alphabet, distance, callback) {
    this.distanceProvider.get(distance, (err, distance) => {
      if (err) {
        callback(err);
        return;
      }

      this.alphabetProvider.get(alphabet, (err, alphabet) => {
        if (err) {
          callback(err);
          return;
        }

        callback(null, {
          featureSet: distance.featureSet,
          featureComparator: distance.featureComparator,
          alphabet: alphabet
        });
      });
    });
  }
}