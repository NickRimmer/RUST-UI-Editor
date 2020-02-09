'use strict';
import { GetBasic } from "/assets/scripts/uiTools.js";

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
    uiElements.push(GetBasic(0, 1, 0, 1, "root-first"));
    uiElements.push(GetBasic(.1, .9, 0, 1, "some-label", "root-first"));
    uiElements.push(GetBasic(0, 1, .5, .6, "root-second"));
})