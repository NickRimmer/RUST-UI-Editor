export class BaseComponent {
    constructor(componentData, configurationViewClass) {
        this.data = componentData;

        if (configurationViewClass) {
            this.configurationView = $("." + configurationViewClass).clone();
            this.configurationView.removeClass(configurationViewClass)
        }
    }

    renderConfiguration() {
        return JSON.stringify(this.data);
    }

    save(){
        console.log(this.data);
    }
}