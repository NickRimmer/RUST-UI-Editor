'use strict';
import { config } from "./previewScreen.js";

export function pointsToPixels(anchorMin, anchorMax){
    let mins = anchorMin.split(" ");
    let maxs = anchorMax.split(" ");
        
    let xMin = mins[0] * 1.0;
    let xMax = maxs[0] * 1.0;
    let yMin = mins[1] * 1.0;
    let yMax = maxs[1] * 1.0;

    let x = config.width * 1.0;
    let y = config.height * 1.0;

    var left = Math.round(x * xMin);
    var bottom = Math.round(y * yMin);
    var width = Math.round(x * xMax - left);
    var height = Math.round(y * yMax - bottom);

    return { left, bottom, width, height };
}

export function pixelsToPoints(left, bottom, width, height){
    let x = config.width * 1.0;
    let y = config.height * 1.0;

    left = left * 1.0;
    bottom = bottom * 1.0;
    width = width * 1.0;
    height = height * 1.0;

    console.log({x,y});
    console.log({left,bottom});

    let xMin = round(left / x);
    let yMin = round(bottom / y);
    let xMax = round((left + width) / x);
    let yMax = round((bottom + height) / y);

    var result = { xMin, yMin, xMax, yMax };
    console.log(result);

    return result;
}

function round(value){
    return Math.round(value * 1000) / 1000;
}