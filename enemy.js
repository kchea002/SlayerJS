class Enemy {
    constructor(ctx, mul1, mul2){
        this.ctx = ctx;
        
        this.attributeMultiplier = mul1;
        this.actionMultiplier = mul2;


        this.health = Math.floor(this.attributeMultiplier * (20 + ( Math.random() * 10)));
        // this.health = 5;
        this.armor = 0;
        this.weakened = 0;

    
        this.action = this.randomAction();

        this.sx = 60;
        this.x = 0;
        this.y = 0;
        this.sy = 65;

        this.aCount = 0

    
        this.animate = this.animate.bind(this)

    }

    draw(){
        this.displayNextAction();
        this.displayAttributes();
        this.animate();
    }

    randomAction() {
        let enemyActions = [
            ["Atk", Math.ceil(5 + this.actionMultiplier * (Math.floor(1.8 + (Math.random() * 3)))) ], 
            ["Defend", Math.ceil(5 + this.actionMultiplier * (Math.floor(1.8 + (Math.random() * 3))))], 
            ["Atk", Math.ceil(5 + this.actionMultiplier * (Math.floor(1.8 + (Math.random() * 3))))], 
            ["Defend", Math.ceil(5 + this.actionMultiplier * (Math.floor(1.8 + (Math.random() * 3))))]
        ];

        this.shuffleArray(enemyActions);

        return enemyActions[0];
    }

    displayNextAction(){
        this.ctx.font = "25px Arial";
        this.ctx.fillStyle = "orange";   
        this.ctx.fillText(this.action[0]+ ": " + this.action[1], 830, 220);

        
    }

   

    shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
    }

    displayAttributes() {
        this.ctx.font = "bold italic 19px Arial";
        this.ctx.fillStyle = "rgb(255,255,153)"
        this.ctx.fillText(this.health, 879, 397);

        this.ctx.font = "bold 27px Arial";
        this.ctx.fillStyle = "rgb(255,255,153)"
        this.ctx.fillText(this.armor, 815, 376);

        if (this.weakened > 0) {
            this.ctx.font = "bold italic 19px Arial";
            this.ctx.fillStyle = "red"
            this.ctx.fillText("Weak: " + this.weakened, 920, 200);
        }
        

    }


    animate() {
        let img = document.getElementById("scorpion");
        this.aCount += 1
        let sx = this.sx;
        let x = this.x;
        let y = this.y;
        let sy = this.sy;

        if (this.aCount === 3) {
            this.ctx.drawImage(img, x, y, sx, sy, 800, 240, 180, 130);
            this.aCount = 0

            if (x < 195 && y === 0) {
                this.x += 65;
            } else if (x === 195 && y === 0) {
                this.x = 0
                this.y = 65
            } else if (x < 195 && y === 65) {
                this.x += 65;
            } else if (x === 195 && y === 65) {
                this.x = 0
                this.y = 130
            } else if (x < 195 && y === 130) {
                this.x += 65;
            } else if (x === 195 && y === 130) {
                this.x = 0;
                this.y = 0;
            }
        } else {
            this.ctx.drawImage(img, x, y, sx, sy, 800, 240, 180, 130)
        }
       
    
        
       
    }
   

}





