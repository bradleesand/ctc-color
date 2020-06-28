// ==UserScript==
// @name         Color Accessibile Cracking The Cryptic
// @homepage     https://github.com/bradleesand/ctc-color
// @version      0.1
// @description  Overide the colors on Cracking The Cryptic with a more accessible palatte
// @author       Erik Sandberg <bradleesand@gmail.com>
// @match        https://cracking-the-cryptic.web.app/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // https://davidmathlogic.com/colorblind/#%23000000-%23E69F00-%2356B4E9-%23009E73-%23F0E442-%230072B2-%23D55E00-%23CC79A7
    const wongColors = [
        "rgb(0, 0, 0)",
        "rgb(207, 207, 207)",
        "rgb(255, 255, 255)",
        "#009E73",
        "#CC79A7",
        "#E69F00",
        "#D55E00", // Maybe #BB5505 would be better?
        "#F0E442",
        "#56B4E9"
    ]


    function overrideColors(newColors) {
        const styleId = 'cb-colors'
        let styleTag = document.getElementById(styleId)
        if (!styleTag) {
            styleTag = document.createElement('style')
            styleTag.id = styleId;
            styleTag.type = 'text/css';

            const head = document.head || document.getElementsByTagName('head')[0];

            head.appendChild(styleTag);
        }

        const oldColors = [
            "0, 0, 0",
            "207, 207, 207",
            "255, 255, 255",
            "163, 224, 72",
            "210, 59, 231",
            "235, 117, 50",
            "230, 38, 31",
            "247, 208, 56",
            "52, 187, 230"
        ]

        let css = ""
        let ndx = 0;
        while (ndx < oldColors.length) {
            let oldColor = oldColors[ndx],
                newColor = newColors[ndx];
            css += ("[style*='background-color: rgba(" + oldColor + ", 0.5)'] { background-color: " + newColor + " !important; }");
            css += ("[style*='background-color: rgb(" + oldColor + ")'] { background-color: " + newColor + " !important; }");
            ndx += 1;
        }

        if (styleTag.styleSheet){
            // This is required for IE8 and below.
            styleTag.styleSheet.cssText = css;
        } else {
            let child;
            while (child = styleTag.firstChild) {
                child.remove();
            }
            styleTag.appendChild(document.createTextNode(css));
        }
    }

    overrideColors(wongColors);
})();
