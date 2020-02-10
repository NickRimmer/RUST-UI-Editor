export class BaseComponent {
    constructor(componentData, configurationViewId) {
        this.data = componentData;

        if (configurationViewId) {
            this.configurationView = $("#" + configurationViewId).clone();
            this.configurationView.removeProp("id");
        }
    }

    renderProperties() {
        if(this.configurationView) this.configurationView.data("handler", this);
        return `<div>${JSON.stringify(this.data)}</div>`;
    }

    save(){
        console.log(this.data);
    }
}