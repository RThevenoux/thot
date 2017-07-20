class ParameterController {
    constructor() {
        let mutationRateNode = document.getElementById('mutation-rate');
        mutationRateNode.onchange = () => { geneticParameters.mutationRate = mutationRateNode.value };
        mutationRateNode.value = geneticParameters.mutationRate;
        
        let popSizeNode = document.getElementById('pop-size');
        popSizeNode.onchange = () => { geneticParameters.popSize = popSizeNode.value };
        popSizeNode.value = geneticParameters.popSize;
        
        let selectionBiasNode = document.getElementById('selection-bias');
        selectionBiasNode.onchange = () => { geneticParameters.sBias = selectionBiasNode.value };
        selectionBiasNode.value = geneticParameters.sBias;
        
        let parentPerChildNode = document.getElementById('parent-per-child');
        parentPerChildNode.onchange = () => { geneticParameters.parentPerChild = parentPerChildNode.value };
        parentPerChildNode.value = geneticParameters.parentPerChild;
        
        let elitesNode = document.getElementById('elites');
        elitesNode.onchange = () => { geneticParameters.elites = elitesNode.value };
        elitesNode.value = geneticParameters.elites;
    }
}