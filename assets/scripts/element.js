'use strict';
import RectTransform from "./components/rect-transform.js";
import { deepClone, pointsToPixels } from "./tools.js";
import { getElement } from "./elements.js";

export default class Element {
    components = [];
    id;
    parentId;
    name;

    constructor(name, parentId) {
        this.id = ["element", Date.now(), Math.round(Math.random() * 1000)].join("_");
        this.name = name || "rnd-" + Date.now();
        this.parentId = parentId || null;
    }

    renderView() {
        let rectComponent = this.components.find(x => x.type === RectTransform.TypeName);
        if (!rectComponent) {
            console.warn("Element doesn't contains Rect component");
            console.log(this);
            return;
        }

        let rectHtml = rectComponent.renderView();

        let otherComponents = this.components.filter(x => x.id !== rectComponent.id);
        otherComponents.forEach(component => component.renderView());

        return rectHtml;
    }

    addComponent(component) {
        component.elementId = this.id;

        this.components.push(component);
    }

    removeComponent(id) {
        this.components = this.components.filter(x => x.id !== id);
    }

    getParentHtml() {
        if (this.parentId) return $(`#${this.parentId}`);
        return $("#game-screen");
    }

    getHtml() {
        return $(`#${this.id}`);
    }
}

export class TempElement {
    originalId;

    constructor(originalId) {
        this.originalId = originalId;
        let element = getElement(this.originalId);
        Object.assign(this, deepClone(element));

        $(`#${this.originalId}`).addClass('element-temp');
    }

    apply() {
        let originalId = this.originalId;
        delete this.originalId;

        let element = getElement(originalId);
        Object.assign(element, this);
    }
}

