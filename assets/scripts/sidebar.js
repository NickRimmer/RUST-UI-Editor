'use strict';

//import Sortable from 'sortablejs';
import { uiElements } from './app.js';
import { showProperties, hideProperties } from './element-properties.js';
import { defaultParent, createElement } from './ui-elements.js';
import { addTextComponent, addSolidComponent } from './ui-components.js';

$(function () {
    updateMenu();
    $("#btn-add-element").on("click", hideProperties);
    $("#btn-add-component-panel").on("click", () => addElement("panel"));
    $("#btn-add-component-text").on("click", () => addElement("text", addTextComponent));
    $("#btn-add-component-solid").on("click", () => addElement("solid", addSolidComponent));
})

export function updateMenu() {
    $("#els").html("");
    buildMenuLevel($("#els"), defaultParent);
    
    updateNoElementView();
    $("a", "#els").on("click", onElementClick);
    $(".el-item > a", "#els").on("mouseenter", onElementHover);
    $(".el-item", "#els").on("mouseleave", onElementLeave);
    $(".sidebar").on("mouseleave", onElementLeave);
    //$("a", "#els").hover(onElementHover);
    
    $("ul", ".sidebar").disableSelection();
    $("ul", ".sidebar").sortable({
        distance: 5,
        update: onElementOrderChanged,
        axis: "y"
    });
}

function addElement(prefix, action){
    var name = prefix + "-" + Math.round(Math.random() * 1000000000);
    var parentElement = $("#add-btn-list").parent("li");
    console.log(parentElement[0]);
    var parentName = parentElement.length > 0
        ? $(parentElement).data("el").name
        : defaultParent;
    var el = createElement(name, parentName);

    if(action) action(el);

    onElementLeave();
    updateMenu();
    showProperties(el);
}

function buildMenuLevel(menu, parentName) {
    uiElements.filter(el => el.parent == parentName).forEach(el => {
        var item = $(`<li class="nav-item el-item"><a href="#" class="nav-link">${(el.name || 'unknown')}</a><ul class="nav flex-column ml-2"></ul></li>`);
        item.data("el", el);

        menu.append(item);
        if (el.name) buildMenuLevel(item.children("ul"), el.name);
    });
}

function updateNoElementView() {
    var any = $("#els").children().length;
    var el = $(".no-elements", ".sidebar");

    if (any) el.addClass("d-none");
    else el.removeClass("d-none");
}

function onElementClick(e) {
    var item = $(e.target);
    var el = item.closest("li").data("el");

    showProperties(el);

    //$("#uiElement").data("el", el);
    //$("#uiElement").modal("show");

    return false;
}

function onElementOrderChanged(e, u){
    $(".el-item", ".sidebar").each(function(i, e){
        let el = $(e).data("el");
        if(!el) return;

        console.log($(e).data("el").name);
        uiElements[i] = $(e).data("el");
    });
}

function onElementHover(e){
    var btn = $("#add-btn-list");
    var trg = $(e.target).closest(".el-item");

    btn.addClass("detached");
    trg.append(btn);
}

function onElementLeave(){
    var btn = $("#add-btn-list");
    btn.removeClass("detached");
    $("#add-btn-area").append(btn);
}