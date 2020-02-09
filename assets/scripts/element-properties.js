'use strict';
import { updateMenu } from '/assets/scripts/sidebar.js';
import { 
    defaultParent, 
    renderComponentProperties, 
    isParentCorrect,
    updateElement, 
    removeElement,
    createElement } from '/assets/scripts/ui.js';

let dialog;
let el;
let componentsArea;

$(function () {
    dialog = $("#element-properties");
    componentsArea = $("#edit-ui-components", dialog);

    dialog.on("submit", save);
    $("#btn-reset-parent", dialog).on("click", resetParent);
    $("#element-properties-close").on("click", hideProperties);
    $("#element-properties-remove").on("click", remove);
    applyChangesListener(dialog);
    $("#ui-element-parent", dialog).on("change focus", () => $("#ui-element-parent", dialog).removeClass("is-invalid"));
})

export function showProperties(elData) {
    dialog.removeClass("d-none");
    el = elData
    setupFields();
    renderComponents();
    
    fixChanges();
}

export function hideProperties() {
    dialog.addClass("d-none");
}

function resetParent() {
    $("#ui-element-parent", dialog).val(defaultParent);
    $("#ui-element-parent", dialog).removeClass("is-invalid");
    testChanges();
}

function setupFields() {
    $("#ui-element-name", dialog).val(el.name);
    $("#ui-element-parent", dialog).val(el.parent);
}

function renderComponents() {
    componentsArea.html("");
    el.components.forEach(component => {
        var html = renderComponentProperties(component);
        componentsArea.append(html);
    });

    applyChangesListener(componentsArea);
}

function applyChangesListener(parent){
    $("input", parent).on("change keyup click blur", testChanges);
}

function save() {
    var parentName = $("#ui-element-parent", dialog).val();
    if (!isParentCorrect(parentName)) {
        $("#ui-element-parent", dialog).addClass("is-invalid");
        return false;
    }

    updateElement(el, $("#ui-element-name", dialog).val(), parentName);

    componentsArea.children().each((i, component) => {
        var handler = $(component).data("handler");
        if (!handler) {
            console.warn("handler for component wasn't found )=");
            return false;
        }

        handler.save();
    });

    //fixChanges();
    hideProperties();
    updateMenu();

    // to avoid form submit
    return false;
}

function remove(){
    //TODO add confirmation
    removeElement(el);
    updateMenu();
    hideProperties();
}

function fixChanges(){
    $("input", dialog).each((i,e) => $(e).data("initial-value", $(e).val()));

    // to reset
    testChanges();
}

function testChanges(){
    $("#element-properties-save", dialog).prop("disabled", true);
    $("input", dialog).each((i,e) => {
        if($(e).val() !== $(e).data("initial-value"))
            $("#element-properties-save", dialog).prop("disabled", false);
    });
}