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
    createElement(0, 1, 0, 1, "root-first");
    createElement(.1, .9, 0, 1, "some-label", "root-first");
    var tmp = createElement(0, 1, .5, .6, "root-second");
    addTextComponent(tmp, "Hello", 14);
})