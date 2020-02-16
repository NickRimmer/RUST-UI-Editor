'use strict';

import {elements} from "./elements.js";
import {events} from "./defines.js";

export const images = [
    "/assets/images/screen1.jpg", 
    "/assets/images/screen2.jpg", 
    "/assets/images/screen3.jpg",
    "/assets/images/screen4.jpg", 
    "/assets/images/screen5.jpg", 
    "/assets/images/screen6.jpg"
];

class Config{
    static StorageKey = "previewScreen.config";
    
    image;
    width;
    height;

    constructor(image, width, height){
        this.image = image;
        this.width = width;
        this.height = height;
    }

    static load(){
        var s = localStorage.getItem(Config.StorageKey);
        if(s) return JSON.parse(s);
        return new Config(images[0], 1280, 682);
    }

    update(image, width, height){
        this.image = image;
        this.width = width;
        this.height = height;

        var s = JSON.stringify(this);
        localStorage.setItem(Config.StorageKey, s);
    }
}

export const config = Config.load();
let gameScreen

$(function () {
    gameScreen = $("#game-screen");
    updateScreenView();

    $(window).on(events.elementsUpdated, updateElementsView);
})

export function update(image, width, height) {
    config.update(image, width, height);
    updateScreenView();
}

function updateScreenView() {
    gameScreen.css({
        "background-image": "url(" + config.image + ")",
        "width": config.width + "px",
        "height": config.height + "px"
    });
}

export function updateElementsView(){
    gameScreen.html("");
    renderElements();
}

function renderElements(parentId){   
    elements
        .filter(x=>x.parentId == (parentId || null))
        .forEach(element => renderElement(element));
}

function renderElement(element){
    element.renderView();
    renderElements(element.id);
}