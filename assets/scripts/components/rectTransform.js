'use strict';
import { BaseComponent } from "./base.js";
import { pointsToPixels, pixelsToPoints } from "./../tools.js";

export class RectTransformComponent extends BaseComponent {
    constructor(data){
        super(data, "rect-transform-component-properties");
    }

    renderProperties(){       
        var pixels = pointsToPixels(this.data.anchormin, this.data.anchormax);
        
        $("#transform-left", this.configurationView).val(pixels.left);
        $("#transform-bottom", this.configurationView).val(pixels.bottom);
        $("#transform-width", this.configurationView).val(pixels.width);
        $("#transform-height", this.configurationView).val(pixels.height);

        super.renderProperties();
        return this.configurationView;
    }

    save(){
        var points = pixelsToPoints(
            $("#transform-left",this.configurationView).val(),
            $("#transform-bottom",this.configurationView).val(),
            $("#transform-width",this.configurationView).val(),
            $("#transform-height",this.configurationView).val()
        )

        this.data.anchormin = points.xMin + " " + points.yMin;
        this.data.anchormax = points.xMax + " " + points.yMax;
    }
}