import { UiBasicElement } from './uiBasic.js';

var askBeforeUnload = false;

$(function(){
    window.onbeforeunload = function() {
        if(askBeforeUnload) return "Changes you made may not be saved!";
        return null;
    }

    test();
})

function test(){
    var t = new UiBasicElement(0, 1, .1, .9);
    //console.log(t.toString());
    console.log(JSON.stringify(t));
}