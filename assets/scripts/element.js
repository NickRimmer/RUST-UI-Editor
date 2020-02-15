'use strict';
import RectTransform from "./components/rect-transform.js";
import {deepClone} from "./tools.js";
import {eventDefines} from "./defines.js";
import {defaultParent} from "./app.js";
import {elements, updateViews} from "./elements.js";

export default class Element {
    data;
    components = [];
    id;

    constructor(data, component) {
        this.data = data;
        this.id = ["element", Date.now(), Math.round(Math.random() * 1000)].join("_");

        if (component) this.components.push(component);
    }

    getDataJson() {
        return JSON.stringify(data);
    }

    renderView(parent) {
        parent = parent || this.data.parent;
        //console.log(`render: ${this.data.name}; parent: ${parent}`);

        let rect = this.renderRect(parent);
        if (!rect) {
            console.warn("Element doesn't contains Rect component");
            console.log(this);
            return;
        }

        this.components
            .filter(component => !(component instanceof RectTransform))
            .forEach(component => component.renderView(rect, this));

        return rect;
    }

    renderRect(parent) {
        parent = parent || this.data.parent;
        
        let rect = this.components.find(component => component instanceof RectTransform);
        if (!rect) {
            console.warn("Element not rendered cause there is no rect data");
            return;
        }

        let parentElement = elements.find(x => x.data.name === parent);
        let parentObject = (!parentElement)
            ? $("#game-screen")
            : $(`#${parentElement.id},[id-original=${parentElement.id}]`);

        let html = rect.renderView(parentObject, this);
        return html;
    }

    addComponent(component) {
        this.components.push(component);
        this.renderView();

        $(window).trigger(eventDefines.componentAdded);
    }

    removeComponent(id) {
        this.components = this.components.filter(x => x.id !== id);
    }
}

export class ElementTemp extends Element {
    original;

    constructor(obj) {
        if (!obj) {
            console.error("Original object required");
            return;
        }

        super();

        Object.assign(this, deepClone(obj));

        this.original = obj;
        this.id = `${this.original.id}-temp`;
    }

    renderView(parent) {
        let rect = super.renderView(parent);
        rect.addClass("element-temp");
        rect.attr("id-original", this.original.id);
        $(`#${this.original.id}`).replaceWith(rect);

        return rect;
    }

    restoreView() {
        let rect = this.original.renderView();
        $(`#${this.id}`).replaceWith(rect);
        updateViews(this.original.data.name);
    }

    apply(updateView) {
        // hide properties
        let id = this.id;
        delete this.id;

        let original = this.original;
        delete this.original;

        // clone
        Object.assign(original, this);

        // restore properties
        this.id = id;
        this.original = original;

        if (updateView) this.restoreView();
    }
}

