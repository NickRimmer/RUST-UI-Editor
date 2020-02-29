'use strict';
import BaseComponent from "./base.js";

import { pointsToPixels, pixelsToPoints } from "../tools.js";

export default class RectTransform extends BaseComponent {
    static TypeName = "RectTransform";
    anchormin;
    anchormax;

    constructor(anchormin, anchormax) {
        super(RectTransform.TypeName);
        this.anchormin = anchormin || "0.4 0.4";
        this.anchormax = anchormax || "0.6 0.6";
    }

    renderView() {
        $(`#${this.elementId}`).remove();
        
        let componentHtml = $(`<div id="${this.elementId}" class="element-container rect-component"></div>`);
        let parentHtml = this.getElement().getParentHtml();

        let px = pointsToPixels(this.anchormin, this.anchormax, parentHtml);

        componentHtml.css({
            left: px.left,
            bottom: px.bottom,
            width: px.width,
            height: px.height,
            top: "auto"
        });

        parentHtml.append(componentHtml);
        return componentHtml;
    }

    renderProperties(){
        var html = $("#rect-transform-component-properties").clone();
        html.removeAttr("id");

        this.setupEvents(html);
        this.setupFields(html);

        let target = $(`#properties_${this.id}`);
        if(target) target.append(html);

        return html;
    }

    setupEvents(html){
        $("#transform-left", html).on("keyup change", () => { this.setTransformFromFields(); });
        $("#transform-bottom", html).on("keyup change", () => { this.setTransformFromFields(); });
        $("#transform-width", html).on("keyup change", () => { this.setTransformFromFields(); });
        $("#transform-height", html).on("keyup change", () => { this.setTransformFromFields(); });
        $("#btn-expand", html).on("click", _ => this.expandToParent());
    }

    setupFields(html){
        html = html || $(`#properties_${this.id}`);
        let parentHtml = this.getElement().getParentHtml();
        let px = pointsToPixels(this.anchormin, this.anchormax, parentHtml);

        $("#transform-left", html).val(px.left);
        $("#transform-bottom", html).val(px.bottom);
        $("#transform-width", html).val(px.width);
        $("#transform-height", html).val(px.height);
    }

    setTransformFromRect() {
        let rect = this.getElement().getHtml();

        let left = rect.position().left;
        let bottom = rect.parent().outerHeight(true) - rect.position().top - rect.outerHeight(true);
        let width = rect.outerWidth(true);
        let height = rect.outerHeight(true);

        let points = pixelsToPoints(left, bottom, width, height, rect.parent());
        this.anchormin = `${points.xMin} ${points.yMin}`;
        this.anchormax = `${points.xMax} ${points.yMax}`;
    }

    setTransformFromFields() {
        let componentHtml = $(`#properties_${this.id}`);
        let rect = this.getElement().getHtml();

        let points = pixelsToPoints(
            $("#transform-left", componentHtml).val(),
            $("#transform-bottom", componentHtml).val(),
            $("#transform-width", componentHtml).val(),
            $("#transform-height", componentHtml).val(),
            rect.parent());

        this.anchormin = `${points.xMin} ${points.yMin}`;
        this.anchormax = `${points.xMax} ${points.yMax}`;

        rect.css({
            left: $("#transform-left", componentHtml).val() * 1,
            bottom: $("#transform-bottom", componentHtml).val() * 1,
            width: $("#transform-width", componentHtml).val() * 1,
            height:$("#transform-height", componentHtml).val() * 1,
            top: "auto"
        });
    }

    expandToParent(){
        this.anchormin = "0 0";
        this.anchormax = "1 1";
        this.setupFields();
        this.setTransformFromFields();
    }

    /*

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
    }*/
}