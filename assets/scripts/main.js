var askBeforeUnload = false;

$(function(){
    window.onbeforeunload = function() {
        if(askBeforeUnload) return "Changes you made may not be saved!";
        return null;
    }
})