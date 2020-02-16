'use strict';
import { elements } from "./../elements.js";

export default class BaseComponent{
    elementId;
    id;
    type;

    constructor(type){
        this.type = type;
        this.id = ["component", Date.now(), Math.round(Math.random() * 1000)].join("_");
    }

    renderView(){
        console.warn("Component render view not implemented");
        console.log(this);
    }

    renderProperties(){
        var html = $("#base-component-properties").clone();
        html.removeAttr("id");

        let target = $(`#properties_${this.id}`);
        if(target) target.append(html);

        return html;
    }

    getElement(){
        let element = elements.find(x => x.id === this.elementId);
        if(!element){
            console.error(`Element with id '${this.elementId}' not found`);
            return;
        }

        return element;
    }
}