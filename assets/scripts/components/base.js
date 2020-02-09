export class BaseComponent {
    constructor(componentData, configurationViewId) {
        this.data = componentData;

        if (configurationViewId) {
            this.configurationView = $("#" + configurationViewId).clone();
            this.configurationView.prop("id", null);
        }
    }

    renderProperties() {
        return JSON.stringify(this.data);
    }

    save(){
        console.log(this.data);
    }
}