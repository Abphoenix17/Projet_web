document.addEventListener("DOMContentLoaded", init, false);

function init() {

    for (var i = 0; i < players.length; i++) {
        let play = players[i];
        play.ctrls.playpause.addEventListener('click', function () {
            let picture = document.getElementById("firstaudio");
            console.log(picture.attributes.src);
            console.log(this.player.getAttribute("data-img"));
            picture.src = this.player.getAttribute("data-img")
        })
    }
}