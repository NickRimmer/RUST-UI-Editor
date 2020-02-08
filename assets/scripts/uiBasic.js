export class UiBasicElement {
    static DefaultParent = "_";

    constructor(xMin, xMax, yMin, yMax, name, parent) {
        this.name = name || "random-" + Math.random();
        this.parent = parent || UiBasicElement.DefaultParent;
        this.components = [new UiBasicComponent(xMin, xMax, yMin, yMax)];
    }
}

export class UiBasicComponent {
    constructor(xMin, xMax, yMin, yMax) {
        this.anchormin = xMin + " " + yMin;
        this.anchormax = xMax + " " + yMax;
        this.type = "RectTransform";
    }
}