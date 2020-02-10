'use strict';

import { RectTransformComponent } from "./components/rectTransform.js";
import { TextComponent } from "./components/text.js";
import { SolidComponent } from "./components/solid.js";

export const componentType = {
    rectTransform: "RectTransform",
    button: "UnityEngine.UI.Button",
    text: "UnityEngine.UI.Text",
    solidColor: "UnityEngine.UI.Image",
    image: "UnityEngine.UI.RawImage"
};

export function renderComponentProperties(component) {
    switch (component.type) {
        case componentType.text: return new TextComponent(component).renderProperties();
        case componentType.rectTransform: return new RectTransformComponent(component).renderProperties();
        case componentType.solidColor: return new SolidComponent(component).renderProperties();

        default: return new BaseComponent(component).renderProperties();
    }
}

export function addTransformComponent(el, xMin, xMax, yMin, yMax){
    let component = {
        type: componentType.rectTransform,
        anchormin: (xMin||0) + " " + (yMin||0),
        anchormax: (xMax||1) + " " + (yMax||1)
    };

    if(el) el.components.push(component);
    return component;
}

export function addTextComponent(el, text, size, align, color) {
    let component = {
        type: componentType.text,
        text: text || "Example text",
        color: color || "1 1 1 1",
        fontSize: size || 14,
        align: align || "MiddleCenter"
    };

    if(el) el.components.push(component);
    return component;
}


export function addSolidComponent(el, color) {
    let component = {
        type: componentType.solidColor,
        color: color || "1 1 1 1",
    };

    if(el) el.components.push(component);
    return component;
}