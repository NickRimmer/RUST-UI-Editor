'use strict';
import { BaseComponent } from "./base.js";

export class TextComponent extends BaseComponent {
    constructor(data){
        super(data, "text-component-properties");
    }

    renderProperties(){       
        super.renderProperties();
        return this.configurationView;
    }

    save(){
        
    }
}