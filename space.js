/*
Space particles. Created with TypeScript.

*/
var Space = /** @class */ (function () {
    function Space() {
        var _this = this;
        this.init = function () {
            _this.createElement();
            _this.loop();
        };
        this.createElement = function () {
            var scale = _this.ratio;
            _this.canvas.width = window.innerWidth;
            _this.canvas.height = window.innerHeight;
            _this.canvas.style.width = '100%';
            _this.canvas.style.background = 'rgb(0, 0, 0)';
            _this.ctx.transform(scale, 0, 0, -scale, _this.canvas.width / 2, _this.canvas.height / 2);
            document.body.appendChild(_this.canvas);
            for (var i = 0; i < 450; i++) {
                _this.createParticle();
            }
        };
        this.createParticle = function () {
            _this.particles.push({
                color: Math.random() > 0.5 ? "blue" : "red",
                radius: Math.random() * 10,
                x: Math.cos(Math.random() * 7 + Math.PI) * _this.r,
                y: Math.sin(Math.random() * 7 + Math.PI) * _this.r,
                z: Math.sin(Math.random() * 7 + Math.PI) * _this.r,
                ring: Math.random() * _this.r * 30,
                move: ((Math.random() * 4) + 1) / 500,
                random: Math.random() * 70
            });
        };
        this.moveParticle = function (p) {
            p.ring = Math.max(p.ring - 1, _this.r);
            p.random += p.move;
            p.x = Math.cos(p.random + Math.PI) * p.ring;
            p.y = Math.sin(p.random + Math.PI) * p.ring;
            p.z = Math.sin(p.random + Math.PI) * p.ring;
        };
        this.resetParticle = function (p) {
            p.ring = Math.random() * _this.r * 3;
            p.radius = Math.random() * 5;
        };
        this.disappear = function (p) {
            if (p.radius < 0.8) {
                _this.resetParticle(p);
            }
            p.radius *= 0.994;
        };
        this.draw = function (p) {
            _this.ctx.beginPath();
            _this.ctx.fillStyle = p.color;
            _this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            _this.ctx.fill();
        };
        this.loop = function () {
            _this.ctx.clearRect(-_this.canvas.width, -_this.canvas.height, _this.canvas.width * 2, _this.canvas.height * 2);
            if (_this.counter < _this.particles.length) {
                _this.counter++;
            }
            for (var i = 0; i < _this.counter; i++) {
                _this.disappear(_this.particles[i]);
                _this.moveParticle(_this.particles[i]);
                _this.draw(_this.particles[i]);
            }
            requestAnimationFrame(_this.loop.bind(_this));
        };
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.ratio = window.innerHeight < 400 ? 0.6 : 1;
        this.r = 120;
        this.counter = 0;
    }
    return Space;
}());
window.onload = function () {
    var space = new Space();
    space.init();
};
