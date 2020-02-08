export let images = [
    "/assets/images/screen1.jpg", 
    "/assets/images/screen2.jpg", 
    "/assets/images/screen3.jpg",
    "/assets/images/screen4.jpg", 
    "/assets/images/screen5.jpg", 
    "/assets/images/screen6.jpg"
];

export let config = {
    image: "",
    width: 0,
    height: 0,

    load: function () {
        this.image = localStorage.getItem("previewScreen.config.image") || images[0];
        this.width = localStorage.getItem("previewScreen.config.width") || 1280;
        this.height = localStorage.getItem("previewScreen.config.height") || 682;
    },

    save: function (image, width, height) {
        this.image = image;
        this.width = width;
        this.height = height;

        localStorage.setItem("previewScreen.config.image", image);
        localStorage.setItem("previewScreen.config.width", width);
        localStorage.setItem("previewScreen.config.height", height);
    }
};

$(function () {
    config.load();
    updateView();
})

export function update(image, width, height) {
    config.save(image, width, height);
    updateView();
}

function updateView() {
    $("#game-screen").css({
        "background-image": "url(" + config.image + ")",
        "width": config.width + "px",
        "height": config.height + "px"
    });
}