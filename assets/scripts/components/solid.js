'use strict';
import BaseComponent from "./base.js";
import {uColorToHex} from "./../tools.js";

export default class SolidComponent extends BaseComponent{
    static TypeName = "UnityEngine.UI.Image";

    color;

    constructor(data){
        super(data || {color: "1 1 1 0.75"}, SolidComponent.TypeName);
    }

    renderView(parent){
        let color = uColorToHex(this.data.color);
        let html = $(`<div class="component-solid"></div>`);

        html.css("background", color);
        parent.append(html);

        return html;
    }
}