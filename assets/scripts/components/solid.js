'use strict';
import BaseComponent from "./base.js";
import {uColorToHex, hexToUColor} from "./../tools.js";

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
        html.prop("id", this.id);
        parent.append(html);

        return html;
    }

    renderProperties(parent){
        var html = $("#solid-component-properties").clone();
        html.removeAttr("id");

        if(parent) {
            parent.append(html);
            
            let color = uColorToHex(this.data.color);
            let picker = Pickr.create({
                el: $('#solid-color', html)[0],
                theme: 'monolith',
                default: color,
                components:{
                    // Main components
                    preview: true,
                    opacity: true,
                    hue: true,
    
                    // Input / output Options
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
                this.data.color = result;

                let html = $(`#${this.id}`);
                html.css("background", hex);
            });
        }
        return html;
    }
}