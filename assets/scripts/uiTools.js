'use strict';

import { BaseComponent } from "./components/base.js";
import { RectTransformComponent } from "./components/rectTransform.js";

export let DefaultParent = "Hud";
export const ComponentType = {
    rectTransform: "RectTransform",
    button: "UnityEngine.UI.Button",
    text: "UnityEngine.UI.Text",
    solidColor: "UnityEngine.UI.Image",
    image: "UnityEngine.UI.RawImage"
};

export function GetBasic(xMin, xMax, yMin, yMax, name, parent) {
    let result = {
        name: name || "random-" + Math.round(Math.random()*1000000000),
        parent: parent || DefaultParent,
        components: [GetTransform(xMin, xMax, yMin, yMax)]
    }

    return result;
}

export function GetTransform(xMin, xMax, yMin, yMax) {
    let result = {
        type: "RectTransform",
        anchormin: xMin + " " + yMin,
        anchormax: xMax + " " + yMax
    };

    return result;
}

export function RenderComponentConfiguration(component){
    switch(component.type){
        case ComponentType.button: return new BaseComponent(component).renderConfiguration();
        case ComponentType.rectTransform: return new RectTransformComponent(component).renderConfiguration();
        
        default: return new BaseComponent(component).renderConfiguration();
    }
}