class ParametersController {
    /**
     * 
     * @param {HTMLElement} element 
     */
    constructor(element) {
        this.model = new ParameterModel();

        element.innerHTML =
            `<div class="parameter">
    <p>mutation rate</p>
    <input type="number" id="mutation-rate" />
</div>
<div class="parameter">
    <p>parents per child</p>
    <input type="number" id="parent-per-child" />
</div>
<div class="parameter">
    <p>population size</p>
    <input type="number" id="pop-size" />
</div>
<div class="parameter">
    <p>selection bias</p>
    <input type="number" id="selection-bias" />
</div>
<div class="parameter">
    <p>elites</p>
    <input type="number" id="elites" />
</div>`;

        var that = this;
        let mutationRateNode = element.querySelector('#mutation-rate');
        mutationRateNode.onchange = () => { that.model.mutationRate = mutationRateNode.value };
        mutationRateNode.value = this.model.mutationRate;

        let popSizeNode = element.querySelector('#pop-size');
        popSizeNode.onchange = () => { that.model.popSize = popSizeNode.value };
        popSizeNode.value = this.model.popSize;

        let selectionBiasNode = element.querySelector('#selection-bias');
        selectionBiasNode.onchange = () => { that.model.sBias = selectionBiasNode.value };
        selectionBiasNode.value = this.model.sBias;

        let parentPerChildNode = element.querySelector('#parent-per-child');
        parentPerChildNode.onchange = () => { that.model.parentPerChild = parentPerChildNode.value };
        parentPerChildNode.value = this.model.parentPerChild;

        let elitesNode = element.querySelector('#elites');
        elitesNode.onchange = () => { that.model.elites = elitesNode.value };
        elitesNode.value = this.model.elites;
    }
}