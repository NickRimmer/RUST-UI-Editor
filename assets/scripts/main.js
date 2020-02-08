//import { updateExampleBgPreview } from './configuration.js';

$(function(){
    //updateExampleBgPreview();
})

function modalSubmit(form){
    var fn = $("[modal-save]", form).attr("modal-save");
    if(fn){
        var result = window[fn](form);
        console.log(result);
        if(result !== false){
            $(".modal", form).modal('hide');
        }
    }else{
        console.warn("Action wasn't specified");
        console.warn(form);
    }
    return false;
}