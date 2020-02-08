var bgExamples = ["screen1.jpg", "screen2.jpg", "screen3.jpg", "screen4.jpg", "screen5.jpg", "screen6.jpg"];
var bgExampleImage = bgExamples[0];
var bgExampleWidth = 1280;
var bgExampleHeight = 682;

$(function(){
    updateBgExampleView();
})

function updateBgExampleView(){
    $("#game-screen").css({
        "background-image": "url(/assets/images/"+bgExampleImage+")",
        "width": bgExampleWidth + "px",
        "height": bgExampleHeight + "px"
    });
}