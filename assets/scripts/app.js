'use strict';

import { createElement, defaultParent } from "/assets/scripts/ui-elements.js";
import { addTextComponent, addSolidComponent, renderComponentViews } from "/assets/scripts/ui-components.js";
import { updateMenu } from "./sidebar.js";

export let uiElements = [];
export let jsonSpacer = "    ";

var askBeforeUnload = false;

$(function () {
    window.onbeforeunload = function () {
        if (askBeforeUnload) return "Changes you made may not be saved!";
        return null;
    }

    $(".draggable").draggable({ handle: ".draggable-handle", containment: "parent" });

    //TODO remove it
    //createElement("root-first", defaultParent, 0, 1, 0, 1);
    //createElement("some-label", "root-first", .1, .9, 0, 1);
    //var tmp = createElement("root-text", defaultParent, 0, 1, .5, .6);
    //addTextComponent(tmp, "Hello", 14);
    
    var tmp = createElement("root-solid", defaultParent, .4, .6, .4, .6);
    addSolidComponent(tmp, "1 1 1 0.5");
    
    updateElements();
})

export function updateElements(){
    updateMenu();
    renderComponentViews();
}