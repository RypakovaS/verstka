const lev = document.getElementById('num_level');
num_level = lev.dataset.info;
let player = JSON.parse(localStorage.getItem("curPlayInfo"));
let RATING = 0;
if (num_level === "1") RATING = 15;
else RATING = 20;
let check = 0;
const piecesContainer = document.getElementById('pieces');
let arrow1 = document.getElementById('arrow1');
let arrow2 = document.getElementById('arrow2');
let activepiece = null;
const dropZone = document.getElementById('word');
let mass;
let wrong_mass;
let count = 0;
let number_word = 0;
let type =0;
let type1 = 4;
let wrong_type =0;
let rightGuessString = "";
let pieces;
let t = 0;
mass = [["еж", "ед", "не", "вн", "ик"],
    ["са", "мо", "ан", "ал", "из"],
    ["за", "ве", "рш", "ен", "ие"],
    ["ра", "ди", "ов", "ол", "на"]];
wrong_mass = [["пв", "фы", "нк"],
    ["гт", "ен", "дь"],
    ["де", "вк", "ча"],
    ["ет", "им", "ум"]];
count = 5;
t=5;
type = getRandomInt(4)-1;
wrong_type = getRandomInt(4)-1;
rightGuessString = mass[type][0]+mass[type][1]+mass[type][2]+mass[type][3]+mass[type][4];
pieces = [mass[type][0], mass[type][2], wrong_mass[wrong_type][0], mass[type][3], wrong_mass[wrong_type][1], mass[type][1], wrong_mass[wrong_type][2], mass[type][4]];


function compareRandom(a, b) {
    return Math.random() - 0.5;
}

pieces.sort(compareRandom);


function initBoard() {
    piecesContainer.classList.remove('hidden');
    pieces.forEach(piece => {
        const div = document.createElement('div');
        div.classList.add('piece1');
        div.draggable = true;
        div.textContent = piece;
        div.id = piece;

        div.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text', event.target.id);
        });
        piecesContainer.appendChild(div);
    });

    start();
}
function restart() {
    number_word++;
    pieces.forEach(piece => {
        let name_id = piece;
        const div = document.getElementById(name_id);
        try {piecesContainer.removeChild(div);} catch {};
        try {dropZone.removeChild(div);} catch {};
    });
    document.getElementById("word").style.backgroundColor = 'white';
    let tmp;
    do{
        tmp = getRandomInt(4)-1;
    } while (tmp===type || tmp===type1)
    type1 = type;
    type = tmp;
    wrong_type = getRandomInt(4)-1;
    rightGuessString = mass[type][0]+mass[type][1]+mass[type][2]+mass[type][3]+mass[type][4];
    pieces = [mass[type][0], mass[type][2], wrong_mass[wrong_type][0], mass[type][3], wrong_mass[wrong_type][1], mass[type][1], wrong_mass[wrong_type][2], mass[type][4]];
    pieces.sort(compareRandom);
    pieces.forEach(piece => {
        const div = document.createElement('div');
        div.classList.add('piece1');
        div.draggable = true;
        div.textContent = piece;
        div.id = piece;

        div.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text', event.target.id);
        });
        piecesContainer.appendChild(div);
    });
}

dropZone.addEventListener('dragover', (event) => {
    event.preventDefault();
});
piecesContainer.addEventListener('dragover', (event) => {
    event.preventDefault();
});

dropZone.addEventListener('drop', (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    const piece = document.getElementById(data);
    if ((!dropZone.contains(piece))&&(dropZone.children.length<count)) {
        dropZone.appendChild(piece);
        activepiece = document.getElementById(data);
    }
    if (dropZone.children.length === count) {
        checkCombination();
    }
});

dropZone.addEventListener('click', (e) => {
    activepiece = document.getElementById(e.target.id);
});

arrow1.addEventListener('click', (event) => {
    event.preventDefault();
    let curElement = activepiece;
    let nextElement = curElement.nextElementSibling;
    if (nextElement) {
        dropZone.insertBefore(nextElement, curElement);
    }
    if (dropZone.children.length === count) {
        checkCombination();
    }
});

arrow2.addEventListener('click', (event) => {
    event.preventDefault();
    let curElement = activepiece;
    let prevElement = curElement.previousElementSibling;
    if (prevElement) {
        dropZone.insertBefore(curElement, prevElement);
    }
    if (dropZone.children.length === count) {
        checkCombination();
    }
});

piecesContainer.addEventListener('drop', (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    const piece = document.getElementById(data);
    piecesContainer.appendChild(piece);
    if (dropZone.children.length < count) {
        document.getElementById("word").style.backgroundColor = 'white';
    }
});

function checkCombination() {
    const order = Array.from(dropZone.children).map(child => child.id).join('');
    if (order === rightGuessString) {
        document.getElementById("word").style.backgroundColor = 'green';
        if (number_word === 3) {
            setTimeout(win_level, 500);
        }
        else {
            setTimeout(restart, 500);
        }
    } else {
        error_word();
    }
}

const hint = document.getElementById('hint');
const win = document.getElementById('win');
const win1 = document.getElementById('win1');
const helps = document.getElementById('helps');
const lose = document.getElementById('lose');
const exit = document.getElementById('exit');
const sun = document.getElementById('sun');

function start() {
    number_word++;
    type1 = type;
    helps.classList.remove('hidden');
    exit.classList.remove('hidden');
    var start_time = new Date();
    var stop_time = start_time.setMinutes(start_time.getMinutes() + t);
    var countdown = setInterval(function() {
        var now = new Date().getTime();
        var remain = stop_time - now;
        var min = Math.floor( (remain % (1000 * 60 * 60)) / (1000 * 60) );
        var sec = Math.floor( (remain % (1000 * 60)) / 1000 );
        sec = sec < 10 ? "0" + sec : sec;
        document.getElementById("countdown").innerHTML = min + ":" + sec;
        if (check === 1) clearInterval(countdown);
        if (remain < 30 * 1000) {
            document.getElementById("countdown").style.cssText = 'color: red';
        }
        if (remain < 0) {
            clearInterval(countdown);
            document.getElementById("countdown").innerHTML = "Время вышло!";
            if (check ===0) lose_level_time();
        }
    }, 500);
}


initBoard();
function getRandomInt(max) {
    return Math.ceil(Math.random() * max);
}

function uppearhint() {
    hint.classList.remove('hidden');
        if (type === 0) {
            hint.innerHTML = 'Специально расчерченный блокнот для деловых ежедневных записей';
        } else if (type === 1) {
            hint.innerHTML = 'Анализ, оценка своих собственных поступков и переживаний';
        } else if (type === 2) {
            hint.innerHTML = 'Полное окончание';
        } else if (type === 3) {
            hint.innerHTML = 'Распространяющееся в пространстве переменное электромагнитное поле';
        }
        RATING -= 3;
    if(RATING<=0) lose_level_rating();
    setTimeout(function disuppear() {
        hint.classList.add('hidden');
    }, 5000);
}


function win_level() {
    check = 1;
    win1.innerHTML = 'Поздравляю, ты справился! <br> Ты набрал ' + RATING + ' баллов';
    win.classList.remove('hidden');
    win1.classList.remove('hidden');
    helps.classList.add('hidden');
    exit.classList.add('hidden');
    sun.classList.remove('hidden');
    piecesContainer.classList.add('hidden');
    player.scores[num_level - 1] = RATING;
    localStorage.setItem("curPlayInfo", JSON.stringify(player));
}

function lose_level_time() {
    win1.classList.remove('hidden');
    win1.innerHTML = 'Упс, время закончилось <br> Попробуй еще раз';
    lose.classList.remove('hidden');
    helps.classList.add('hidden');
    exit.classList.add('hidden');
    piecesContainer.classList.add('hidden');
}

function lose_level_rating() {
    check = 1;
    win1.classList.remove('hidden');
    win1.innerHTML = 'Упс, слишком много попыток <br> Попробуй еще раз';
    lose.classList.remove('hidden');
    helps.classList.add('hidden');
    exit.classList.add('hidden');
    piecesContainer.classList.add('hidden');
}

function error_word() {
    document.getElementById("word").style.backgroundColor = 'red';
    if (num_level === "1") RATING -=2;
    else RATING -=3;
    if(RATING<=0) lose_level_rating();
}