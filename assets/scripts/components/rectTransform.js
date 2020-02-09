'use strict';
import { BaseComponent } from "./base.js";

export class RectTransformComponent extends BaseComponent {
    constructor(data){
        super(data, "ui-component-configuration-rectTransform");
    }

    renderConfiguration(){
        var mins = this.data.anchormin.split(" ");
        var maxs = this.data.anchormax.split(" ");
        
        $("#xMin", this.configurationView).val(mins[0]);
        $("#xMax", this.configurationView).val(maxs[0]);
        $("#yMin", this.configurationView).val(mins[1]);
        $("#yMax", this.configurationView).val(maxs[1]);

        this.configurationView.data("handler", this);
        return this.configurationView;
    }

    save(){
        this.data.anchormin = $("#xMin",this.configurationView).val() + " " + $("#yMin",this.configurationView).val();
        this.data.anchormax = $("#xMax",this.configurationView).val() + " " + $("#yMax",this.configurationView).val();
    }
}