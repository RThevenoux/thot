class ParameterController {
    constructor() {
        this.model = new ParameterModel();
        console.log("ParameterController.constructor()");

        var that = this;
        let mutationRateNode = document.getElementById('mutation-rate');
        mutationRateNode.onchange = () => { that.model.mutationRate = mutationRateNode.value };
        mutationRateNode.value = this.model.mutationRate;
        
        let popSizeNode = document.getElementById('pop-size');
        popSizeNode.onchange = () => { that.model.popSize = popSizeNode.value };
        popSizeNode.value = this.model.popSize;
        
        let selectionBiasNode = document.getElementById('selection-bias');
        selectionBiasNode.onchange = () => { that.model.sBias = selectionBiasNode.value };
        selectionBiasNode.value = this.model.sBias;
        
        let parentPerChildNode = document.getElementById('parent-per-child');
        parentPerChildNode.onchange = () => { that.model.parentPerChild = parentPerChildNode.value };
        parentPerChildNode.value = this.model.parentPerChild;
        
        let elitesNode = document.getElementById('elites');
        elitesNode.onchange = () => { that.model.elites = elitesNode.value };
        elitesNode.value = this.model.elites;
    }
}