class PctFeatureComparator extends AbstractFeatureComparator {
    constructor(descriptors) {
        super();
        this.descriptors = descriptors;
        this.name = "Equal weights on PCT feature";
    }
}