/////////////////////////////////////////////////////
const hint = document.getElementById('hint');
const win = document.getElementById('win');
const win1 = document.getElementById('win1');
const helps = document.getElementById('helps');
const lose = document.getElementById('lose');
const exit = document.getElementById('exit');
const sun = document.getElementById('sun');
let player = JSON.parse(localStorage.getItem("curPlayInfo"));
let RATING_1 = 30;
const NUMBER_OF_GUESSES_1 = 6;
let guessesRemaining = NUMBER_OF_GUESSES_1;
let currentGuess = [];
let nextLetter = 0;
let type =0;
let type1 = 4;
let check = 0;
let number_word = 0;
let mass = [["о","п","е","р","а"],
            ["п","и","р","а","т"],
            ["в","р","е","м","я"],
            ["ц","а","п","л","я"]];
type = getRandomInt(4)-1;
let rightGuessString = mass[type][0]+mass[type][1]+mass[type][2]+mass[type][3]+mass[type][4];


function initBoard() {
    let board = document.getElementById("game-board");
    for (let i = 0; i < NUMBER_OF_GUESSES_1; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"

        for (let j = 0; j < 5; j++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            row.appendChild(box)
        }
        board.appendChild(row)
    }
    start();
}

function start() {
    number_word++;
    helps.classList.remove('hidden');
    exit.classList.remove('hidden');
    var start_time = new Date();
    var stop_time = start_time.setMinutes(start_time.getMinutes() + 7);
    var countdown = setInterval(function() {
        var now = new Date().getTime();
        var remain = stop_time - now;
        var min = Math.floor( (remain % (1000 * 60 * 60)) / (1000 * 60) );
        var sec = Math.floor( (remain % (1000 * 60)) / 1000 );
        sec = sec < 10 ? "0" + sec : sec;
        document.getElementById("countdown").innerHTML = min + ":" + sec;
        if (check ===1) clearInterval(countdown);
        if (remain < 30 * 1000) {
            document.getElementById("countdown").style.cssText = 'color: red';
        }
        if (remain < 0) {
            clearInterval(countdown);
            document.getElementById("countdown").innerHTML = "Время вышло!";
            if (check ===0) lose_level_time();
        }
    }, 1000);
}

function restart() {

    guessesRemaining = NUMBER_OF_GUESSES_1;
    let board = document.getElementById("game-board");
    for (let i = NUMBER_OF_GUESSES_1; i > 0; i--) {
        let row = board.childNodes[i-1];
        try {board.removeChild(row);} catch {};
    }
    number_word++;
    for (let i = 0; i < NUMBER_OF_GUESSES_1; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"

        for (let j = 0; j < 5; j++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            row.appendChild(box)
        }
        board.appendChild(row)
    }
    let tmp;
    do{
        tmp = getRandomInt(4)-1;
    } while (tmp===type || tmp===type1)
    type1 = type;
    type = tmp;
    rightGuessString = mass[type][0]+mass[type][1]+mass[type][2]+mass[type][3]+mass[type][4];
}

function deleteLetter () {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
    let box = row.children[nextLetter - 1];
    box.textContent = "";
    box.classList.remove("filled-box");
    currentGuess.pop();
    nextLetter -= 1;
}

function checkGuess () {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
    let guessString = '';
    let rightGuess =  [mass[type][0],mass[type][1],mass[type][2],mass[type][3],mass[type][4]];

    for (const val of currentGuess) {
        guessString += val;
    }

    if (guessString.length != 5) {
        not_all_letter();
        return;
    }

    for (let i = 0; i < 5; i++) {
        let letterColor = '';
        let box = row.children[i];
        let letter = currentGuess[i];


        let letterPosition = rightGuess.indexOf(currentGuess[i]);
        if (letterPosition === -1) {
            letterColor = 'grey';
        } else {
            if (currentGuess[i] === rightGuess[i]) {
                letterColor = 'green';
            } else {
                letterColor = 'yellow';
            }

            rightGuess[letterPosition] = "#";
        }

        box.style.backgroundColor = letterColor;
    }

    if (guessString === rightGuessString) {
        if (number_word === 3) {
            setTimeout(win_level, 500);
        }
        else {
            guessesRemaining = NUMBER_OF_GUESSES_1;
            nextLetter = 0;
            currentGuess = [];
            setTimeout(restart, 500);
        }
        guessesRemaining = 0;
        return
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;
        RATING_1 -= 4
        if((RATING_1<=0)||(guessesRemaining === 0)) lose_level_rating();
    }
}

function insertLetter (pressedKey) {
    if (nextLetter === 5) {
        return;
    }
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let box = row.children[nextLetter]
    box.textContent = pressedKey
    box.classList.add("filled-box")
    currentGuess.push(pressedKey)
    nextLetter += 1
}

document.addEventListener("keydown", (e) => {
    if (guessesRemaining === 0) {
        return
    }
    let pressedKey = String(e.key)
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter();
        return;
    }
    if (pressedKey === "Enter") {
        checkGuess();
        return;
    }
    let found = pressedKey.match(/[а-я]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
    }
})

initBoard();
function getRandomInt(max) {
    return Math.ceil(Math.random() * max);
}

function uppearhint() {
    hint.classList.remove('hidden');
    if (type === 0) {
        hint.innerHTML = 'Музыкально-театральный жанр';
    } else if (type === 1) {
        hint.innerHTML = '\"Профессия Джека Воробья\"';
    } else if (type === 2) {
        hint.innerHTML = 'Один из вариантов названия картины "Постоянство памяти" Сальвадора Дали';
    } else if (type === 3) {
        hint.innerHTML = 'Птица с длинным клювом';
    }
    RATING_1 -=2;

    setTimeout(function disuppear() {
        hint.classList.add('hidden');
    }, 3000);
}


function win_level() {
    check = 1;
    win1.innerHTML = 'Поздравляю, ты справился! <br> Ты набрал ' + RATING_1 + ' баллов';
    win.classList.remove('hidden');
    win1.classList.remove('hidden');
    helps.classList.add('hidden');
    sun.classList.remove('hidden');
    exit.classList.add('hidden');
    player.scores[2] = RATING_1;
    localStorage.setItem("curPlayInfo", JSON.stringify(player));
    player = JSON.parse(localStorage.getItem("curPlayInfo"));

    let f = JSON.parse(localStorage.getItem("firstplace"));
    let s = JSON.parse(localStorage.getItem("secondplace"));
    let t = JSON.parse(localStorage.getItem("thirdplace"));

    let scoresum = 0;
    for (let i = 0; i<player.scores.length; i++){
        scoresum += Number(player.scores[i]);
    }

    if (((scoresum > f.score)&&(player.name!= f.name))||(f===null)){
        try {
            t.name = s.name;
            t.score = s.score;
            localStorage.setItem("thirdplace", JSON.stringify(t));
        }
        catch {
            if(s != null) {
                const player = {
                    name: s.name,
                    score: s.score,
                };
                localStorage.setItem("thirdplace", JSON.stringify(player));
            }
        }
        try {
            s.name = f.name;
            s.score = f.score;
            localStorage.setItem("secondplace", JSON.stringify(s));
        }
        catch {
            if(f != null) {
                const player = {
                    name: f.name,
                    score: f.score,
                };
                localStorage.setItem("secondplace", JSON.stringify(player));
            }
        }
        try {
            f.name = player.name;
            f.score = scoresum;
            localStorage.setItem("firstplace", JSON.stringify(f));
        }
        catch {
            if (f === null) {
                const player = {
                    name: player.name,
                    score: scoresum,
                };
                localStorage.setItem("firstplace", JSON.stringify(player));
            }
        }
    }

    else if (((scoresum > s.score)&&(player.name!= s.name)||(s===null))){
        try {
            t.name = s.name;
            t.score = s.score;
            localStorage.setItem("thirdplace", JSON.stringify(t));
        }
        catch {
            if(s != null) {
                const player = {
                    name: s.name,
                    score: s.score,
                };
                localStorage.setItem("thirdplace", JSON.stringify(player));
            }
        }
        try {
            s.name = player.name;
            s.score = scoresum;
            localStorage.setItem("secondplace", JSON.stringify(s));
        }
        catch {
            if (s === null) {
                const player = {
                    name: player.name,
                    score: scoresum,
                };
                localStorage.setItem("secondplace", JSON.stringify(player));
            }
        }
    }
    else if (((scoresum > t.score)&&(player.name!= t.name)||(t===null))){
        try {
            t.name = player.name;
            t.score = scoresum;
            localStorage.setItem("thirdplace", JSON.stringify(t));
        }
        catch {
            if (t === null) {
                const player = {
                    name: player.name,
                    score: scoresum,
                };
                localStorage.setItem("thirdplace", JSON.stringify(player));
            }
        }
    }
}

function lose_level_rating() {
    check = 1;
    win1.classList.remove('hidden');
    win1.innerHTML = 'Упс, слишком много попыток <br> Попробуй еще раз';
    lose.classList.remove('hidden');
    helps.classList.add('hidden');
    exit.classList.add('hidden');
}

function lose_level_time() {
    win1.classList.remove('hidden');
    win1.innerHTML = 'Упс, время закончилось <br> Попробуй еще раз';
    lose.classList.remove('hidden');
    helps.classList.add('hidden');
    exit.classList.add('hidden');
}

function not_all_letter() {
    hint.classList.remove('hidden');
    hint.innerHTML = 'Введены не все буквы!';

    setTimeout(function disuppear() {
        hint.classList.add('hidden');
    }, 3000);
}



