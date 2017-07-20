window.onload = () => {
    new AppController();
}

function addIPA(value) {
    let inputNode = document.getElementById('textBox');
    inputNode.value += value;
}