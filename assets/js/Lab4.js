var quotes = [
    ["  \"Consuetudo est altera natura\"   ","    \"Привычка - вторая натура\""],
    ["\ \"Nota bene\" \ ","\ \"Заметьте хорошо!\" "],
    ["\ \"Nulla calamitas sola\" \ ","\ \"Беда не приходит одна\" "],
    ["\ \"Per aspera ad astra\" \ ","\ \"Через тернии к звёздам\" "]
];

function compareRandom(a, b) {
    return Math.random() - 0.5;
}

quotes.sort(compareRandom);
var count = 0;

function mod(a){
    return a%2;
}

function addRow(id) {
    if (count === 4)
        alert("Фразы закончились!")
    else {
        let parent = document.querySelector('#rand');
        let child = document.createElement('div');
        if (mod(count)===0)
            child.setAttribute('id', 'class1');
        else child.setAttribute('id', 'class2');
        let pchild1 = document.createElement('div');
        pchild1.style.textDecoration = "underline";
        let p = document.createElement('p');
        p = document.createTextNode("n=");
        pchild1.appendChild(p);
        //let p1 = document.createElement('p');
        p = document.createTextNode(count);
        pchild1.appendChild(p);
        child.appendChild(pchild1);
        let pchild2 = document.createElement('div');
        pchild2.style.fontStyle = "italic";
        let p2 = document.createElement('p');
        p2= document.createTextNode('\u00A0');
        pchild2.appendChild(p2);
        p2= document.createTextNode(quotes[count][0]);
        pchild2.appendChild(p2);
        p2= document.createTextNode('\u00A0');
        pchild2.appendChild(p2);
        child.appendChild(pchild2);
        let pchild3 = document.createElement('div');
        let p3 = document.createElement('i');
        p3 = document.createTextNode(quotes[count][1]);
        pchild3.appendChild(p3);
        let p4 = document.createElement("br");
        pchild3.appendChild(p4);
        child.appendChild(pchild3);
        parent.appendChild(child);
        count += 1;
    }
}

/*function text(){
    this.style.cssText='font-weight: bold';
}*/

function styleChange(){
    /*let cl = document.querySelector('#class2');
    cl.style.cssText='font-weight: bold';*/
    let mass = document.querySelectorAll("#class2");
    for( let i = 0; i < mass.length; i++){
        mass[i].style.cssText='font-weight: bold';
    }
}


