document.addEventListener("DOMContentLoaded", () => {
    from_start();
    rotateOnKey();
    try_again.onclick = from_start;
    check_button.onclick = function () {
        check1();
    };
});

class element {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.cl ='undef';
    }
}

const figure = document.getElementsByClassName('figure');
const picture = document.getElementsByClassName('pic');
const check_button = document.getElementById("check");
const try_again = document.getElementById("start");
const main = document.getElementsByClassName('main').item(0);
elements = [
    new element(300, 550, 45),
    new element(900, 50, 0),
    new element(600, 300, 60),
    new element(600, 50, 0),
    new element(300, 300, 90),
    new element(900, 300, 130),
    new element(300, 50, 0),
    new element(900, 550, 15),
    new element(600, 550, 0)];

function from_start() {
    for (let i = 0; i < 9; i++) {
        from_start1(figure.item(i), picture.item(i), i);
    }
    move();

    function from_start1(fig, pic, i) {
        elements[i].inItsArea = false;
        fig.style.left = elements[i].x + "px";
        fig.style.top = elements[i].y + "px";
        rotate(pic, i, elements[i].angle);
        pic.style.display = 'block';
        elements[i].cl = fig.getAttribute('About');
    }
}

function move() {
    for (let i = 0; i < 9; i++) {
        //if (!elements[i].inItsArea) {
        {
            moving(figure.item(i));
        }
    }

    function moving(fig) {
        fig.ondragstart = () => {
            return false;
        };
        fig.onmousedown = (e) => {
            const coords = getCoords(fig);
            const shiftX = e.clientX - coords.left;
            const shiftY = e.clientY - coords.top;
            document.onmousemove = (e) => {
                fig.style.left = (e.clientX - shiftX - main.offsetLeft) + 'px';
                fig.style.top = (e.clientY - shiftY - main.offsetTop) + 'px';
            };
            fig.onmouseup = () => {
                document.onmousemove = null;
            };

            function getCoords(fig) {
                let x = fig.getBoundingClientRect();
                return {
                    top: x.top + pageYOffset,
                    left: x.left + pageXOffset
                };
            }
        };
    }
}

function rotateOnKey() {
    for (let i = 0; i < 9; i++) {
        picture.item(i).onclick = () => {
            document.onkeydown = () => {
                rotate(picture.item(i), i, elements[i].cur_angle + 45);
            }
        }
    }
}

function rotate(pic, i, x) {
    if (!elements[i].inItsArea) {
        pic.style.transform = 'rotate(' + x + 'deg)';
        elements[i].cur_angle = x;
    }
}

/*function check() {
    let x = 0;
    for (let i = 0; i < 3; i++) {
        x += check1(bird_area, i, x);
    }
    for (let i = 3; i < 6; i++) {
        x += check1(beast_area, i, x);
    }
    if (x === 6) win();
*/
function check1() {
    //let el = document.getElementById('pic');
    const pic = picture.item(0);
    let width = pic.offsetWidth;
    let birds_mass = [
        [0,0],
        [0,0],
        [0,0],
    ];
    let count_birds = 0;
    let count_beast = 0;
    let count_insect = 0;
    let beast_mass = [
        [0,0],
        [0,0],
        [0,0],
    ];
    let insect_mass = [
        [0,0],
        [0,0],
        [0,0],
    ];
    for (let i = 0; i < 9; i++) {
        let elem_id = elements[i].cl;
        if (elem_id === "bird") {
            mass(elements[i], birds_mass, count_birds);
            count_birds++;
        } else if (elem_id === "beast") {
            mass(elements[i], beast_mass, count_beast);
            count_beast++;
        } else if (elem_id === "insect") {
            mass(elements[i], insect_mass, count_insect);
            count_insect++;
        }
    }
    let c1 = check_mass(birds_mass);
    let c2 = check_mass(beast_mass);
    let c3 = check_mass(insect_mass);
    if (c1===1 && c2===1 && c3===1) win();

    function check_mass(mass) {
        if (Math.abs(mass[0][0]-mass[1][0])>width) return 0;
        else if (Math.abs(mass[0][0]-mass[2][0])>width) return 0;
        else if (Math.abs(mass[2][0]-mass[1][0])>width) return 0;
        else if (Math.abs(mass[0][1]-mass[1][1])>width) return 0;
        else if (Math.abs(mass[0][1]-mass[2][1])>width) return 0;
        else if (Math.abs(mass[2][1]-mass[1][1])>width) return 0;
        else return 1;

    }

    function mass(elem, mass, i) {
        const fig = figure.item(i);
        const x = fig.offsetLeft;
        const y = fig.offsetTop;
        mass[i] = [x, y];
    }
}

function win() {
    for (let i = 0; i < 9; i++) {
        picture.item(i).animate([
            {transform: 'rotate(' + 45 + 'deg)'},
            {transform: 'rotate(' + 90 + 'deg)'},
            {transform: 'rotate(' + 135 + 'deg)'},
            {transform: 'rotate(' + 180 + 'deg)'},
            {transform: 'rotate(' + 225 + 'deg)'},
            {transform: 'rotate(' + 270 + 'deg)'},
            {transform: 'rotate(' + 315 + 'deg)'},
            {transform: 'rotate(' + 360 + 'deg)'},
        ], 600);
    }
}


