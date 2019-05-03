/* 
Space particles. Created with TypeScript.

*/

interface Particle {
    x: number;
    y: number;
    z: number;
    ring: number;
    move: number;
    random: number;
    radius: number;
    color: string;
}

class Space {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private particles: Particle[];
    private ratio: number;
    private r: number;
    private counter: number;

    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.particles = [];
        this.ratio = window.innerHeight < 400 ? 0.6 : 1;
        this.r = 120;
        this.counter = 0;
    }
    init = () => {
        this.createElement();
        this.loop();
    };
    createElement = () => {
        var scale = this.ratio;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.width = '100%';
        this.canvas.style.background = 'rgb(0, 0, 0)';
        this.ctx.transform(scale, 0, 0, -scale, this.canvas.width / 2, this.canvas.height / 2);
        document.body.appendChild(this.canvas);
        for (var i = 0; i < 450; i++) {
            this.createParticle();
        }
    };
    createParticle = () => {
        this.particles.push({
            color: Math.random() > 0.5 ? "blue" : "red",
            radius: Math.random() * 10,
            x: Math.cos(Math.random() * 7 + Math.PI) * this.r,
            y: Math.sin(Math.random() * 7 + Math.PI) * this.r,
            z: Math.sin(Math.random() * 7 + Math.PI) * this.r,
            ring: Math.random() * this.r * 30,
            move: ((Math.random() * 4) + 1) / 500,
            random: Math.random() * 70
        });
    };
    moveParticle = (p: Particle) => {
        p.ring = Math.max(p.ring - 1, this.r);
        p.random += p.move;
        p.x = Math.cos(p.random + Math.PI) * p.ring;
        p.y = Math.sin(p.random + Math.PI) * p.ring;
        p.z = Math.sin(p.random + Math.PI) * p.ring;
    };
    resetParticle = (p: Particle) => {
        p.ring = Math.random() * this.r * 3;
        p.radius = Math.random() * 5;
    };
    disappear = (p: Particle) => {
        if (p.radius < 0.8) {
            this.resetParticle(p);
        }
        p.radius *= 0.994;
    };
    draw = (p: Particle) => {
        this.ctx.beginPath();
        this.ctx.fillStyle = p.color;
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fill();
    };
    loop = () => {
        this.ctx.clearRect(-this.canvas.width , -this.canvas.height, this.canvas.width * 2, this.canvas.height * 2);
        if (this.counter < this.particles.length) {
            this.counter++;
        }
        
        for (var i = 0; i < this.counter; i++) {
            this.disappear(this.particles[i]);
            this.moveParticle(this.particles[i]);
            this.draw(this.particles[i]);
        }
        requestAnimationFrame(this.loop.bind(this));
    };
}
window.onload = function () {
    var space = new Space();
    space.init();
};


