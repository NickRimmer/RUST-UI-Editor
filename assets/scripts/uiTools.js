'use strict';

export let DefaultParent = "Hud";
export function GetBasic(xMin, xMax, yMin, yMax, name, parent) {
    let result = {
        name: name || "random-" + Math.round(Math.random()*1000000000),
        parent: parent || DefaultParent,
        components: [GetTransform(xMin, xMax, yMin, yMax)]
    }

    return result;
}

export function GetTransform(xMin, xMax, yMin, yMax) {
    let result = {
        type: "RectTransform",
        anchormin: xMin + " " + yMin,
        anchormax: xMax + " " + yMax
    };

    return result;
}