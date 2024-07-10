let player = JSON.parse(localStorage.getItem("curPlayInfo"));
const lev1 = document.getElementById('lev1');
const lev2 = document.getElementById('lev2');
const lev3 = document.getElementById('lev3');

const LevMass = [lev1, lev2, lev3];

for (let i=0; i<player.scores.length; i++){
    if (player.scores[i] === 0){
        for (let j = i+1; j<player.scores.length; j++){
            LevMass[j].classList.add("hidden");
        }
        LevMass[i].classList.remove("fin");
        LevMass[i].classList.add("not-fin");
    }
    else {
        LevMass[i].classList.add("fin");
    }
}

const hitext = document.getElementById('hello-name');
hitext.innerHTML = `${player.name}, добро пожаловать в игру!`;


