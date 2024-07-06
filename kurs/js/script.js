const canvas = document.getElementById('can1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = 200;

ctx.font = '15px Arial';
ctx.fillStyle = 'white';

const txtCoord = ctx.getImageData(0, 0, 800, 200);


class Partical {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 4;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
        this.distance;
    }
    draw() {
        ctx.fillStyle = 'rgba(89, 146, 221, 0.8)';
        ctx.strokeStyle = 'rgb(35, 22, 215, 1)'
        ctx.beginPath();

        if(this.distance<mouse.radius-5){
            this.size=8;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(this.x-1, this.y-1, this.size/2, 0, Math.PI * 2);
            ctx.arc(this.x+1, this.y+1, this.size/3, 0, Math.PI * 2);
        }
        else if(this.distance<mouse.radius){
            this.size=6;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(this.x-1, this.y-1, this.size/2, 0, Math.PI * 2);
        }
        else{
            this.size=4;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(this.x-1, this.y-1, this.size/2, 0, Math.PI * 2);
        }
        ctx.closePath();
        ctx.fill();
    }
    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        this.distance = distance;

        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistant = mouse.radius;
        let force = (maxDistant - distance) / maxDistant;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx / 10;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 10;
            }
        }
    }
}

function init() {
    particalArray = [];
    for (let y1 = 0, y2 = txtCoord.height; y1 < y2; y1++) {
        for (let x1 = 0, x2 = txtCoord.height; x1 < x2; x1++) {
            if (txtCoord.data[(y1 * 4 * txtCoord.width) + (x1 * 4) + 3] > 128) {
                let positionX = x1;
                let positionY = y1;
                particalArray.push(new Partical(positionX * 11, positionY * 11));
            }
        }
    }
}

init();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particalArray.length; i++) {
        particalArray[i].draw();
        particalArray[i].update();
    }
    requestAnimationFrame(animate);
}

animate();






