'use strict';

export default class BaseComponent{
    data;
    elementId;

    constructor(data, type){
        this.data = data;
        this.data.type = type;
        this.id = ["component", Date.now(), Math.round(Math.random() * 1000)].join("_");
    }

    renderView(parent){
        console.warn("Component render view not implemented");
        console.log(this);
    }

    renderProperties(parent){
        console.warn("Component render properties not implemented");
        //console.log(this);

        var html = $("#base-component-properties").clone();
        html.removeAttr("id");

        if(parent) parent.append(html);
        return html;
    }
}