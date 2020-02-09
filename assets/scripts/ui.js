'use strict';

import { uiElements } from "./app.js";
import { BaseComponent } from "./components/base.js";
import { RectTransformComponent } from "./components/rectTransform.js";

export let defaultParent = "Hud";
export const componentType = {
    rectTransform: "RectTransform",
    button: "UnityEngine.UI.Button",
    text: "UnityEngine.UI.Text",
    solidColor: "UnityEngine.UI.Image",
    image: "UnityEngine.UI.RawImage"
};

export function renderComponentProperties(component){
    switch(component.type){
        case componentType.button: return new BaseComponent(component).renderProperties();
        case componentType.rectTransform: return new RectTransformComponent(component).renderProperties();
        
        default: return new BaseComponent(component).renderProperties();
    }
}

export function isParentCorrect(name){
    var result = false;
    uiElements.forEach(e=>{
        if(e.name === name) result = true;
    });

    if(name === defaultParent) result = true;

    return result;
}

export function updateElement(el, name, parent){
    uiElements
        .filter(e => e.parent == el.name)
        .forEach(e => e.parent = name);

    el.name = name;
    el.parent = parent;
}

export function createElement(xMin, xMax, yMin, yMax, name, parent) {
    let result = {
        name: name || "random-" + Math.round(Math.random()*1000000000),
        parent: parent || defaultParent,
        components: [createTransform(xMin, xMax, yMin, yMax)]
    }

    return result;
}

export function createTransform(xMin, xMax, yMin, yMax) {
    let result = {
        type: "RectTransform",
        anchormin: xMin + " " + yMin,
        anchormax: xMax + " " + yMax
    };

    return result;
}