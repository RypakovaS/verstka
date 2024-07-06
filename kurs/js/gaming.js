
const stepsCount = document.getElementById('countsteps');

let steps = 0;
let usehint = 0;
let score = 0;

area1.ondragover = allowDrop;
area2.ondragover = allowDrop;
area3.ondragover = allowDrop;

testTubeB.ondragstart = drag;
testTubeM.ondragstart = drag;
testTubeS.ondragstart = drag;

area1.ondrop = startpour;
area2.ondrop = startpour;
area3.ondrop = startpour;

function drag(e) {
    e.dataTransfer.setData('id', e.target.id);
}

function allowDrop(e) {
    e.preventDefault();
}

function startpour(e) {
    let tubeFromId = e.dataTransfer.getData('id');
    let potFromId = document.getElementById(tubeFromId).children[0].id;
    let areaToID = e.target.id;
    let tubeToID, potToID;
    if (areaToID[0] == 't') {
        tubeToID = document.getElementById(areaToID).children[0].id;
        potToID = document.getElementById(tubeToID).children[0].id;
    }
    else if (areaToID[0] == 'p') {
        tubeToID = document.getElementById(areaToID).parentNode.id;
        potToID = areaToID;
    }
    else {
        tubeToID = areaToID;
        potToID = document.getElementById(tubeToID).children[0].id;
    }

    let tubeFrom = document.getElementById(tubeFromId);
    let potFrom = document.getElementById(potFromId);
    let tubeTo = document.getElementById(tubeToID);
    let potTo = document.getElementById(potToID);

    if (tubeFrom.id == tubeTo.id){
        return;
    }

    let marR = (-1) * (getCoords(tubeTo).right - getCoords(tubeFrom).right);
    let ind = Math.trunc(marR / 100);
    if (ind == 1) { marR = 280; }
    if (ind == -1) { marR = -230; }
    if (ind == 3) { marR = 680; }
    if (ind == -3) { marR = -630; }
    let marT = getCoords(tubeTo).top - getCoords(tubeFrom).top;
    if (marT < 0) { marT = Math.abs(marT) + 50; }

    let numTubeFrom, numTubeTo;
    for (let i = 0; i < 3; i++) {
        if (TubesMas[i][0] == tubeFrom) {
            numTubeFrom = i;
        }
        if (TubesMas[i][0] == tubeTo) {
            numTubeTo = i;
        }
    }

    let countFrom = TubesMas[numTubeFrom][4];
    let countTo = TubesMas[numTubeTo][4];

    let numPour;
    if (TubesMas[numTubeFrom][1] - (TubesMas[numTubeTo][2] - TubesMas[numTubeTo][1]) >= 0) {
        numPour = TubesMas[numTubeTo][2] - TubesMas[numTubeTo][1];
    }
    else {
        numPour = TubesMas[numTubeFrom][1];
    }

    if (numPour > 0) {
        steps++;
        stepsCount.innerHTML = steps;
    }

    setTimeout(function Tow() {
        let start = Date.now();
        let timer = setInterval(function () {
            let timePassed = Date.now() - start;
            if (timePassed >= 1000) {
                clearInterval(timer);
                return;
            }
            tubeFrom.style.marginRight = (timePassed / 1000) * (marR) + 'px';
        }, 10);

        start = Date.now();
        timer = setInterval(function () {
            let timePassed = Date.now() - start;
            if (timePassed >= 1000) {
                clearInterval(timer);
                return;
            }
            tubeFrom.style.marginBottom = (timePassed / 1000) * marT + 'px';
        }, 10);

        start = Date.now();
        timer = setInterval(function () {
            let timePassed = Date.now() - start;
            if (timePassed >= 1000) {
                clearInterval(timer);
                return;
            }
            if (ind > 0) { tubeFrom.style.transform = 'rotate(' + (-1) * timePassed / 30 + 'deg)'; }
            if (ind < 0) { tubeFrom.style.transform = 'rotate(' + timePassed / 30 + 'deg)'; }
        }, 10);

        let drawDown = numPour * TubesMas[numTubeFrom][3];
        let drawUp = numPour * TubesMas[numTubeTo][3];
        let numPotFrom = window.getComputedStyle(potFrom, null).getPropertyValue("margin-top");
        let numPotTo = window.getComputedStyle(potTo, null).getPropertyValue("margin-top");
        numPotFrom = Number(numPotFrom.slice(0, numPotFrom.length - 2));
        numPotTo = Number(numPotTo.slice(0, numPotTo.length - 2));

        start = Date.now();
        timer = setInterval(function () {
            let timePassed = Date.now() - start;
            if (timePassed >= 1000) {
                clearInterval(timer);
                return;
            }
            potFrom.style.marginTop = numPotFrom + (timePassed / 1000) * drawDown + 'px';
        }, 10);

        start = Date.now();
        timer = setInterval(function () {
            let timePassed = Date.now() - start;
            if (timePassed >= 1000) {
                clearInterval(timer);
                return;
            }
            potTo.style.marginTop = numPotTo - (timePassed / 1000) * drawUp + 'px';
        }, 10);
    }, 0);


    setTimeout(function back() {
        let start = Date.now();
        let timer = setInterval(function () {
            let timePassed = Date.now() - start;
            if (timePassed >= 1000) {
                clearInterval(timer);
                return;
            }
            let newmarR = marR - (timePassed / 1000) * marR;
            tubeFrom.style.marginRight = newmarR + 'px';
        }, 10);

        start = Date.now();
        timer = setInterval(function () {
            let timePassed = Date.now() - start;
            if (timePassed >= 1000) {
                clearInterval(timer);
                return;
            }
            let newmarT = marT - (timePassed / 1000) * marT;
            tubeFrom.style.marginBottom = newmarT + 'px';
        }, 10);

        let degs = tubeFrom.style.transform;
        let len = degs.length;
        degs = Number(degs.slice(7, len - 4));
        let newdegs = 0;

        start = Date.now();
        timer = setInterval(function () {
            let timePassed = Date.now() - start;
            if (timePassed >= 1000) {
                clearInterval(timer);
                return;
            }
            if (ind > 0) {
                newdegs = degs - (timePassed / 1000) * degs;
                tubeFrom.style.transform = 'rotate(' + newdegs + 'deg)';
            }
            if (ind < 0) {
                newdegs = degs - (timePassed / 1000) * degs;
                tubeFrom.style.transform = 'rotate(' + newdegs + 'deg)';
            }
        }, 10);
    }, 1500);

    TubesMas[numTubeFrom][1] -= numPour;
    TubesMas[numTubeTo][1] += numPour;

    countFrom.innerHTML = `${TubesMas[numTubeFrom][1]} / ${TubesMas[numTubeFrom][2]}`;
    countTo.innerHTML = `${TubesMas[numTubeTo][1]} / ${TubesMas[numTubeTo][2]}`;

    if (level == 1) {
        if (type == 1 && TubesMas[1][1] == 5){
            finishlevel();
        }
        if (type == 2 && (TubesMas[0][1] == 4 || TubesMas[1][1] == 4)){
            finishlevel();
        }
    }
    if (level == 2 ) {
        if (type == 1 && TubesMas[1][1] == 6 && TubesMas[0][1] == 6) {
            finishlevel();
        }
        if (type == 2 && TubesMas[1][1] == 6 && TubesMas[0][1] == 6) {
            finishlevel();
        }
    }
}


function getCoords(elem) {
    let box = elem.getBoundingClientRect();
    return {
        top: box.top + window.pageYOffset,
        right: box.right + window.pageXOffset,
        bottom: box.bottom + window.pageYOffset,
        left: box.left + window.pageXOffset
    };
}


// -------------------------

function finishlevel() {
    score = 75;

    if ((level == 1 && steps <= 8) || (level == 2 && steps <= 12)) { score += 25; }
    score -= 5 * usehint;

    gameArea.style.filter = "blur(3px)";
    let message = document.getElementById('win_message');
    if (message.classList.contains("message") != true) {
        message.classList.add("message");
        message.classList.remove("hidden");
    }

    let starsarea = document.getElementById('stars');

    if (score >= 0 && score <= 18) {
        starsarea.innerHTML = '<i class="fa-solid fa-star-half"></i>';
    }
    else if (score <= 36) {
        starsarea.innerHTML = '<i class="fa-solid fa-star"></i>';
    }
    else if (score <= 54) {
        starsarea.innerHTML = '<i class="fa-solid fa-star"></i><i class="fa-solid fa-star-half"></i>';
    }
    else if (score <= 72) {
        starsarea.innerHTML = '<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>';
    }
    else if (score <= 90) {
        starsarea.innerHTML = '<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star-half"></i>'
    }
    else {
        starsarea.innerHTML = '<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>';
    }

    let showscore = document.getElementById('score');
    showscore.innerHTML = score;

    let player = JSON.parse(localStorage.getItem("curPlayInfo"));
    player.scores[level-1] = score;
    localStorage.setItem("curPlayInfo", JSON.stringify(player)); 
    player = JSON.parse(localStorage.getItem("curPlayInfo"));

    let f = JSON.parse(localStorage.getItem("firstplace"));
    let s = JSON.parse(localStorage.getItem("secondplace"));
    let t = JSON.parse(localStorage.getItem("thirdplace"));

    let scoresum = 0;
    for (let i = 0; i<player.scores.length; i++){
        scoresum += Number(player.scores[i]);
    }

    if (scoresum > f.score){
        t.name = s.name;
        t.score = s.score;
        s.name = f.name;
        s.score = f.score;
        f.name = player.name;
        f.score = scoresum;
        localStorage.setItem("firstplace", JSON.stringify(f)); 
        localStorage.setItem("secondplace", JSON.stringify(s)); 
        localStorage.setItem("thirdplace", JSON.stringify(t)); 
    }
    else if (scoresum > s.score){
        t.name = s.name;
        t.score = s.score;
        s.name = player.name;
        s.score = scoresum;
        localStorage.setItem("secondplace", JSON.stringify(s));
        localStorage.setItem("thirdplace", JSON.stringify(t)); 
    }
    else if (scoresum > t.score){
        t.name = player.name;
        t.score = scoresum;
        localStorage.setItem("thirdplace", JSON.stringify(t)); 
    }
    
}

function exit() {
    let mess1 = document.getElementById('lose_message');
    let mess2 = document.getElementById('win_message');
    if (mess1.classList.contains("hidden") && mess2.classList.contains("hidden")) {
        gameArea.style.filter = "blur(3px)";
        let message = document.getElementById('exit_message');
        if (message.classList.contains("message") != true) {
            message.classList.add("message");
            message.classList.remove("hidden");
        }
    }
}

function contin() {
    let message = document.getElementById('exit_message');
    message.classList.add("message-out");
    gameArea.style.filter = "blur(0px)";
    setTimeout(function out() {
        message.classList.remove("message", "message-out");
        message.classList.add("hidden");
    }, 500);
}

