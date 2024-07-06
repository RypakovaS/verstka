const CountDownEl = document.getElementById('countdown');
let CountDown=60;

setInterval(timer, 1000);

function timer() {
    const minutes = Math.floor(CountDown / 60);
    let seconds = CountDown % 60;
    if (seconds < 10){
        seconds = "0" + seconds;
    }
    if (CountDown > 0){
    CountDownEl.innerHTML = `${minutes}:${seconds}`;
    let mes1 = document.getElementById('exit_message');
    let mes2 = document.getElementById('win_message');
    if (mes1.classList.contains("hidden") && mes2.classList.contains("hidden")){
        CountDown--;
    }
    }
    else {
        CountDownEl.innerHTML = '00:00';
    }
    if (CountDown<=0){
        setTimeout(function stop(){
            lose();
        },1000);
        
    }
}

function lose(){
    gameArea.style.filter="blur(3px)";
    let message = document.getElementById('lose_message');
    if (message.classList.contains("message") != true){
        message.classList.add("message");
        message.classList.remove("hidden");
    }
}