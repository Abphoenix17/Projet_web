var players = document.querySelectorAll("audio");

function twoDigits(num) {
    num = Math.trunc(num);
    if (num < 10)
        return "0" + num;
    return num;
}

function formatNumber(num) {
    var output = twoDigits(num) + ":" + twoDigits(num % 1 * 60);
    return output;
}

for (var i = 0; i < players.length; i++) {
    var player = players[i];
    player.removeAttribute("controls");
    // ---------------------
    //  Conteneur controles
    // ---------------------
    var controls = document.createElement("div");
    player.ctrls = controls
    controls.className = "playerControls";
    // ------------
    //  Play/Pause
    // ------------
    var playpause = document.createElement("img");
    controls.playpause = playpause;
    playpause.setAttribute("src", "images/play.svg");
    playpause.player = player;
    playpause.playing = false;
    playpause.onclick = function () {
        if (!this.playing) {
            this.player.play();
            playpause.setAttribute("src", "images/pause.svg");
        } else {
            this.player.pause();
            playpause.setAttribute("src", "images/play.svg");
        }
        this.playing = !this.playing;
    };
    controls.appendChild(playpause);
    // --------
    //  Volume
    // --------
    var vol = document.createElement("img");
    vol.setAttribute("src", "images/volume.svg");
    controls.appendChild(vol);
    // ----------
    //  Scrubber
    // ----------
    var scrubber = document.createElement("input");
    controls.scrubber = scrubber;
    scrubber.player = player;
    scrubber.setAttribute("type", "range")
    scrubber.setAttribute("value", "0")
    scrubber.setAttribute("step", "0.01")
    scrubber.click = false;
    scrubber.onmousedown = function () {
        this.click = true;
        this.paused = this.player.paused;
        this.player.pause();
    }
    scrubber.onmouseout = function () {
        if (this.click) {
            this.click = false;
            if (!this.paused) this.player.play();
        }
    }
    scrubber.onmouseup = function () {
        this.click = false;
        if (!this.paused) this.player.play();
    }
    scrubber.onchange = function () {
        this.player.currentTime = this.value;
    }
    player.onloadedmetadata = function () {
        this.ctrls.scrubber.setAttribute("max", this.duration);
    };
    player.onended = function () {
        this.ctrls.scrubber.value = 0;
        this.ctrls.playpause.onclick();
    };
    controls.appendChild(scrubber);
    // ----------
    //  Position
    // ----------
    var position = document.createElement("span");
    position.innerHTML = "00:00";
    controls.position = position;
    controls.appendChild(position);
    player.ontimeupdate = function () {
        this.ctrls.scrubber.value = this.currentTime;
        this.ctrls.position.innerHTML = formatNumber(this.currentTime);
    };

    player.parentNode.insertBefore(controls, player.nextSibling);
}
