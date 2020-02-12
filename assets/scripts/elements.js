'use strict';
import {defaultParent} from "./app.js";
import {eventDefines} from "./defines.js";
import Element from "./element.js";
import RectTransform from "./components/rect-transform.js";

export const elements = [];

export function addElement(name, parent){
    let rectComponent = new RectTransform("0.4 0.4", "0.6 0.6");

    let data = {
        name: name || getRandomName("rnd"),
        parent: parent || defaultParent,
        components: [rectComponent]
    };

    let element = new Element(data);
    elements.push(element);
    
    element.renderView();
    $(window).trigger(eventDefines.elementsAdded, element);
    $(window).trigger(eventDefines.elementsUpdated, elements);
    return element;
}

function getRandomName(prefix){
    return prefix + "-" + Date.now();
}