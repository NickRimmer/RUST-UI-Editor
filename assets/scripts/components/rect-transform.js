'use strict';
import BaseComponent from "./base.js";
import { pointsToPixels, pixelsToPoints } from "../tools.js";

export default class RectTransform extends BaseComponent {
    static TypeName = "RectTransform";

    constructor(data) {
        super(data || { anchormin: "0.4 0.4", anchormax: "0.6 0.6" }, RectTransform.TypeName);
    }

    renderView(parent) {
        let html = $(`<div id="${this.elementId}" class="element-container"></div>`);
        this.updateView(html, parent);

        if (parent) {
            $(`#${this.elementId}`).remove();
            parent.append(html);
        }

        return html;
    }

    renderProperties(parent) {
        var html = $("#rect-transform-component-properties").clone();
        html.prop("id", this.id);

        $("#transform-left", html).on("keyup", () => { this.setTransformFromFields(); this.updateView() });
        $("#transform-bottom", html).on("keyup", () => { this.setTransformFromFields(); this.updateView() });
        $("#transform-width", html).on("keyup", () => { this.setTransformFromFields(); this.updateView() });
        $("#transform-height", html).on("keyup", () => { this.setTransformFromFields(); this.updateView() });

        this.updatePropertiesView(html);

        if (parent) parent.append(html);
        return html;
    }

    updatePropertiesView(html) {
        html = html || $(`#${this.id}`);

        let parentHtml = $(`#${this.elementId},[id-original=${this.elementId}]`).parent();
        let px = pointsToPixels(this.data.anchormin, this.data.anchormax, parentHtml);
        $("#transform-left", html).val(px.left);
        $("#transform-bottom", html).val(px.bottom);
        $("#transform-width", html).val(px.width);
        $("#transform-height", html).val(px.height);
    }

    updateView(html, parentHtml) {
        html = html || $(`#${this.elementId},[id-original=${this.elementId}]`);
        parentHtml = parentHtml || $(`#${this.elementId},[id-original=${this.elementId}]`).parent();

        let px = pointsToPixels(this.data.anchormin, this.data.anchormax, parentHtml);

        html.css({
            left: px.left,
            bottom: px.bottom,
            width: px.width,
            height: px.height,
            top: "auto"
        });
    }

    setTransformFromFields() {
        let html = $(`#${this.id}`);
        let parentHtml = $(`#${this.elementId},[id-original=${this.elementId}]`).parent();
        let points = pixelsToPoints(
            $("#transform-left", html).val(),
            $("#transform-bottom", html).val(),
            $("#transform-width", html).val(),
            $("#transform-height", html).val(),
            parentHtml);
        this.data.anchormin = `${points.xMin} ${points.yMin}`;
        this.data.anchormax = `${points.xMax} ${points.yMax}`;

        console.log(this.data.anchormin);
        console.log(this.data.anchormax);
    }

    setTransformFromRect() {
        let rect = $(`#${this.elementId},[id-original=${this.elementId}]`);
        let parentHtml = rect.parent();

        let left = rect.position().left;
        let bottom = rect.parent().outerHeight(true) - rect.position().top - rect.outerHeight(true);
        let width = rect.outerWidth(true);
        let height = rect.outerHeight(true);

        let points = pixelsToPoints(left, bottom, width, height, parentHtml);
        this.data.anchormin = `${points.xMin} ${points.yMin}`;
        this.data.anchormax = `${points.xMax} ${points.yMax}`;
    }
}