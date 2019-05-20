class Room {
    constructor(ctx){
        this.ctx = ctx;
        this.level = 1;
        this.displayRoom()
        this.enemy = new Enemy(this.ctx, 1, 1);
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
        this.levelMult += 0.2;
        this.actionMult += 0.2;
        this.enemy = new Enemy(this.ctx, this.levelMult, this.actionMult);
        
    }

  
}