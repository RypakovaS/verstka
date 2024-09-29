const playbutton = document.getElementById('play-button');

playbutton.onclick = function () {
    
    let username = document.getElementById('username-input').value;
    
    if (username == ""){
        username = "Anonim";
    }
    localStorage.removeItem('curPlayInfo');
    const currentplayer = {
        name: username,
        scores: [0, 0, 0],
    };
    localStorage.setItem("curPlayInfo", JSON.stringify(currentplayer));
    try {
        let f = JSON.parse(localStorage.getItem("firstplace"));
    }
    catch {
        const player = {
            name: '',
            score: '',
        };
        localStorage.setItem("firstplace", JSON.stringify(player));
    }
    try {
        let f = JSON.parse(localStorage.getItem("secondplace"));
    }
    catch {
        const player = {
            name: '',
            score: '',
        };
        localStorage.setItem("secondplace", JSON.stringify(player));
    }
    try {
        let f = JSON.parse(localStorage.getItem("thirdplace"));
    }
    catch {
        const player = {
            name: '',
            score: '',
        };
        localStorage.setItem("thirdplace", JSON.stringify(player));
    }

};

