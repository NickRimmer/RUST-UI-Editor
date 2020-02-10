'use strict';

import { uiElements } from "./app.js";
import { BaseComponent } from "./components/base.js";
import { RectTransformComponent } from "./components/rectTransform.js";
import { TextComponent } from "./components/text.js";

export let defaultParent = "Hud";
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

        default: return new BaseComponent(component).renderProperties();
    }
}

export function isParentCorrect(name) {
    var result = false;
    uiElements.forEach(e => {
        if (e.name === name) result = true;
    });

    if (name === defaultParent) result = true;

    return result;
}

export function updateElement(el, name, parent) {
    uiElements
        .filter(e => e.parent == el.name)
        .forEach(e => e.parent = name);

    el.name = name;
    el.parent = parent;
}

function addElement(el) {
    uiElements.push(el);
}

export function createElement(xMin, xMax, yMin, yMax, name, parent, component) {
    let result = {
        name: name || "random-" + Math.round(Math.random() * 1000000000),
        parent: parent || defaultParent,
        components: []
    }

    // add base component
    addTransformComponent(result, xMin, xMax, yMin, yMax);

    if (component) {
        result.components.push(component);
    }

    addElement(result);
    return result;
}

export function removeElement(el) {
    for (var i = uiElements.length; i--;)
        if (uiElements[i] === el){
            uiElements.filter(x=>x.parent == el.name).forEach(removeElement);
            uiElements.splice(i, 1);
        }

    console.log(uiElements);
}

export function addTransformComponent(el, xMin, xMax, yMin, yMax){
    let component = {
        type: "RectTransform",
        anchormin: xMin + " " + yMin,
        anchormax: xMax + " " + yMax
    };

    el.components.push(component);
    return component;
}

export function addTextComponent(el, text, size, align, color) {
    let component = {
        type: "UnityEngine.UI.Text",
        text: text || "Example text",
        color: color || "1 1 1 1",
        fontSize: size || 14,
        align: align || "MiddleCenter"
    };

    el.components.push(component);
    return component;
}