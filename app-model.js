class AppModel {
  constructor() {
    this.featureFactory = new PctFeatureFactory();
    //this.featureFactory = new PocFeatureFactory();
    this.alphabetFactory = new KatakanaFactory();
    this.geneticRun = null;
  }

  start(ipaTarget, listener) {
    console.log("Load strategies... (target:"+ipaTarget+')');

    this.loadStrategies((err, items) => {
      console.log("| Feature Set : " + items.featureSet.name);
      console.log("|  Comparator : " + items.featureComparator.name);
      console.log("|     Alpabet : " + items.alphabet.name);

      if(this.geneticRun){
        this.geneticRun.stop();
      }
      this.geneticRun = new GeneticRun(ipaTarget, items.alphabet, items.featureSet, items.featureComparator);
      this.geneticRun.start(listener);
    });
  }

  loadStrategies(callback) {
    this.featureFactory.getFeatureSet((err, featureSet) => {
      if (err) {
        callback(err);
        return;
      }
     
      this.featureFactory.getFeatureComparator((err, featureComparator) => {
        if (err) {
          callback(err);
          return;
        }
        
        this.alphabetFactory.getInstance((err, alphabet) => {
          if (err) {
            callback(err);
            return;
          }
          
          callback(null, {
            featureSet: featureSet,
            featureComparator: featureComparator,
            alphabet: alphabet
          });
        });
      });
    });
  }
}