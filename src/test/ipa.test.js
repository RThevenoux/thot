window.onload = () => {

    let tests = [testNormalize, testParse];

    let result = "";
    for (let i = 0; i < tests.length; i++) {
        let test = tests[i];
        result += "<li>" + test() + "</li>";
    }

    var list = document.createElement('ul');
    list.className = 'list';
    list.innerHTML = result;

    document.getElementById('result').appendChild(list);
};

testNormalize = () => {
    let testCases = {
        "a": "a",
        "\u00E3": "a\u0303",// LATIN SMALL LETTER A WITH TILDE > a + tilde
        "abcdef": "abcdef",
        "g": '\u0261',
        "ʦ": "t\u0361s",
        "tˢ": "t\u0361s"
    }

    console.log("'IPA.normalize()' START")
    let errorCount = 0;
    let totalCount = 0;
    for (let key in testCases) {
        let expected = testCases[key];
        let result = IPA._normalize(key);
        if (result !== expected) {
            errorCount++;
            console.log("Error on '" + key + "'");
            console.log("   expected '" + expected + "', obtain '" + result + '"');
        }
        totalCount++;
    }
    console.log("'IPA.normalize()' FINISH error: " + errorCount + "/" + totalCount);
    if (errorCount == 0) {
        return "IPA.normalize() OK";
    } else {
        return "IPA.normalize() Error: " + errorCount + "/" + totalCount;
    }
};

testParse = () => {
    let testCases = [
        ["a", [['a', false]]],
        ["\u00E3", [['a', true]], "LATIN SMALL LETTER A WITH TILDE"],
        ["a\u0303", [['a', true]], " a + tilde"],
        ["ab", [['a', false], ['b', false]], " a + tilde"],
        ["a\u00E3a\u0303a", [['a', false], ['a', true], ['a', true], ['a', false]], " a + tilde"],
        ["ʦ", [['ts', false]]],
        ["kʲ",[['k',false],['j',false]]],
        ["kʷ",[['k',false],['w',false]]]
    ];

    let errorCount = 0;
    let totalCount = 0;

    console.log("'IPA.parsePhonemes()'")
    for (let i = 0; i < testCases.length; i++) {
        let testCase = testCases[i];

        let input = testCase[0];
        let expectedPhonemes = testCase[1];

        let phonemes = IPA.parsePhonemes(input);
        if (phonemes.length !== expectedPhonemes.length) {
            errorCount++;
            console.log("Error on test #" + i + " " + testCase[2]);
            console.log("   expected length: " + expectedPhonemes.length + ", obtain: " + phonemes.length);
        } else {
            let error = false;
            for (let j = 0; j < phonemes.length; j++) {
                let phoneme = phonemes[j];
                let expected = expectedPhonemes[j];
                if (phoneme.base !== expected[0]) {
                    error = true;
                    console.log("Error on test #" + i + " " + testCase[2]);
                    console.log("   expected base: " + expected[0] + ", obtain: " + phoneme.base);
                }
                if (!phoneme.nasal != !expected[1]) {
                    error = true;
                    console.log("Error on test #" + i + " " + testCase[2]);
                    console.log("   expected nasal: " + expected[1] + ", obtain: " + phoneme.nasal);
                }
            }
            if(error){
                errorCount++;
            }
        }
        totalCount++;
    }
    console.log("'IPA.parsePhonemes()' FINISH error: " + errorCount + "/" + totalCount);
    if (errorCount == 0) {
        return "IPA.parsePhonemes() OK";
    } else {
        return "IPA.parsePhonemes() Error: " + errorCount + "/" + totalCount;
    }
};

