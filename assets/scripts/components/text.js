'use strict';
import BaseComponent from "./base.js";
import { uColorToHex, hexToUColor, setupPicker } from "./../tools.js";

export default class TextComponent extends BaseComponent {
    static TypeName = "UnityEngine.UI.Text";
    text;
    color;
    size;
    position;

    constructor(text, color, size, position) {
        super(TextComponent.TypeName);
        this.text = text || "Sample text";
        this.color = color || "1 1 1 1";
        this.size = size || 24;
        this.position = position || "MiddleCenter"
    }

    renderView() {
        $(`#${this.id}`).remove();
        let componentHtml = $(`<div class="component-text"></div>`);

        componentHtml.html(this.text);
        componentHtml.prop("id", this.id);
        componentHtml.css({
            "font-size": `${this.getTextSize()}px`,
            "color": `#${this.getHexColor()}`,
            "align-items": this.getVerticalAlign(),
            "justify-content": this.getHorizontalAlign()
        });

        let parentHtml = this.getElement().getHtml();
        parentHtml.append(componentHtml);

        return componentHtml;
    }

    renderProperties() {
        var html = $("#text-component-properties").clone();
        html.removeAttr("id");

        $("#text-text", html).val(this.text).on("change keyup", _=>this.updateProperties());
        $("#text-color", html).val(this.getHexColor());
        $("#text-size", html).val(this.size).on("change keyup", _=>this.updateProperties());
        $("#text-position", html).val(this.position).on("change", _=>this.updateProperties());

        setupPicker($("#text-color", html), color => this.onChangeColor(color));

        let target = $(`#properties_${this.id}`);
        if (target) {
            target.append(html);
        }

        return html;
    }

    onChangeColor(color){
        this.color = hexToUColor(color.toHEXA().toString());
        this.renderView();
    }

    updateProperties(){
        let html = $(`#properties_${this.id}`);
        $(".is-invalid", html).removeClass("is-invalid");

        let text =  $("#text-text", html).val();
        if(text) this.text = text;
        else $("#text-text", html).addClass("is-invalid");

        let size = $("#text-size", html).val();
        if(size) this.size = size;
        else $("#text-size", html).addClass("is-invalid");

        this.position = $("#text-position", html).val();

        this.renderView();
    }

    getTextSize(){
        return this.size;
    }

    getHexColor(){
        return uColorToHex(this.color);
    }

    getHorizontalAlign(){
        switch (this.position){
            case "MiddleLeft":
            case "TopLeft":
            case "BottomLeft":
                return "flex-start";

            case "MiddleRight":
            case "TopRight":
            case "BottomRight":
                return "flex-end";

            case "MiddleCenter":
            case "TopCenter":
            case "BottomCenter":
                return "center";

            default:
                console.warn(`Unknown align: ${this.position}`);
                return "error";
        }
    }

    getVerticalAlign(){
        switch (this.position){
            case "MiddleLeft":
            case "MiddleRight":
            case "MiddleCenter":
                return "center";

            case "TopLeft":
            case "TopRight":
            case "TopCenter":
                return "flex-start";

            case "BottomLeft":
            case "BottomRight":
            case "BottomCenter":
                return "flex-end";

            default:
                console.warn(`Unknown align: ${this.position}`);
                return "error";
        }
    }
}