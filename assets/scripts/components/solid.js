'use strict';
import BaseComponent from "./base.js";
import { uColorToHex, hexToUColor } from "./../tools.js";

export default class SolidComponent extends BaseComponent {
    static TypeName = "UnityEngine.UI.Image";
    color;

    constructor(color) {
        super(SolidComponent.TypeName);
        this.color = color || "1 1 1 0.75";
    }

    renderView() {
        let color = uColorToHex(this.color);
        let componentHtml = $(`<div class="component-solid"></div>`);

        componentHtml.css("background", color);
        componentHtml.prop("id", this.id);

        let parentHtml = this.getElement().getHtml();
        parentHtml.append(componentHtml);

        return componentHtml;
    }

    renderProperties() {
        var html = $("#solid-component-properties").clone();
        html.removeAttr("id");

        let target = $(`#properties_${this.id}`);
        if (target) {
            target.append(html);
            this.setupPicker(html);
        }

        return html;
    }

    setupPicker(html) {
        let color = uColorToHex(this.color);
        let picker = Pickr.create({
            el: $('#solid-color', html)[0],
            theme: 'monolith',
            default: color,
            components: {
                preview: true,
                opacity: true,
                hue: true,

                interaction: {
                    input: true,
                    //hex: true,
                    //rgba: true,
                    save: true,
                    //cancel: true
                }
            },
            strings: {
                cancel: "Reset"
            }
        });

        picker.on("save", (color, instance) => {
            picker.hide();
            let hex = color.toHEXA().toString();
            let result = hexToUColor(hex);
            this.color = result;

            let html = $(`#${this.id}`);
            html.css("background", hex);
        });
    }
}