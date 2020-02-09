'use strict';

//import Sortable from 'sortablejs';
import { GetBasic, DefaultParent } from './uiTools.js';

let els = [];

export function buildMenu(elements) {
    els = elements;
    
    $("#els").html("");
    buildMenuLevel($("#els"), DefaultParent);
    updateNoElementView();
    $("a", "#els").on("click", onElementClick);
}

function buildMenuLevel(menu, parentName){
    els.filter(el => el.parent == parentName).forEach(el => {
        var item = $(`<li class="nav-item"><a href="#" class="nav-link">${(el.name || 'unknown')}</a><ul class="nav flex-column ml-2"></ul></li>`);
        item.data("el", el);

        menu.append(item);
        if(el.name) buildMenuLevel(item.children("ul"), el.name);
    });
}

function updateNoElementView() {
    var any = $("#els").children().length;
    var el = $(".no-elements", ".sidebar");

    if (any) el.addClass("d-none");
    else el.removeClass("d-none");
}

function onElementClick(e){
    var item = $(e.target);
    var el = item.closest("li").data("el");

    $("#editUiBase").data("el", el);
    $("#editUiBase").modal("show");
    
    return false;
}