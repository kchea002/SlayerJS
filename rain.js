
class Rain {
    // Mostly taken from https://codepen.io/ruigewaard/pen/JHDdF/ with some minor tweaks 
    // and adjustment to be compatible with my code.

    constructor(ctx, canvas){
        this.ctx = ctx;
        this.canvas = canvas;
        this.w = canvas.width;
        this.h = canvas.height

        this.ctx.strokeStyle = 'rgba(174,194,224,0.5)';
        this.ctx.lineWidth = 1;
        this.ctx.lineCap = 'round';

        this.init = [];
        let maxParts = 1000;
        for (let a = 0; a < maxParts; a++) {
            this.init.push({
                x: Math.random() * this.w,
                y: Math.random() * this.h,
                l: Math.random() * 1,
                xs: -4 + Math.random() * 4 + 2,
                ys: Math.random() * 10 + 10
            })
        }

        this.particles = [];
        for (let b = 0; b < maxParts; b++) {
            this.particles[b] = this.init[b];
        }

    }

    draw(){
        for (let c = 0; c < this.particles.length; c++) {
            let p = this.particles[c];
            this.ctx.beginPath();
            this.ctx.moveTo(p.x, p.y);
            this.ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
            this.ctx.stroke();
        }
        this.move()
    }

    move(){
        for (let b = 0; b < this.particles.length; b++) {
            let p = this.particles[b];
            p.x += p.xs;
            p.y += p.ys;
            if (p.x > this.w || p.y > this.h) {
                p.x = Math.random() * this.w;
                p.y = -20;
            }
        }
    }



}





