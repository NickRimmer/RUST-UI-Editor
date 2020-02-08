export class UiBasicElement {
    constructor(xMin, xMax, yMin, yMax) {
        this.name = "random-" + Math.random();
        this.parent = "Hud";
        this.components = [new UiBasicComponent(xMin, xMax, yMin, yMax)];
    }

    toString() {
        var c = this.components.join(',');
        return '{"name": "' + this.name + '","parent": "' + this.parent + '","components": [' + c + ']}';
    }
}

export class UiBasicComponent {
    constructor(xMin, xMax, yMin, yMax) {
        this.xMin = xMin;
        this.xMax = xMax;
        this.yMin = yMin;
        this.yMax = yMax;

        this.type = "RectTransform";
    }

    toString() {
        return '{"type":"' + this.type + '","anchormin":"' + this.xMin + ' ' + this.yMin + '","anchormax": "' + this.xMax + ' ' + this.yMax + '"}';
    }
}