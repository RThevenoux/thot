var fs = require('fs');
var csv = require('csv');

var build = function () {

    let fileName = 'pct-feature-mapping';
    let path = '/core/ipa-distance/pct';

    let inputPath = 'src/main' + path + '/' + fileName + '.csv';
    let outputPath = 'dist' + path + '/' + fileName + '.json';

    fs.readFile(inputPath, 'utf8', function (err, fileData) {
        if (err) throw err;

        let options = { 'columns': true };
        csv.parse(fileData, options, function (err2, csvData) {
            if (err2) throw err2;

            let result = {};
            for (let i = 0; i < csvData.length; i++) {
                let symbolData = csvData[i];
                let symbol = symbolData.symbol;
                symbolData.symbol = undefined;
                result[symbol] = symbolData;
            }

            let space = 2;
            fs.writeFile(outputPath, JSON.stringify(result, null, space));
        });
    });
}

module.exports.build = build;