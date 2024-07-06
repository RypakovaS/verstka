/////////////////////////////////////////////////////
const hint = document.getElementById('hint');
const win = document.getElementById('win');
const win1 = document.getElementById('win1');
const helps = document.getElementById('helps');
const lose = document.getElementById('lose');
const exit = document.getElementById('exit');
const sun = document.getElementById('sun');
let player = JSON.parse(localStorage.getItem("curPlayInfo"));
//let rat = document.getElementById("RATING");
let RATING_1 = 30;
// количество попыток
const NUMBER_OF_GUESSES_1 = 6;
// сколько попыток осталось
let guessesRemaining = NUMBER_OF_GUESSES_1;
// текущая попытка
let currentGuess = [];
// следующая буква
let nextLetter = 0;
let check = 0;
// загаданное слово
let mass = [["о","п","е","р","а"],
            ["п","и","р","а","т"],
            ["в","р","е","м","я"],
            ["ц","а","п","л","я"]];
let type = getRandomInt(4);
let rightGuessString = mass[type][0]+mass[type][1]+mass[type][2]+mass[type][3]+mass[type][4];


// создаём игровое поле
function initBoard() {
    // получаем доступ к блоку на странице
    let board = document.getElementById("game-board");

    // создаём строки
    // делаем цикл от 1 до 6, потому что попыток у нас как раз 6
    for (let i = 0; i < NUMBER_OF_GUESSES_1; i++) {
        // создаём новый блок на странице
        let row = document.createElement("div")
        // добавляем к нему класс, чтобы потом работать со строками напрямую
        row.className = "letter-row"

        // создаём отдельные клетки
        // добавляем по 5 клеток в ряд
        for (let j = 0; j < 5; j++) {
            // создаём новый блок на странице
            let box = document.createElement("div")
            // добавляем к нему класс
            box.className = "letter-box"
            // вкладываем новый блок внутрь блока со строкой
            row.appendChild(box)
        }
        // как все 5 клеток готовы, добавляем новую строку на поле
        board.appendChild(row)
    }
    start();
}

function start() {
    helps.classList.remove('hidden');
    exit.classList.remove('hidden');
    var start_time = new Date();
    // получаем время окончания таймера
    var stop_time = start_time.setMinutes(start_time.getMinutes() + 7);
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
            if (check ===0) lose_level_time();
        }
    }, 1000);
}

// удаление символа
function deleteLetter () {
    // получаем доступ к текущей строке
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    // и к последнему введённому символу
    let box = row.children[nextLetter - 1]
    // очищаем содержимое клетки
    box.textContent = ""
    // убираем жирную обводку
    box.classList.remove("filled-box")
    // удаляем последний символ из массива с нашей текущей догадкой
    currentGuess.pop()
    // помечаем, что у нас теперь на одну свободную клетку больше
    nextLetter -= 1
}

// проверка введённого слова
function checkGuess () {
    // получаем доступ к текущей строке
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    // переменная, где будет наша догадка
    let guessString = ''
    // делаем из загаданного слова массив символов
    let rightGuess =  [mass[type][0],mass[type][1],mass[type][2],mass[type][3],mass[type][4]];

    // собираем все введённые в строке буквы в одно слово
    for (const val of currentGuess) {
        guessString += val
    }

    // если в догадке меньше 5 букв — выводим уведомление, что букв не хватает
    if (guessString.length != 5) {
        // error означает, что уведомление будет в формате ошибки
        //alert("Введены не все буквы!");
        not_all_letter();
        // и после вывода выходим из проверки догадки
        return;
    }

    // перебираем все буквы в строке, чтобы подсветить их нужным цветом
    for (let i = 0; i < 5; i++) {
        // убираем текущий цвет, если он был
        let letterColor = ''
        // получаем доступ к текущей клетке
        let box = row.children[i]
        // и к текущей букве в догадке
        let letter = currentGuess[i]

        // смотрим, на каком месте в исходном слове стоит текущая буква
        let letterPosition = rightGuess.indexOf(currentGuess[i])
        // если такой буквы нет в исходном слове
        if (letterPosition === -1) {
            // закрашиваем клетку серым
            letterColor = 'grey'
            // иначе, когда мы точно знаем, что буква в слове есть
        } else {
            // если позиция в слове совпадает с текущей позицией
            if (currentGuess[i] === rightGuess[i]) {
                // закрашиваем клетку зелёным
                letterColor = 'green'
            } else {
                // в противном случае закрашиваем жёлтым
                letterColor = 'yellow'
            }

            // заменяем обработанный символ на знак решётки, чтобы не использовать его на следующем шаге цикла
            rightGuess[letterPosition] = "#"
        }

        // применяем выбранный цвет к фону клетки
        box.style.backgroundColor = letterColor;
    }

    // если мы угадали
    if (guessString === rightGuessString) {
        // выводим сообщение об успехе
        //alert("Вы выиграли!");
        //score_rating = RATING_1;
        win_level();

        // обнуляем количество попыток
        guessesRemaining = 0;
        // выходим из проверки
        return
        // в противном случае
    } else {
        // уменьшаем счётчик попыток
        guessesRemaining -= 1;
        // обнуляем массив с символами текущей попытки
        currentGuess = [];
        // начинаем отсчёт букв заново
        nextLetter = 0;
        RATING_1 -= 4
        if((RATING_1<=0)||(guessesRemaining === 0)) lose_level_rating();
        // если попытки закончились
        /*if (guessesRemaining === 0) {
            // выводим сообщение о проигрыше
            alert("У вас не осталось попыток. Вы проиграли!");
            // и выводим загаданное слово
            alert(`Загаданное слово: "${rightGuessString}"`)
        }*/
    }
}

// выводим букву в клетку
function insertLetter (pressedKey) {
    // если клетки закончились
    if (nextLetter === 5) {
        // выходим из функции
        return;
    }
    // получаем доступ к текущей строке
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    // и к текущей клетке, где будет появляться буква
    let box = row.children[nextLetter]
    // меняем текст в блоке с клеткой на нажатый символ
    box.textContent = pressedKey
    // добавляем к клетке жирную обводку
    box.classList.add("filled-box")
    // добавляем введённый символ к массиву, в которой хранится наша текущая попытка угадать слово
    currentGuess.push(pressedKey)
    // помечаем, что дальше будем работать со следующей клеткой
    nextLetter += 1
}

// обработчик нажатия на клавиши
document.addEventListener("keydown", (e) => {

    // если попыток не осталось
    if (guessesRemaining === 0) {
        // выходим из функции
        return
    }

    // получаем код нажатой клавиши
    let pressedKey = String(e.key)
    // если нажат Backspace и в строке есть хоть один символ
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        // то удаляем последнюю введённую букву
        deleteLetter();
        // и выходим из обработчика
        return;
    }

    // если нажат Enter
    if (pressedKey === "Enter") {
        // проверяем введённое слово
        checkGuess();
        // и выходим из обработчика
        return;
    }

    // проверяем, есть ли введённый символ в английском алфавите
    let found = pressedKey.match(/[а-я]/gi)
    // если нет
    if (!found || found.length > 1) {
        // то выходим из обработчика
        return
        // иначе добавляем введённую букву в новую клетку
    } else {
        insertLetter(pressedKey)
    }
})


initBoard();
function getRandomInt(max) {
    return Math.ceil(Math.random() * max);
}

//const hint = document.getElementById('hint');
//const win = document.getElementById('win');
//const win1 = document.getElementById('win1');

function uppearhint() {
    hint.classList.remove('hidden');
    //if(level==1){
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
    //}
    //usehint++;

    setTimeout(function disuppear() {
        hint.classList.add('hidden');
    }, 3000);
}


function win_level() {
    check = 1;
    win1.innerHTML = 'Поздравляю, ты справился! <br> Ты набрал ' + RATING_1 + ' баллов';
    //let rat = document.getElementById("RATING");
    //rat.innerHTML = RATING_1;
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

    if ((f.score)&&(scoresum > f.score)){
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
    else if (!f.score){
        f.name = player.name;
        f.score = scoresum;
        localStorage.setItem("firstplace", JSON.stringify(f));
    }
    else if ((s.score)&&(scoresum > s.score)){
        t.name = s.name;
        t.score = s.score;
        s.name = player.name;
        s.score = scoresum;
        localStorage.setItem("secondplace", JSON.stringify(s));
        localStorage.setItem("thirdplace", JSON.stringify(t));
    }
    else if (!s.score){
        s.name = player.name;
        s.score = scoresum;
        localStorage.setItem("firstplace", JSON.stringify(s));
    }
    else if ((s.score)&&(scoresum > t.score)){
        t.name = player.name;
        t.score = scoresum;
        localStorage.setItem("thirdplace", JSON.stringify(t));
    }
    else if (!t.score){
        t.name = player.name;
        t.score = scoresum;
        localStorage.setItem("firstplace", JSON.stringify(t));
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

function not_all_letter() {
    hint.classList.remove('hidden');
    hint.innerHTML = 'Введены не все буквы!';

    setTimeout(function disuppear() {
        hint.classList.add('hidden');
    }, 3000);
}



