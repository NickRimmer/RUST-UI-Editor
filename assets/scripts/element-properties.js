'use strict';
import { updateMenu } from '/assets/scripts/sidebar.js';
import { renderComponentProperties } from "./ui-components.js";
import { 
    defaultParent, 
    isParentCorrect,
    updateElement, 
    removeElement
} from '/assets/scripts/ui-elements.js';

let dialog;
let el;
let componentsArea;
let componentItemTemplate;

$(function () {
    dialog = $("#element-properties");
    //componentsArea = $("#edit-ui-components", dialog);
    componentsArea = $("#component-properties", dialog);
    componentItemTemplate = $(".template", componentsArea).clone();
    componentItemTemplate.removeClass("d-none template");
    $(".template", componentsArea).remove();

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
    let firstOpened = false;
    el.components.forEach(component => {
        var html = renderComponentProperties(component);
        var item = componentItemTemplate.clone();
        var id = "component-" + Math.round(Math.random()*10000000);
        
        $(".component-title", item).html(component.type);
        $(".component-title", item).attr("data-target", "#" + id);
        $(".component-properties", item).prop("id", id);
        $(".component-properties", item).html(html);
        if(!firstOpened){
            $(".component-properties", item).addClass("show");
            firstOpened = true;
        }

        item.data("component", component);
        componentsArea.append(item);
    });

    applyChangesListener(componentsArea);
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
        var handler = $(".component-properties", component).children().data("handler");
        if (!handler) {
            console.warn("handler for component wasn't found )=");
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

    if($(".list-group-item", dialog).length !== el.components.length){
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

function addComponent(){
    alert("Not implemented yet (=");
}