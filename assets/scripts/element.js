'use strict';
import RectTransform from "./components/rect-transform.js";
import {eventDefines} from "./defines.js";

export default class Element {
    data;
    components = [];
    id;

    constructor(data, component) {
        this.data = data;
        this.id = ["element", Date.now(), Math.round(Math.random() * 1000)].join("_");

        if(component) this.components.push(component);
    }
    
    getDataJson() {
        return JSON.stringify(data);
    }

    renderView() {
        let rect = this.renderRect();
        if(!rect){
            console.warn("Element doesn't contains Rect component");
            console.log(this);
            return;
        }

        this.components
            .filter(component => !(component instanceof RectTransform))
            .forEach(component => component.renderView(rect, this));
    }

    renderRect(){
        let rect = this.components.find(component => component instanceof RectTransform);
        if(!rect){
            console.warn("Element not rendered cause there is no rect data");
            return;
        }

        var html = rect.renderView($("#game-screen"), this);
        return html;
    }

    addComponent(component){
        this.components.push(component);
        this.renderView();

        $(window).trigger(eventDefines.componentAdded);
    }
}