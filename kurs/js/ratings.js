let player = JSON.parse(localStorage.getItem("curPlayInfo"));
let f = JSON.parse(localStorage.getItem("firstplace"));
let s = JSON.parse(localStorage.getItem("secondplace"));
let t = JSON.parse(localStorage.getItem("thirdplace"));

const curPlay = document.getElementById('cur');
let scoresum = 0;
    for (let i = 0; i<player.scores.length; i++){
        scoresum += Number(player.scores[i]);
    }
    
curPlay.innerHTML = `${player.name} &nbsp&nbsp&nbsp  ${scoresum}`;

const firstpl = document.getElementById('first');
const secondpl = document.getElementById('second');
const thirdpl = document.getElementById('third');

firstpl.innerHTML = `<nobr>${f.name} &nbsp&nbsp&nbsp ${f.score}</nobr>`;
secondpl.innerHTML = `<nobr>${s.name} &nbsp&nbsp&nbsp ${s.score}</nobr>`;
thirdpl.innerHTML = `<nobr>${t.name} &nbsp&nbsp&nbsp ${t.score}</nobr>`;

//localStorage.clear();