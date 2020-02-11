'use strict';
import { config } from "./previewScreen.js";

export function pointsToPixels(anchorMin, anchorMax){
    let mins = anchorMin.split(" ");
    let maxs = anchorMax.split(" ");
        
    let xMin = mins[0];
    let xMax = maxs[0];
    let yMin = mins[1];
    let yMax = maxs[1];

    let x = config.width;
    let y = config.height;

    var left = x * xMin;
    var bottom = y * yMin;
    var width = x * xMax - left;
    var height = y * yMax - bottom;

    return { left, bottom, width, height };
}