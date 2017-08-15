class ParameterModel {
    constructor() {
        this.mutationRate = 0.5;
        this.parentPerChild = 4;
        this.sBias = 0.8;
        this.popSize = 30;
        this.elites = 2; //should be less than popSize. Else unmanaged error.
        this.maxGeneration = 1000;
    }
}