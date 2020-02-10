'use strict';

import { uiElements } from "./app.js";
import { addTransformComponent } from "./ui-components.js";

export let defaultParent = "Hud";

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

export function createElement(name, xMin, xMax, yMin, yMax, parent, component) {
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

    uiElements.push(result);
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