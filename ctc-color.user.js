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
    const wongColors = {
        red: "#D55E00", // Maybe #BB5505 would be better?
        orange: "#E69F00",
        yellow: "#F0E442",
        green: "#009E73",
        blue: "#56B4E9",
        purple: "#CC79A7",
    };


    function overrideColors(newColors) {
        const styleId = 'cb-colors'
        let styleTag = document.getElementById(styleId)
        console.debug(styleTag)
        if (!styleTag) {
            styleTag = document.createElement('style')
            styleTag.id = styleId;
            styleTag.type = 'text/css';

            const head = document.head || document.getElementsByTagName('head')[0];

            head.appendChild(styleTag);
        }

        const colors = ["red", "orange", "yellow", "green", "blue", "purple"]
        const oldColors = {
            red: "230, 38, 31",
            orange: "235, 117, 50",
            yellow: "247, 208, 56",
            green: "163, 224, 72",
            blue: "52, 187, 230",
            purple: "210, 59, 231",

        }

        function cssLine(oldColor, newColor, transparent) {
            return "[style*='background-color: rgb" + (transparent ? "a" : "") + "(" + oldColor + (transparent ? ", 0.5" : "") + ")'] { background-color: " + newColor + " !important; }";
        }

        let css = ""
        let ndx = 0;
        while (ndx < colors.length) {
            css += ("[style*='background-color: rgba(" + oldColors[colors[ndx]] + ", 0.5)'] { background-color: " + newColors[colors[ndx]] + " !important; }");
            css += ("[style*='background-color: rgb(" + oldColors[colors[ndx]] + ")'] { background-color: " + newColors[colors[ndx]] + " !important; }");
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
