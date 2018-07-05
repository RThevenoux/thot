class ErrorRowController {
    constructor(error) {
        this.element = document.createElement("div");
        this.element.textContent = "/!\\ Error : " + error.alphabetName + " / " + error.error;
    }

    getElement() {
        return this.element;
    }
}