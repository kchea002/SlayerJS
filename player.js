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

        this.playerIds = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"]
        this.pCount = 0
        this.dCount = 10;

    
        // CARD AREA 1 LISTERNER
        // const cardOne = new Path2D();
        // cardOne.rect(460, 430, 180, 200);
        // this.ctx.fill(cardOne);

        // let canv = this.canvas.getBoundingClientRect();

        // addEventListener("click", (event) => {
            
        //     if (this.ctx.isPointInPath(cardOne, event.clientX - canv.x, event.clientY - canv.y)) {
        //         this.playCardOne(2);
                
        //     }
        // })

        // // CARD AREA 2 LISTERNER
        // const cardTwo = new Path2D();
        // cardTwo.rect(660, 430, 180, 200);
        // this.ctx.fill(cardTwo);

        // addEventListener("click", (event) => {
        //     if (this.ctx.isPointInPath(cardTwo, event.clientX - canv.x, event.clientY - canv.y)) {
        //         this.playCardOne(1);
        //     }
        // })

        // // CARD AREA 3 LISTERNER
        // const cardThree = new Path2D();
        // cardThree.rect(860, 430, 180, 200);
        // this.ctx.fill(cardThree);

        // addEventListener("click", (event) => {
        //     if (this.ctx.isPointInPath(cardThree, event.clientX - canv.x, event.clientY - canv.y)) {
        //         this.playCardOne(0);
        //     }
        // })

        // // CARD AREA 4 LISTERNER
        // const cardFour = new Path2D();
        // cardFour.rect(260, 430, 180, 200);
        // // this.ctx.fillStyle = "black";
        // this.ctx.fill(cardFour);

        // addEventListener("click", (event) => {
        //     if (this.ctx.isPointInPath(cardFour, event.clientX - canv.x, event.clientY - canv.y)) {
        //         this.playCardOne(3);
        //     }
        // })

        // const cardFive = new Path2D();
        // cardFive.rect(60, 430, 180, 200);
        // // this.ctx.fillStyle = "black";
        // this.ctx.fill(cardFive);

        // addEventListener("click", (event) => {
        //     if (this.ctx.isPointInPath(cardFive, event.clientX - canv.x, event.clientY - canv.y)) {
        //         this.playCardOne(4);
        //     }
        // })
        

        this.drawCards = this.drawCards.bind(this)
    }

    draw() {
        this.showCards();
        this.displayStats();
        if (this.sCount < 19) {
            this.strengthAnimation()
        } else if (this.dCount < 10){ 
            this.defendAnimation()
        } else {
            this.playerAnimation()
        }
    
    }


    drawCards(){
        if  (this.deck.cards.length >= 1) {
            this.hand = new Hand(this.deck);
        } else {
            this.deck.reload()
            debugger
            // this.deck = new Deck
            this.hand = new Hand(this.deck);
        }
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
                this.health += card.value
                this.nextEnergyBonus += 1
            } else if (card.type === "metal") {
                this.metalBonus += card.value
                this.shieldSound.play()
            }else if (card.type === "attack" || card.type === "clothesline") {
                this.graphic.attackAnimation()
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
        } else {
            let id = this.defendIds[2]
            let img = document.getElementById(id);
            this.ctx.drawImage(img, 350, 150, 100, 150);
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

    
}