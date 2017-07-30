class Util {
    static randomInArray(array) {
        let index = Math.floor(Math.random() * array.length);
        return array[index];
    }
}