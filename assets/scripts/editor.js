export let previewImages = ["screen1.jpg", "screen2.jpg", "screen3.jpg", "screen4.jpg", "screen5.jpg", "screen6.jpg"];

export let previewConfig = {
    image: previewImages[0],
    width: 1280,
    height: 682
};

$(function () {
    previewUpdateView();
})

export function previewUpdate(image, width, height) {
    previewConfig.image = image;
    previewConfig.width= width;
    previewConfig.height = height;

    previewUpdateView();
}

function previewUpdateView(){
    $("#game-screen").css({
        "background-image": "url(/assets/images/" + previewConfig.image + ")",
        "width": previewConfig.width + "px",
        "height": previewConfig.height + "px"
    });
}