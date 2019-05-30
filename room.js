
class Room {
    constructor(ctx) {
        this.ctx = ctx;
        this.level = 1;
        this.displayRoom()

        let random = Math.random() * 10
        if (random <= 5) {
            this.enemy = new Scorpion(this.ctx, 1, 1); 
        } else {
            this.enemy = new Knight(this.ctx, 1, 1); 
        }
        // this.enemy = new Boss(this.ctx, 1, 1);

      
        this.levelMult = 1
        this.actionMult = 1
        this.turn = 0;

    }

    draw(){
        this.displayRoom()
    }

    displayRoom(){
        this.ctx.font = "bold 30px Arial";
        this.ctx.fillStyle = "white"
        this.ctx.fillText("Area " + this.level, 100, 50);
    }

    nextLevel(){
        this.level += 1;
        this.levelMult += 0.10;
        this.actionMult += 0.10;

        if (this.level % 5 === 0) {
            this.enemy = new Boss(this.ctx, this.levelMult, this.actionMult);
            // this.enemy = new Knight(this.ctx, this.levelMult, this.actionMult);
        } else {
            let random = Math.random() * 10
            if (random <= 5) {
                this.enemy = new Knight(this.ctx, this.levelMult, this.actionMult);
            } else {
                this.enemy = new Scorpion(this.ctx, this.levelMult, this.actionMult);
            }  
        }      
    }

  
}