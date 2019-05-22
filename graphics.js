
class Graphic {
    constructor(ctx, player, room){
        this.ctx = ctx
        this.playerIds = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"]
        this.elementIds = ["a2", "a3"];
        this.playerId = "p8"
        this.strengthIds = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10", "s11", "s12", "s13", "s14", "s15", "s16", "s17", "s18", "s19", "s20", "s21", "s22", "s23" ];
        this.strengthY = 165
        this.strengthX = 100

        this.energyY = 110;
        this.energySwitch = false; 
        this.player = player;
        this.room = room;

        this.eCount = 0
        this.pCount = 0
        this.dCount = 0
        this.attackAnimation = this.attackAnimation.bind(this)
        this.attackFrame = this.attackFrame.bind(this)
        this.notEnoughEnergy = this.notEnoughEnergy.bind(this)


    }

    draw(){
        this.displaySwordEnergy();
        // this.playerAnimation();
        this.playerHealth();
        this.displayShield();
        this.enemyHeart();
        this.displayEnemyShield()
        this.displayTurnNumber();
        console.log("DRAW CALLED", this.sCount)
        if (this.sCount < 19){
            console.log("IVE BEEN CALLED", this.sCount)
            this.strengthAnimation()
        }
       
    }

    reset(){
        this.sCount = 0
    }

    // VERSION 1 PLAYER HEART
    // playerHealth(){
    //     let img = document.getElementById("heart")
    //     this.ctx.drawImage(img, 275, 360, 70, 70)
    // }

    playerHealth() {
        let img = document.getElementById("enemyheart")
        this.ctx.drawImage(img, 384, 323, 50, 45)
    }

    enemyHeart(){
        let img = document.getElementById("enemyheart")
        this.ctx.drawImage(img, 855, 370, 50, 45)
    }

    displayShield() {
        let img = document.getElementById("shield")
        this.ctx.drawImage(img, 470, 250, 50, 50)
    }

    displayEnemyShield(){
        let img = document.getElementById("shield3")
        this.ctx.drawImage(img, 790, 340, 50, 55)
    }

    displayTurnNumber() {
        this.ctx.font = "italic bold 20px Arial";
        this.ctx
        this.ctx.fillText("Turn: " + this.room.turn, 100, 80);
    }

    // playerAnimation() {
        
    //     this.pCount += 1

    //     if (this.pCount === 4) {
    //         if (this.playerIds.length > 0) {
    //             this.playerId = this.playerIds.shift();
    //         } else {
    //             this.playerIds = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"];
    //             this.playerId = this.playerIds.shift();
    //         }
    //         let img = document.getElementById(this.playerId);
    //         this.ctx.drawImage(img, 350, 150, 100, 150);
    //         this.pCount = 0

    //     } else {
    //             let img = document.getElementById(this.playerId);
    //             this.ctx.drawImage(img, 350, 150, 100, 150);
    //     }
        
    // };

    // strengthAnimation(){
    //     console.log("ANIMATIONCOUNT", this.sCount)
    //     this.sCount += 1
    //     if (this.sCount < 19){
    //         if (this.sCount > 6 && this.sCount < 15){
    //             this.strengthX = 155;
    //             this.strengthY += 1;
    //         } else {
    //             this.strengthX = 100;
    //             this.strengthY = 170;
    //         }

    //         let id = this.strengthIds[this.sCount]
    //         let img = document.getElementById(id);
    //         this.ctx.drawImage(img, 350, 140, this.strengthX, this.strengthY);
           
    //     // } 
    //     //     // // this.sCount = 0
    //     //     // this.strengthY = 150;
    //     //     // this.strengthX = 100;

    //     // }
    //     } else {
    //         this.sCount = 0
    //     }
        
    // }



    attackAnimation() {
    
         setTimeout(() => {
             let anim = requestAnimationFrame(this.attackAnimation); 
             if (this.elementIds.length === 0) {
                 cancelAnimationFrame(anim)
                 this.elementIds = ["a2", "a3"];
             }
            }, 1000 / 15);

        this.attackFrame()
     
    }

    attackFrame(){
        let id = this.elementIds.shift()
        let img = document.getElementById(id);
        this.ctx.drawImage(img, 350, 0, 500, 300);
       
        
    }

    displaySwordEnergy() {

        let x = 320
        this.dCount += 1
       
        if (this.dCount === 10) {
            for (let index = 1; index <= this.player.energy; index++) {

                if (this.energySwitch === false) {
                    this.energyY -= 2;
                    this.energySwitch = true
                } else if (this.energySwitch === true) {
                    this.energyY += 2;
                    this.energySwitch = false
                }


                let img = document.getElementById("energy");
                this.ctx.drawImage(img, x, this.energyY, 250, 150);
                x -= 50
                this.dCount = 0
                
            }
            this.dCount = 0
        } else {
            let img = document.getElementById("energy");
               
            for (let index = 1; index <= this.player.energy; index++) {
                this.ctx.drawImage(img, x, 110, 250, 150);
                x -= 50
            }
        
        }
        
    }

    notEnoughEnergy(){
        let anim = requestAnimationFrame(this.notEnoughEnergy)
        this.eCount += 1 

        let img = document.getElementById("notenoughenergy");
        this.ctx.drawImage(img, 250, 50, 800, 200);
        console.log(this.eCount)
        if (this.eCount === 20) {
            
            cancelAnimationFrame(anim)
            this.eCount = 0;
        }
        
        
    }

    

}
