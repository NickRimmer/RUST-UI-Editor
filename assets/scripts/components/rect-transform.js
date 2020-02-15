'use strict';
import BaseComponent from "./base.js";
import {pointsToPixels, pixelsToPoints} from "../tools.js";

export default class RectTransform extends BaseComponent{
    static TypeName = "RectTransform";

    parentHtml;

    constructor(data){
        super(data || {anchormin: "0.4 0.4", anchormax: "0.6 0.6"}, RectTransform.TypeName);
    }

    renderView(parent, element){
        let elementId = element.id;
        let px = pointsToPixels(this.data.anchormin, this.data.anchormax, parent);
        let html = $(`<div id="${elementId}" class="element-container"></div>`);
        html.css({
            left: px.left,
            bottom: px.bottom,
            width: px.width,
            height: px.height
        });
        
        if(parent){
            $(`#${elementId}`).remove();
            parent.append(html);
        }

        return html;
    }

    setSizePx(left, bottom, width, height, parent){
        let points = pixelsToPoints(left, bottom, width, height, parent);
        this.data.anchormin = `${points.xMin} ${points.yMin}`;
        this.data.anchormax = `${points.xMax} ${points.yMax}`;

        return this.data;
    }
}