﻿#!/usr/bin/env node

var fs = require('fs');
var plist = 'platforms/ios/MibApp/MibApp-Info.plist';

var iphoneModes = [
    "UIInterfaceOrientationPortrait",
    "UIInterfaceOrientationLandscapeLeft",
    "UIInterfaceOrientationLandscapeRight"
];

var ipadModes = [
    "UIInterfaceOrientationPortrait",
    "UIInterfaceOrientationLandscapeLeft",
    "UIInterfaceOrientationLandscapeRight"
];

function getOrientationModeStr(modes) {
    var s = "<key>$1</key>\n\t<array>\n\t";
    modes.forEach(function(mode, index) {
        s += "\t<string>"+mode+"</string>\n\t";
    });
    return s;
}

if (fs.existsSync(plist)) {
    var p = fs.readFileSync(plist, 'utf8');
    // replace iphone modes
    p = p.replace(
        /<key>(UISupportedInterfaceOrientations)<\/key>[\r\n ]*<array>[\s\S]*?(?=<\/array>)/ig,
        getOrientationModeStr(iphoneModes)
    );
    // replace ipad modes
    p = p.replace(
        /<key>(UISupportedInterfaceOrientations~ipad)<\/key>[\r\n ]*<array>[\s\S]*?(?=<\/array>)/ig,
        getOrientationModeStr(ipadModes)
    );
    fs.writeFileSync(plist, p, "utf8");
}