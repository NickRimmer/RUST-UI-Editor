'use strict';

/*
import {defaultParent} from "./app.js";
import {eventDefines} from "./defines.js";
*/

import Element from "./element.js";
import { events } from "./defines.js";
import RectTransform from "./components/rect-transform.js";

export let elements = [];

export function addElementWithRect(name, parentId) {
    let element = new Element(name, parentId);
    let rect = new RectTransform();
    element.addComponent(rect);
    elements.push(element);

    return element;
}

export function removeElement(id) {
    let element = elements.find(x => x.id === id);
    if (!element) {
        console.warn("Element wasn't removed, cause not found");
        return;
    }

    removeElementInner(element);
    $(window).trigger(events.elementsUpdated);
}

function removeElementInner(element) {
    let children = elements.filter(x => x.parentId == element.id);
    children.forEach(child => removeElementInner(child));

    elements = elements.filter(x => x.id !== element.id);
}

export function getElement(id) {
    let element = elements.find(x => x.id === id);
    if (!element) {
        console.warn(`Element with id '${id}' not found`);
        return null;
    }

    return element;
}