function addIPA(value) {
    let inputNode = document.getElementById('textBox');
    inputNode.value += value;
}

class KeyboardController {

    /**
     * 
     * @param {HTMLElement} element 
     */
    constructor(element) {
        let data = {
            "Voyelle": [
                'i',
                'y',
                'u',
                'e',
                'ø',
                'o',
                'ə',
                'ɛ',
                'ɛ̃',
                'œ',
                'œ̃',
                'ɔ',
                'ɔ̃',
                'a',
                'ɑ',
                'ɑ̃'
            ],
            "Semi": [
                'ɥ',
                'w',
                'j'
            ],
            "Consonne": [
                'p',
                'b',
                't',
                'd',
                'k',
                'g',
                'm',
                'n',
                'ɲ',
                'ŋ',
                'f',
                'v',
                's',
                'z',
                'ʃ',
                'ʒ',
                'ʁ',
                'l'
            ]
        };

        Object.keys(data).forEach(label => {
            let p = document.createElement("p");
            p.textContent = label;
            element.appendChild(p);

            let div = document.createElement("div");
            let keys = data[label];
            for (let i = 0; i < keys.length; i++) {
                let key = keys[i];
                let button = document.createElement("button");
                button.textContent = key;
                button.onclick = () => addIPA(key);
                div.appendChild(button);
            }
            element.appendChild(div);
        });
    }
}
