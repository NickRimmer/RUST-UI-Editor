'use strict';
import RectTransform from "./components/rect-transform.js";
import {eventDefines} from "./defines.js";

export default class Element {
    data;
    id;

    constructor(data) {
        this.data = data;
        this.id = Date.now() + "_" + Math.round(Math.random() * 1000000);
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

        this.data.components
            .filter(component => !(component instanceof RectTransform))
            .forEach(component => component.renderView(rect, this));
    }

    renderRect(){
        let rect = this.data.components.find(component => component instanceof RectTransform);
        if(!rect){
            console.warn("Element not rendered cause there is no rect data");
            return;
        }

        var html = rect.renderView($("#game-screen"), this);
        return html;
    }

    addComponent(component){
        this.data.components.push(component);
        this.renderView();

        $(window).trigger(eventDefines.componentAdded);
    }
}