'use strict';

import { RectTransformComponent } from "./components/rectTransform.js";
import { TextComponent } from "./components/text.js";
import { SolidComponent } from "./components/solid.js";
import { uiElements } from "./app.js";

export const componentType = {
    rectTransform: "RectTransform",
    button: "UnityEngine.UI.Button",
    text: "UnityEngine.UI.Text",
    solidColor: "UnityEngine.UI.Image",
    image: "UnityEngine.UI.RawImage"
};

export function getHandler(component){
    switch (component.type) {
        case componentType.text: return new TextComponent(component);
        case componentType.rectTransform: return new RectTransformComponent(component);
        case componentType.solidColor: return new SolidComponent(component);

        default: return new BaseComponent(component);
    }
}

export function renderComponentProperties(component) {
    return getHandler(component).renderProperties();
}

export function renderComponentViews(){
    $("#game-screen").html("");
    uiElements.forEach(el => el.components.forEach(comp => getHandler(comp).renderView(el)));
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