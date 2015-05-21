
module.exports = function (context) {

    var fs = require("fs");
    var glob = context.requireCordovaModule('glob');

    context.opts.cordova.platforms.forEach(function (platform) {
        console.log("Processing " + platform);

        // Rimozione .suo files
        glob("platforms/" + platform + "/**/*.suo", function (err, tsFiles) {
            if (err) throw err;
            tsFiles.forEach(function (tsFile) {
                console.log("Deleting " + tsFile);
                fs.unlinkSync(tsFile);
            });

        });

        // Rimozione .map files javascript
        glob("platforms/" + platform + "/**/*.map", function (err, tsFiles) {
            if (err) throw err;
            tsFiles.forEach(function (tsFile) {
                console.log("Deleting " + tsFile);
                fs.unlinkSync(tsFile);
            });

        });

    });
}