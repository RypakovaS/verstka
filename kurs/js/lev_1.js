const lev = document.getElementById('num_level');
num_level = lev.dataset.info;
let player = JSON.parse(localStorage.getItem("curPlayInfo"));
let RATING = 0;
if (num_level === "1") RATING = 15;
else RATING = 20;
let check = 0;
const piecesContainer = document.getElementById('pieces');
//const dropZonesContainer = document.getElementById('word');
const dropZone = document.getElementById('word');
let mass;
let wrong_mass;
let count =0;
let type =0;
let wrong_type =0;
let rightGuessString = "";
let pieces;
let t =0;
if (num_level === "1") {
    mass = [["инд", "уль", "ген", "ция"],
        ["абб", "рев", "иат", "ура"],
        ["еди", "ноб", "орс", "тво"],
        ["лак", "они", "чно", "сть"]];
    wrong_mass = [["куц", "сма", "опе", "фор"],
        ["гет", "сву", "вьк", "заи"],
        ["дем", "вик", "чау", "мик"],
        ["етв", "идм", "умн", "спу"]];
    count = 4;
    t = 3;
    type = getRandomInt(4);
    wrong_type = getRandomInt(4);
    rightGuessString = mass[type][0]+mass[type][1]+mass[type][2]+mass[type][3];
    pieces = [mass[type][0], mass[type][2], wrong_mass[wrong_type][0], mass[type][3], wrong_mass[wrong_type][1], mass[type][1], wrong_mass[wrong_type][2], wrong_mass[wrong_type][3]];

}
else {
    let mass = [["еж", "ед", "не", "вн", "ик"],
        ["са", "мо", "ан", "ал", "из"],
        ["за", "ве", "рш", "ен", "ие"],
        ["ра", "ди", "ов", "ол", "на"]];
    let wrong_mass = [["пв", "фы", "нк"],
        ["гт", "ен", "дь"],
        ["де", "вк", "ча"],
        ["ет", "им", "ум"]];
    count = 5;
    t=5;
    type = getRandomInt(4);
    wrong_type = getRandomInt(4);
    rightGuessString = mass[type][0]+mass[type][1]+mass[type][2]+mass[type][3]+mass[type][4];
    pieces = [mass[type][0], mass[type][2], wrong_mass[wrong_type][0], mass[type][3], wrong_mass[wrong_type][1], mass[type][1], wrong_mass[wrong_type][2], mass[type][4]];

}


function compareRandom(a, b) {
    return Math.random() - 0.5;
}

pieces.sort(compareRandom);


function initBoard() {
    piecesContainer.classList.remove('hidden');
    pieces.forEach(piece => {
        const div = document.createElement('div');
        if (num_level === "1") div.classList.add('piece');
        else div.classList.add('piece1');
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
        setTimeout(win_level, 500);
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
    helps.classList.remove('hidden');
    exit.classList.remove('hidden');
    var start_time = new Date();
    // получаем время окончания таймера
    var stop_time = start_time.setMinutes(start_time.getMinutes() + t);
    // запускаем ежесекундный отсчёт
    var countdown = setInterval(function() {
        // текущее время
        var now = new Date().getTime();
        // сколько времени осталось до конца таймера
        var remain = stop_time - now;
        // переводим миллисекунды в минуты и секунды
        var min = Math.floor( (remain % (1000 * 60 * 60)) / (1000 * 60) );
        var sec = Math.floor( (remain % (1000 * 60)) / 1000 );
        // если значение текущей секунды меньше 10, добавляем вначале ведущий ноль
        sec = sec < 10 ? "0" + sec : sec;
        // отправляем значение таймера на страницу в нужный раздел
        document.getElementById("countdown").innerHTML = min + ":" + sec;
        if (check ===1) clearInterval(countdown);
        if (remain < 30 * 1000) {
            document.getElementById("countdown").style.cssText = 'color: red';
        }
        // если время вышло
        if (remain < 0) {
            // останавливаем отсчёт
            clearInterval(countdown);
            // пишем текст вместо цифр
            //document.getElementById("countdown").innerHTML = "Время вышло!";
            if (check ===0) lose_level_time();
        }
    }, 500);
}


initBoard();
function getRandomInt(max) {
    return Math.ceil(Math.random() * max);
}

function uppearhint2() {
    hint.classList.remove('hidden');
    if(num_level==="1") {
        if (type === 0) {
            hint.innerHTML = 'Специальная грамота, которая освобождала любого человека от грехов';
        } else if (type === 1) {
            hint.innerHTML = 'Слово, образованное сокращением слова или словосочетания и читаемое по алфавитному названию начальных букв';
        } else if (type === 2) {
            hint.innerHTML = 'Контактный вид спорта, который обычно предполагает поединки один на один';
        } else if (type === 3) {
            hint.innerHTML = 'Краткое и ясное выражение мыслей';
        }
        RATING -= 2;
    }
   else {
        if (type === 0) {
            hint.innerHTML = 'Специально расчерченный блокнот для деловых ежедневных записей';
        } else if (type === 1) {
            hint.innerHTML = 'Анализ, оценка своих собственных поступков и переживаний';
        }
        else if (type === 2) {
            hint.innerHTML = 'Полное окончание';
        } else if (type === 3) {
            hint.innerHTML = 'Распространяющееся в пространстве переменное электромагнитное поле';
        }
        RATING -= 3;
    }
    if(RATING<=0) lose_level_rating();
    setTimeout(function disuppear() {
        hint.classList.add('hidden');
    }, 5000);
}


function win_level() {
    check = 1;
    win1.innerHTML = 'Поздравляю, ты справился! <br> Ты набрал ' + RATING + ' баллов';
    //let rat = document.getElementById("RATING");
    //rat.innerHTML = RATING_1;
    win.classList.remove('hidden');
    win1.classList.remove('hidden');
    helps.classList.add('hidden');
    exit.classList.add('hidden');
    sun.classList.remove('hidden');
    piecesContainer.classList.add('hidden');
    player.scores[num_level-1] = RATING;
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




