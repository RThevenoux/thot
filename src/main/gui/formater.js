class Formater {
    constructor() {

    }

    toPercent(number) {
        return Math.floor(number * 100) + " %"
    }

    toIPA(ipa) {
        return "/" + ipa + "/";
    }
}