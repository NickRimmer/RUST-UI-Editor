'use strict';
import { updateMenu } from '/assets/scripts/sidebar.js';

import { 
    renderComponentProperties,
    addTransformComponent,
    addTextComponent,
    addSolidComponent
} from "./ui-components.js";

import { 
    defaultParent, 
    isParentCorrect,
    updateElement, 
    removeElement
} from '/assets/scripts/ui-elements.js';

let dialog;
let el;
let componentsArea;
let componentItemTemplate, addBtnTemplate;

$(function () {
    dialog = $("#element-properties");
    componentsArea = $("#component-properties", dialog);
    componentItemTemplate = $(".item-template", componentsArea).clone();
    componentItemTemplate.removeClass("d-none item-template");

    applyChangesListener(dialog);

    dialog.on("submit", save);
    $("#btn-reset-parent", dialog).on("click", resetParent);
    $("#element-properties-close").on("click", hideProperties);
    $("#element-properties-remove").on("click", remove);
    $("#ui-element-parent", dialog).on("change focus", () => $("#ui-element-parent", dialog).removeClass("is-invalid"));

    addBtnTemplate = $(".add-template", componentsArea).clone();
    addBtnTemplate.removeClass("d-none add-template");
})

function appendAddBtn(){
    var btn = addBtnTemplate.clone();
    $("#btn-add-component-rect", btn).on("click", () => addComponent(addTransformComponent));
    $("#btn-add-component-text", btn).on("click", () => addComponent(addTextComponent));
    $("#btn-add-component-solid", btn).on("click", () => addComponent(addSolidComponent));

    $(".btn-add", componentsArea).remove();
    componentsArea.append(btn);
}

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

function addComponent(action){
    var component = action();
    var item = renderComponent(component);
    $(".component-properties", item).collapse('show');
    applyChangesListener(item);
    testChanges();
}

function renderComponents() {
    componentsArea.html("");
    el.components.forEach(component => renderComponent(component));
    //TODO open first component

    applyChangesListener(componentsArea);
}

function renderComponent(component){
    var html = renderComponentProperties(component);
    var item = componentItemTemplate.clone();
    var id = "component-" + Math.round(Math.random()*10000000);
    
    $(".component-title", item).html(component.type);
    $(".component-title", item).attr("data-target", "#" + id);
    $(".component-properties", item).prop("id", id);
    $(".component-properties", item).html(html);

    item.data("component", component);
    componentsArea.append(item);
    appendAddBtn();

    return item;
}

function applyChangesListener(parent){
    $("input", parent).on("change keyup click blur", testChanges);
    $(".btn-remove", parent).on("click", removeComponent);
}

function save() {
    var parentName = $("#ui-element-parent", dialog).val();
    if (!isParentCorrect(parentName)) {
        $("#ui-element-parent", dialog).addClass("is-invalid");
        return false;
    }

    updateElement(el, $("#ui-element-name", dialog).val(), parentName);

    // replace old components
    var newComponents = [];
    componentsArea.children().each((i, component) => {
        if(!$(component).is(".component-item")) return;

        var handler = $(".component-properties", component).children().data("handler");
        if (!handler) {
            console.warn("handler for component wasn't found )=");
            console.warn(component);
            return false;
        }

        handler.save();
        newComponents.push(handler.data);
    });

    el.components = newComponents;

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

    if($(".list-group-item", dialog).length - 1 !== el.components.length){
        $("#element-properties-save", dialog).prop("disabled", false);
    }
}

function removeComponent(e){
    //var component = $(e.target).closest(".list-group-item").data("component");
    //console.log(component);

    var item = $(e.target).closest(".list-group-item");
    item.remove();

    testChanges();
    return false;
}