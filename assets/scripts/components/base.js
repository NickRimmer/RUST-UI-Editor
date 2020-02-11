'use strict';

import { componentType } from "./../ui-components.js";
import { pointsToPixels } from "./../tools.js";

export class BaseComponent {
    constructor(componentData, configurationViewId) {
        this.data = componentData;

        if (configurationViewId) {
            this.configurationView = $("#" + configurationViewId).clone();
            this.configurationView.removeProp("id");
        }
    }

    renderProperties() {
        if(this.configurationView) this.configurationView.data("handler", this);
        return `<div>${JSON.stringify(this.data)}</div>`;
    }

    getRect(el){
        // if(!el) return null;
        // if(!el.components) return null;
        return el.components.find(x=>x.type == componentType.rectTransform);
    }

    getTransform(el){
        let rect = this.getRect(el);
        
        if(!rect){
            //console.warn("Can't return transform without rect");
            return;
        }

        return pointsToPixels(rect.anchormin, rect.anchormax);
    }

    renderView(el){}

    save(){
        console.log(this.data);
    }
}