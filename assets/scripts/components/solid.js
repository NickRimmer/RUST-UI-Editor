'use strict';
import BaseComponent from "./base.js";
import {uColorToHex} from "./../tools.js";

export default class SolidComponent extends BaseComponent{
    color;

    constructor(color){
        super();
        this.color = color || "1 1 1 0.7";
    }

    renderView(parent){
        let color = uColorToHex(this.color);
        let html = $(`<div class="component-solid"></div>`);

        html.css("background", color);
        parent.append(html);

        return html;
    }
}