class PhenotypeBuilder {

    constructor() {
        this.ipa = "";
        this.display = "";
    }

    add(display, ipa) {
        this.addDisplay(display);
        this.addIpa(ipa);
    }

    addIpa(ipa) {
        this.ipa += ipa;
    }

    addDisplay(display) {
        this.display += display;
    }

    /**
     * @returns {Phenotype}
     */
    build() {
        return new Phenotype(this.display, this.ipa)
    }
}