'use strict';

export function anchorsToPoints(aMin, aMax) {
    let min = aMin.split(" ");
    let max = aMax.split(" ");

    let result = {
        xMin: min[0] * 1.0,
        xMax: max[0] * 1.0,
        yMin: min[1] * 1.0,
        yMax: max[1] * 1.0
    }

    return result;
}

export function pointsToPixels(anchorMin, anchorMax, parent) {
    let mins = anchorMin.split(" ");
    let maxs = anchorMax.split(" ");

    let xMin = mins[0] * 1.0;
    let xMax = maxs[0] * 1.0;
    let yMin = mins[1] * 1.0;
    let yMax = maxs[1] * 1.0;

    let x = parent.width() * 1.0;
    let y = parent.height() * 1.0;

    var left = Math.round(x * xMin);
    var bottom = Math.round(y * yMin);
    var width = Math.round(x * xMax - left);
    var height = Math.round(y * yMax - bottom);

    return { left, bottom, width, height };
}

export function pixelsToPoints(left, bottom, width, height, parent) {
    let x = parent.width() * 1.0;
    let y = parent.height() * 1.0;

    left = left * 1.0;
    bottom = bottom * 1.0;
    width = width * 1.0;
    height = height * 1.0;

    let xMin = roundPoints(left / x);
    let yMin = roundPoints(bottom / y);
    let xMax = roundPoints((left + width) / x);
    let yMax = roundPoints((bottom + height) / y);

    var result = { xMin, yMin, xMax, yMax };

    return result;
}

export function uColorToHex(color) {
    let parts = color.split(" ");
    let result = "#";
    parts.forEach(part => {
        let dec = Math.round(part * 255);
        let hex = dec.toString(16);
        if (hex.length === 1) hex = "0" + hex;

        result = result + hex;
    });

    return result;
}

export function hexToUColor(color) {
    if (color.startsWith("#")) color = color.substr(1);
    if (color.length == 6) color = color + "ff";

    let r = parseInt("0x" + color.substr(0, 2)) / 255.0;
    let g = parseInt("0x" + color.substr(2, 2)) / 255.0;
    let b = parseInt("0x" + color.substr(4, 2)) / 255.0;
    let a = parseInt("0x" + color.substr(6, 2)) / 255.0;

    r = Math.round(r * 1000) / 1000;
    g = Math.round(g * 1000) / 1000;
    b = Math.round(b * 1000) / 1000;
    a = Math.round(a * 1000) / 1000;

    return `${r} ${g} ${b} ${a}`;
}

export function deepClone(obj) {
    if (!obj) return obj;
    if (!(obj instanceof Object)) return obj;

    let result = Object.assign(Object.create(obj), obj);
    for (let prop in obj)
        result[prop] = deepClone(obj[prop]);

    return result;
}

function roundPoints(value) {
    return Math.round(value * 1000) / 1000;
    return value;
}

export function setupPicker(html, onSave) {
    let color = html.val();
    let picker = Pickr.create({
        el: $(html)[0],
        theme: 'monolith',
        default: color,
        components: {
            preview: true,
            opacity: true,
            hue: true,

            interaction: {
                input: true,
                //hex: true,
                //rgba: true,
                save: true,
                //cancel: true
            }
        },
        strings: {
            cancel: "Reset"
        }
    });

    picker.on("save", (color, instance) => {
        picker.hide();
        onSave(color)
    });
}