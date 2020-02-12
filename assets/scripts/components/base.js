'use strict';

export default class BaseComponent{
    data;

    constructor(data, type){
        this.data = data;
        this.data.type = type;
    }

    renderView(parent, element){
        console.warn("Component render view not implemented");
        console.log(this);
    }

    renderProperties(parent){
        console.warn("Component render properties not implemented");
        console.log(this);

        let html = $(`<div>Not implemented properties</div>`)
        if(parent) parent.append(html);

        return html;
    }
}