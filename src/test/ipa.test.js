window.onload = () => {
    let ipaResult = document.getElementById('ipa');
    let testCases = {
        "a": "a",
        "abcdef": "abcdef",
        "g": '\u0261',
        "kʲakʷa": "kjakwa"
    }

    let errorCount = 0;
    let totalCount = 0;
    for (let key in testCases) {
        let expected = testCases[key];
        let result = IPA.normalize(key);
        if (result !== expected) {
            errorCount++;
            console.log("Error on '" + key + "'");
            console.log("   expected '" + expected + "', obtain '" + result + '"');
        }
        totalCount++;
    }

    console.log("");
    console.log("FINISH 'IPA.normalize()' error: " + errorCount + "/" + totalCount);
    if (errorCount == 0) {
        ipaResult.textContent = "IPA.normalize() OK";
    } else {
        ipaResult.textContent = "IPA.normalize() Error: " + errorCount + "/" + totalCount;
    }
};

