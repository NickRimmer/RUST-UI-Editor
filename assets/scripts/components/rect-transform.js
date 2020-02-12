'use strict';
import BaseComponent from "./base.js";
import {anchorsToPoints, pointsToPixels} from "../tools.js";

export default class RectTransform extends BaseComponent{
    transform = {
        xMin: 0,
        xMax: 1,
        yMin: 0,
        yMax: 1
    };

    aMin = "0 0";
    aMax = "1 1";

    constructor(aMin, aMax){
        super();
        this.transform = anchorsToPoints(aMin, aMax);
        this.aMin = aMin;
        this.aMax = aMax;
    }

    renderView(parent, element){
        let elementId = `element-${element.id}`;
        let px = pointsToPixels(this.aMin, this.aMax);
        let html = $(`<div id="${elementId}" class="element-container"></div>`);
        html.css({
            left: px.left,
            bottom: px.bottom,
            width: px.width,
            height: px.height
        });

        $(`#${elementId}`, parent).remove();
        $(parent).append(html)

        return html;
    }
}