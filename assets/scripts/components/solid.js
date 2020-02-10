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

    save(){
        
    }
}