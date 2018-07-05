class GeneticRunFactory {
  constructor() {
    this.ipa = new Ipa();
    this.distanceProvider = new DistanceProvider();
  }

  /**
   * 
   * @param {String} distanceName 
   * @param {*} parameters 
   * @returns {Promise<GeneticRun>}
   */
  get(distanceName, parameters) {
    return Promise.all([
      this.distanceProvider.get(distanceName),
      this.ipa.getParser()])
      .then(([distance, ipaParser]) => {
        return new GeneticRun(distance.featureMapper, distance.featureSetComparator, ipaParser, parameters);
      });
  }

  /**
   * @returns {{"text":String,"value":String}[]} List of supported distances
   */
  getDistances() {
    return this.distanceProvider.distances
      .map(distance => { return { "text": distance.display, "value": distance.name } });
  }
}