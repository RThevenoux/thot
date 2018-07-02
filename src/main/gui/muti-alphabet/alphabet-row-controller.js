class AlphabetRowController {

    constructor() {

    }

    started(ipaTarget) {
        console.log("Start evolution. Target: " + ipaTarget);
    }

    stopped() {
        console.log("Evolution stopped");
    }

    newGeneration(population) {
        let best = population.getBest();
        console.log('generations #' + population.generation + " best:" + best.score + " | " + best.display);
    }

    finished(population) {
        let winner = population.getBest();
        console.log("WINNER : " + winner.display + " score:" + winner.score);
    }
}