class Player {
    constructor(ctx, enemy, canvas, room, deck, state) {
        
        this.deck = deck 
        this.hand = new Hand(this.deck)
       
        this.canvas = canvas;
        this.ctx = ctx;
        this.room = room;
        this.enemy = room.enemy;
        this.state = state;
        this.graphic = new Graphic(this.ctx)

        this.health = 30; 
        // this.energy = Math.floor(1.8 + (Math.random() * 3))
        this.energy = 3;
        this.armor = 0;
        this.strength = 0;
        this.nextEnergyBonus = 0;
        this.metalBonus = 0

        this.slashSound = document.getElementById("slash");
        this.shieldSound = document.getElementById("shieldsound");

        this.strengthIds = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10", "s11", "s12", "s13", "s14", "s15", "s16", "s17", "s18", "s19", "s20", "s21", "s22", "s23"];
        this.strengthY = 165
        this.strengthX = 100
        this.sCount = 19

        this.defendIds = ["d1", "d2", "d3"]
        this.dCount = 10;

        this.playerIds = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"]
        this.pCount = 0

        this.slashIds = ["t4", "t5", "t6", "t7", "t8", "t9", "t10", "t11", "t12"]
        this.aCount = 9

        this.drawCards = this.drawCards.bind(this)
    }

    draw() {
        this.showCards();
        this.displayStats();
        if (this.sCount < 19) {
            this.strengthAnimation()
        } else if (this.dCount < 10){ 
            this.defendAnimation()
        } else if (this.aCount < 9) {
            this.slashAnimation()
        }else {
            this.playerAnimation()
        }
    
    }


    drawCards(){
        if  (this.deck.cards.length >= 1) {
            this.hand = new Hand(this.deck);
        } else {
            this.deck.reload()
            this.hand = new Hand(this.deck);
        }
        // if (this.deck.cards.length < 5 && this.deck.cards.length > 0 ) {
        //     this.hand.hand = []
        //     for (let index = 0; index < this.deck.cards.length + 1 ; index++) {
        //         this.hand.hand.push(this.deck.cards.pop())

        //         if (this.deck.cards.length === 0){
        //             this.deck.reload()
                
        //             if (this.hand.hand.length < 5) {

        //                 // for (let index = this.hand.hand.length ; index <= 0; index++) {
        //                 //     this.hand.hand.push(this.deck.cards.pop())
        //                 // }
        //                 while (this.hand.hand.length < 5) {
        //                     let popped2 = this.deck.cards.pop()
        //                     this.hand.hand.push(popped2)
        //                 }
        //             }
        //         } 
                
                
        //     }
        // } else if (this.deck.cards.length === 0) {
        //     this.deck.reload()
        //     this.hand = new Hand(this.deck);
        // } else {
        //     this.hand = new Hand(this.deck);

        // }
    }

    showCards() {
        let arr = this.hand.hand
        let x = 850

        arr.map(card => {
            if (card === "placeholder") {
                 "placeholder";
            }  else {
                this.ctx.drawImage(card.img, x, 430, 200, 200);
            }
            x -= 200
        })



    }


    displayStats(){
        
        

        this.ctx.font = "italic bold 20px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "white"
        this.ctx.fillText(this.health, 408, 350);

        this.ctx.font = "bold 45px Arial";
        this.ctx.fillText(this.deck.cards.length, 1130, 480);

        this.ctx.font = "bold 27px Arial";
        this.ctx.fillText(this.armor, 495, 285);

        if (this.strength > 0) {
            this.ctx.font = "bold 28px Arial";
            this.ctx.fillStyle = "red"
            this.ctx.fillText(this.strength, 495, 235);
        }

        if (this.metalBonus > 0) {
            this.ctx.font = "bold 28px Arial";
            this.ctx.fillStyle = "blue"
            this.ctx.fillText(this.metalBonus, 495, 200);
        }
        
        

    }

    playTurn(){
        this.drawCards()
        this.showCards()
    }

    playCardOne(num){
        let card = this.hand.hand[num];
        if (this.energy >= card.cost) {
            if (card.type === "defend") {
                this.armor += card.value;
                this.shieldSound.play()
                this.dCount = 0
            } else if (card.type === "heal") {
                this.health += card.value; 
            } else if (card.type === "strength") {
                    this.strength += card.value;
                    this.sCount = 0
            } else if (card.type === "bloodletting") {
                // this.health += card.value
                this.nextEnergyBonus += 1
            } else if (card.type === "metal") {
                this.metalBonus += card.value
                this.shieldSound.play()
            } else if (card.type === "attack" || card.type === "clothesline") {
                this.graphic.attackAnimation()
                this.aCount = 0
                this.slashSound.play()
                let totalAtk = card.value + this.strength;
                if (this.enemy.weakened > 0) {
                    totalAtk *= 1.5;
                }
                if (this.enemy.armor >= totalAtk) {
                    this.enemy.armor -= totalAtk;
                } else if ( this.enemy.armor > 0) {
                    this.enemy.armor -= totalAtk;
                    this.enemy.health += this.enemy.armor;
                } else {
                    this.enemy.health -= totalAtk;
                }
                if (card.type === "clothesline") {
                    this.enemy.weakened = card.debuff;
                }
            } 
        } else {
            // alert("Not enough energy");
            this.graphic.notEnoughEnergy()
            return false;
        }



        this.energy -= card.cost;
        this.hand.hand[num] = "placeholder";
    }

    
    strengthAnimation() {
        this.sCount += 1
        if (this.sCount < 19) {
            if (this.sCount > 6 && this.sCount < 15) {
                this.strengthX = 155;
                this.strengthY += 1;
            } else {
                this.strengthX = 100;
                this.strengthY = 170;
            }

            let id = this.strengthIds[this.sCount]
            let img = document.getElementById(id);
            this.ctx.drawImage(img, 350, 140, this.strengthX, this.strengthY);

        }
    }

    defendAnimation() {
        this.dCount += 1
        if (this.dCount < 3) {
            let id = this.defendIds[this.dCount]
            let img = document.getElementById(id);
            this.ctx.drawImage(img, 350, 150, 100, 150);
        } else if (this.dCount < 10) {
            let id = this.defendIds[2]
            let img = document.getElementById(id);
            this.ctx.drawImage(img, 350, 150, 100, 150);
        } else {
            this.dCount = 10;
        }
    
    }

    playerAnimation() {

        this.pCount += 1

        if (this.pCount === 4) {
            if (this.playerIds.length > 0) {
                this.playerId = this.playerIds.shift();
            } else {
                this.playerIds = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"];
                this.playerId = this.playerIds.shift();
            }
            let img = document.getElementById(this.playerId);
            this.ctx.drawImage(img, 350, 150, 100, 150);
            this.pCount = 0

        } else {
            let img = document.getElementById(this.playerId);
            this.ctx.drawImage(img, 350, 150, 100, 150);
        }

    };

    slashAnimation(){
        this.aCount += 1

        if (this.aCount < 9) {
            if (this.aCount < 3) {
                this.slashX = 100
            } else {
                this.slashX = 150
            }
        

            let id = this.slashIds[this.aCount]
            let img = document.getElementById(id);
            this.ctx.drawImage(img, 350, 150, this.slashX, 150);
        } else {
            this.aCount = 9
        }
    }
    
}