'use strict';
import { BaseComponent } from "./base.js";

export class SolidComponent extends BaseComponent {
    constructor(data){
        super(data, "solid-component-properties");
    }

    renderProperties(){       
        super.renderProperties();
        return this.configurationView;
    }

    renderView(el){
        let view = $('<div class="element-render-item element-render-solid"></div>');
        let transform = this.getTransform(el);

        if(!transform) {
            console.warn("Solid component can't be rendered without RectTransform component");
            return;
        }

        view.css({
            "left": transform.left,
            "bottom": transform.bottom,
            "width": transform.width,
            "height": transform.height
        });

        $("#game-screen").append(view);
    }

    save(){
        
    }
}