const playbutton = document.getElementById('play-button');

playbutton.onclick = function () {
    
    let username = document.getElementById('username-input').value;
    
    if (username == ""){
        username = "Аноним";
    }
    

    localStorage.removeItem('curPlayInfo');

    const currentplayer = {
        name: username,
        scores: [0, 0, 0],
    };

    localStorage.setItem("curPlayInfo", JSON.stringify(currentplayer));  
};

