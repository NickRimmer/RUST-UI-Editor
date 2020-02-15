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

    renderProperties(parent){
        var html = $("#solid-component-properties").clone();
        html.removeAttr("id");

        if(parent) {
            parent.append(html);

            let picker = Pickr.create({
                el: $('#solid-color', html)[0],
                theme: 'monolith',
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
                        save: true
                    }
                }
            });

            picker.on("save", (color, instance) => {
                picker.hide();
                console.log(color);
            })
        }
        return html;
    }
}