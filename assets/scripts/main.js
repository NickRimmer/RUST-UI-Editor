//import { updateExampleBgPreview } from './configuration.js';

var askBeforeUnload = false;

$(function(){
    window.onbeforeunload = function() {
        if(askBeforeUnload) return "Changes you made may not be saved!";
        return null;
    }

    $(".modal").parent("form").on("submit", modalSubmit);
    $(".modal").on("show.bs.modal", modalShow);
})

function modalSubmit(e){
    var form = e.target;
    var fn = $("[modal-save]", form).attr("modal-save");
    if(fn){
        var result = window[fn](form);
        if(result !== false){
            $(".modal", form).modal('hide');
        }
    }else{
        console.warn("Action wasn't specified");
        console.warn(form);
    }
    return false;
}

function modalShow(e){
    var form = e.target;
    var fn = $("[modal-show]", form).attr("modal-show");
    if(fn) window[fn](form);
}