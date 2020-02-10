'use strict';

import { 
    createElement,
    addTextComponent
} from "/assets/scripts/ui.js";

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
    createElement("root-first", 0, 1, 0, 1);
    createElement("some-label", .1, .9, 0, 1, "root-first");
    var tmp = createElement("root-text", 0, 1, .5, .6);
    addTextComponent(tmp, "Hello", 14);
})