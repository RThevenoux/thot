window.onload = () => {
    let parameter = new ParameterController();
    new AppController(parameter.model);
    
}

function addIPA(value) {
    let inputNode = document.getElementById('textBox');
    inputNode.value += value;
}