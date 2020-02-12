'use strict';
import BaseComponent from "./base.js";
import {pointsToPixels} from "../tools.js";

export default class RectTransform extends BaseComponent{
    static TypeName = "RectTransform";

    constructor(data){
        super(data || {anchormin: "0.4 0.4", anchormax: "0.6 0.6"}, RectTransform.TypeName);
    }

    renderView(parent, element){
        let elementId = `element-${element.id}`;
        let px = pointsToPixels(this.data.anchormin, this.data.anchormax);
        let html = $(`<div id="${elementId}" class="element-container"></div>`);
        html.css({
            left: px.left,
            bottom: px.bottom,
            width: px.width,
            height: px.height
        });

        if(parent){
            $(`#${elementId}`, parent).remove();
            $(parent).append(html)
        }

        return html;
    }
}