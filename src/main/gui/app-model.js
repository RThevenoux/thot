class AppModel {
  constructor() {
    this.distanceProvider = new DistanceProvider();
    this.alphabetProvider = new AlphabetProvider();
    this.ipa = new Ipa();
    this.geneticRun = null;
  }

  /**
   * 
   * @param {String} ipaTarget
   * @param {String} alphabetName 
   * @param {String} distanceName 
   * @param {ParameterModel} parameters 
   * @param {*} listener 
   */
  start(ipaTarget, alphabetName, distanceName, parameters, listener) {
    this.stop();

    console.log("Load strategies... (target: " + ipaTarget + ", alphabet: " + alphabetName + ", distance: " + distanceName + ')');

    Promise.all([
      this.distanceProvider.get(distanceName),
      this.alphabetProvider.get(alphabetName),
      this.ipa.getParser()])
      .then(([distance, alphabet, ipaParser]) => {
        console.log("|     Mapper : " + distance.featureMapper.name);
        console.log("| Comparator : " + distance.featureSetComparator.name);
        console.log("|   Alphabet : " + alphabet.name);

        this.geneticRun = new GeneticRun(alphabet, distance.featureMapper, distance.featureSetComparator, ipaParser, parameters);
        this.geneticRun.start(ipaTarget, listener);
      })
      .catch(err => console.error(err));
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
}