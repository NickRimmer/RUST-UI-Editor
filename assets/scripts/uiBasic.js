export class UiBasicElement {
    constructor(xMin, xMax, yMin, yMax) {
        this.name = "random-" + Math.random();
        this.parent = "Hud";
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