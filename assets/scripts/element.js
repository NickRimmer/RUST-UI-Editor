'use strict';
import RectTransform from "./components/rect-transform.js";
import {deepClone} from "./tools.js";
import { eventDefines } from "./defines.js";

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

    renderView() {
        let rect = this.renderRect();
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

    renderRect() {
        let rect = this.components.find(component => component instanceof RectTransform);
        if (!rect) {
            console.warn("Element not rendered cause there is no rect data");
            return;
        }

        var html = rect.renderView($("#game-screen"), this);
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

    renderView() {
        let rect = super.renderView();
        rect.addClass("element-temp");
        $(`#${this.original.id}`).replaceWith(rect);

        return rect;
    }

    restoreView() {
        let rect = this.original.renderView();
        $(`#${this.id}`).replaceWith(rect);
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

