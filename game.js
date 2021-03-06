class Game {
    constructor(canvas) {
        this.version = "Version 0.62"

        this.canvas = document.getElementById(canvas);
        this.ctx = this.canvas.getContext("2d");

        this.state = "startScreen";

        this.deckback()
        this.endTurnListener();
        
        this.room = new Room(this.ctx)
        this.enemy = this.room.enemy;
        this.scores = {}

    

        this.deck = new Deck()
        this.player = new Player(this.ctx, this.enemy, this.canvas, this.room, this.deck, this.state);

        this.graphic = new Graphic(this.ctx, this.player, this.room)
        this.rain = new Rain(this.ctx, this.canvas, this.graphic)

        this.rewards = ["strength", "heal", "clothesline", "bloodletting", "metal", "barricade"]
        
        this.player.showCards();
        this.eCount = 10

        this.deckback = this.deckback.bind(this);

        this.endTurnListener = this.endTurnListener.bind(this)
        this.rootDraw = this.rootDraw.bind(this);
        this.turnReset = this.turnReset.bind(this);
        this.enemyTurn = this.enemyTurn.bind(this);

        this.rootDraw();



        const cardOne = new Path2D();
        cardOne.rect(460, 430, 180, 200);
        this.ctx.fill(cardOne);

        let canv = this.canvas.getBoundingClientRect();

        addEventListener("click", (event) => {

            if (this.ctx.isPointInPath(cardOne, event.clientX - canv.x, event.clientY - canv.y)) {
               if (this.state === "playMode"){
                   this.player.playCardOne(2);
               }
            }
        })

        // CARD AREA 2 LISTERNER
        const cardTwo = new Path2D();
        cardTwo.rect(660, 430, 180, 200);
        this.ctx.fill(cardTwo);

        addEventListener("click", (event) => {
            if (this.ctx.isPointInPath(cardTwo, event.clientX - canv.x, event.clientY - canv.y)) {
                if (this.state === "playMode") {
                    this.player.playCardOne(1);
                }
            }
        })

        // CARD AREA 3 LISTERNER
        const cardThree = new Path2D();
        cardThree.rect(860, 430, 180, 200);
        this.ctx.fill(cardThree);

        addEventListener("click", (event) => {
            if (this.ctx.isPointInPath(cardThree, event.clientX - canv.x, event.clientY - canv.y)) {
                if (this.state === "playMode") {
                    this.player.playCardOne(0);
                }
            }
        })

        // CARD AREA 4 LISTERNER
        const cardFour = new Path2D();
        cardFour.rect(260, 430, 180, 200);
        // this.ctx.fillStyle = "black";
        this.ctx.fill(cardFour);

        addEventListener("click", (event) => {
            if (this.ctx.isPointInPath(cardFour, event.clientX - canv.x, event.clientY - canv.y)) {
                if (this.state === "playMode") {
                    this.player.playCardOne(3);
                }
            }
        })

        const cardFive = new Path2D();
        cardFive.rect(60, 430, 180, 200);
        // this.ctx.fillStyle = "black";
        this.ctx.fill(cardFive);

        addEventListener("click", (event) => {
            if (this.ctx.isPointInPath(cardFive, event.clientX - canv.x, event.clientY - canv.y)) {
                if (this.state === "playMode") {
                    this.player.playCardOne(4);
                }
            }
        })
    }

    enemyTurn() {
        // WHEN PLAYER DIES
        if (this.player.health <= 0) {
            window.fetch('/players')
                .then((response) => {
                    return response.json();
                })
                .then((myJson) => {
                    let object = myJson["msg"]
                    this.scores = object
                });
            this.finalScore()
            this.leaderboard()
            this.state = "loseScreen";
        // WHEN PLAYER KILLS AN ENEMY
        } else if (this.enemy.health <= 0) {
            this.shuffleArray(this.rewards)
            this.state = "rewardScreen";
            this.rewardEL()
            this.turnReset();
            return true;
        }

        this.room.turn += 1;
        if (this.enemy.barricadeOn === false || this.enemy.armor < 0) {
            this.enemy.armor = 0;
        }

        if (this.player.poisoned > 0) {
            this.player.health -= 3;
            this.player.poisoned -= 1;
        }

        if (["Atk"].includes(this.enemy.action[0])) {
            if (this.player.armor >= this.enemy.action[1]) {
                this.player.armor -= this.enemy.action[1];
            } else if (this.player.armor > 0) {
                this.player.armor -= this.enemy.action[1];
                this.player.health += this.player.armor;
            } else {
                this.player.health -= this.enemy.action[1];
            }
        } else if (["Poison Tail"].includes(this.enemy.action[0])) {
            this.player.poisoned = 3;
        } else {
            this.enemy.armor += this.enemy.action[1];
        }

        this.enemy.action = this.enemy.randomAction();
        if (this.player.barricadeOn === true && this.player.armor > 0) {
            this.player.armor += this.player.metalBonus;
        } else {
            this.player.armor = 0 + this.player.metalBonus;
        }
        this.player.energy = 3 + this.player.nextEnergyBonus;
        this.player.nextEnergyBonus = 0;
        this.player.strength = 0;

        if (this.enemy.weakened > 0) {
            this.enemy.weakened -= 1;
        }

        this.player.playTurn();

        // setTimeout(this.endEnemyTurn(), 3000);
    }


    finalScore(){
        this.finalScore = (this.room.level * 1000) + (this.room.turn * 10)
    }

    startScreen(){
       

        let img = document.getElementById("splash")
        this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)

        this.ctx.font = "bold 28px Arial";
        this.ctx.fillStyle = "white"
        this.ctx.fillText("PRESS ANY BUTTON TO BEGIN", 850, 600);

        this.ctx.font = "bold 16px Arial";
        this.ctx.fillStyle = "white"
        this.ctx.fillText(this.version, 30, 20);

        const startPress = (event) => {
                this.state = "instruction"
                removeEventListener("keypress", startPress);
            }

        addEventListener("keypress", startPress );

    }

    instructionScreen(){

        let img = document.getElementById("instruction")
        this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)

        this.ctx.font = "bold 28px Arial";
        this.ctx.fillStyle = "white"
        this.ctx.fillText("PRESS ANY BUTTON TO CONTINUE", 400, 600);

        const startPress2 = (event) => {
            this.state = "playMode"
            window.bgm.play()
            removeEventListener("keypress", startPress2);
        }

        addEventListener("keypress", startPress2);
    }

    loseCard() {

        this.ctx.fillStyle = "rgba(0,0,0,0.5)";
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fill();

        let id = this.deck.lastRemoved.type
        let img = document.getElementById(id)
        this.ctx.drawImage(img, 560, 200, 200, 200)

        this.ctx.font = "bold 28px Arial";
        this.ctx.fillStyle = "white"
        this.ctx.fillText("REMOVED CARD", 660, 180);
        this.ctx.fillText("PRESS ANY BUTTON TO CONTINUE", 650, 600);

        const startPress3 = (event) => {
            this.state = "playMode"
            removeEventListener("keypress", startPress3);
        }

        addEventListener("keypress", startPress3);
    }

    bossWarning(){
        this.ctx.fillStyle = "rgba(0,0,0,0.5)";
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fill();

        this.ctx.font = "bold 100 px Arial";
        this.ctx.fillStyle = "red"
        this.ctx.fillText("BOSS INCOMING", 660, 180);

        this.ctx.fillStyle = "white"
        this.ctx.fillText("PRESS ANY BUTTON TO CONTINUE", 650, 600);

        const startPress4 = (event) => {
            this.state = "playMode"
            removeEventListener("keypress", startPress4);
        }

        addEventListener("keypress", startPress4)
    }



    rootDraw(){
        // FPS TIMER at 15 FPS
        setTimeout(() => { requestAnimationFrame(this.rootDraw);}, 1000/15); 
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 

        if (this.state === "startScreen"){
            this.startScreen();
        } else if (this.state === "instruction") {
            this.instructionScreen();
        } else if (this.state === "loseCard") {
            this.background();
            this.loseCard();
        } else if (this.state === "bossWarning") {
            this.background();
            this.bossWarning();
        } else if (this.state === "playMode") {
            this.background();
            this.rain.draw();
            this.deckback();
            this.graphic.draw();
            this.enemy.draw();
            this.player.draw();
            this.room.draw();
            if (this.eCount < 10){
                this.enemyTurnBanner()
            }
        } else if (this.state === "rewardScreen"){
            this.background();
            this.rewardScreen();
        } else if (this.state === "loseScreen"){
            this.background();
            this.loseScreen();
        }
           
        if (this.player.heath <= 0){
            this.loseScreen();
        }
    }

    background(){
        let img = document.getElementById("forest")
        this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
    }

    rewardScreen(){


        // let rect = this.ctx.rect(0, 0, 100, 100);
        // rect = this.ctx.fillStyle = "red";
        this.ctx.fillStyle = "rgba(0,0,0,0.5)";

        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        // this.ctx.fill();

        
        // this.ctx.fillRect(400, 200, 200, 200)
        // this.ctx.fillRect(700, 650, 450, 450)
            // this.ctx.fillStyle = "white"
        
        this.ctx.fillRect(330, 150, 650, 450)
        // this.ctx.fillStyle="white"
        this.ctx.fill();

        // this.ctx.fillRect(20, 20, 150, 100).fillStyle = "white";

        this.ctx.font = "italic 25px Arial";
        this.ctx.fillStyle = "white"
        this.ctx.fillText("CLICK HERE TO", 780, 500)
        this.ctx.fillText("Heal for " + (5 + this.room.level) + " HP", 780, 540);

        this.ctx.font = "italic 20px Arial";
        this.ctx.fillStyle = "white"
        this.ctx.fillText("CLICK HERE TO REMOVE", 500, 500)
        this.ctx.fillText("A RANDOM CARD", 500, 540)


        this.ctx.font = "italic 22px Arial";
        this.ctx.fillStyle = "white"
        this.ctx.fillText("Add a new card to your deck", 650, 200);
        this.ctx.fillText("Cards in Deck: " + this.deck.AllCards.length, 650, 180);
        

        this.ctx.font = "bold 30px Arial";
        this.ctx.fillStyle = "white"
        this.ctx.fillText("CHOOSE YOUR REWARD", 650, 100);

        let x = 370

        for (let index = 0; index < 3; index++) {
            let el = this.rewards[index]
            let img5 = document.getElementById(el)
            this.ctx.drawImage(img5, x, 220, 170, 170)
            x += 200
        }

    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    rewardEL(){
        let canv = this.canvas.getBoundingClientRect();

        let rewardHp = new Path2D();
        rewardHp.rect(680, 440, 200, 100);

        const rhp = (event) => {
            if (this.ctx.isPointInPath(rewardHp, event.clientX - canv.x, event.clientY - canv.y)) {
                if (this.state === "rewardScreen") {
                    removeEventListener("click", rhp);
                    this.player.health += (5 + this.room.level);
                    if (this.room.level % 5 === 0) {
                        this.state = "bossWarning"
                    } else {
                        this.state = "playMode";
                    }
                    this.deck.reload();
                    this.player.drawCards();
                    this.player.showCards();
                }
            }
        }

        addEventListener("click", rhp);


        let loseCard = new Path2D();
        loseCard.rect(400, 440, 200, 100);

        const lhp = (event) => {
            if (this.ctx.isPointInPath(loseCard, event.clientX - canv.x, event.clientY - canv.y)) {
                if (this.state === "rewardScreen") {
                    removeEventListener("click", lhp);
                    this.state = "loseCard";
                    this.deck.remove()
                    console.log(this.deck.length)
                    this.deck.reload();
                    this.player.drawCards();
                    this.player.showCards();
                }
            }
        }

        addEventListener("click", lhp );
        
        let rewardStr = new Path2D();
        rewardStr.rect(570, 220, 170, 170);
        const rc1e = (event) => {
            if (this.state === "rewardScreen") {
                if (this.ctx.isPointInPath(rewardStr, event.clientX - canv.x, event.clientY - canv.y)) {
                    this.deck.addCard(this.rewards[1])
                    if (this.room.level % 5 === 0) {
                        this.state = "bossWarning"
                    } else {
                        this.state = "playMode";
                    }
                    this.deck.reload();
                    this.player.drawCards();
                    this.player.showCards();
                }
            }
        }
        addEventListener("click", rc1e);

        let rewardHeal = new Path2D();
        rewardHeal.rect(770, 220, 170, 170);
        const rc2e = (event) => {
            if (this.state === "rewardScreen") {
                if (this.ctx.isPointInPath(rewardHeal, event.clientX - canv.x, event.clientY - canv.y)) {
                    this.deck.addCard(this.rewards[2])
                    if (this.room.level % 5 === 0) {
                        this.state = "bossWarning"
                    } else {
                        this.state = "playMode";
                    }
                    this.deck.reload();
                    this.player.drawCards();
                    this.player.showCards();
                }
            }
        }
        addEventListener("click", rc2e);

        let rewardClothesline = new Path2D();
        rewardClothesline.rect(370, 220, 170, 170);
        const rc3e = (event) => {
            if (this.state === "rewardScreen") {
                if (this.ctx.isPointInPath(rewardClothesline, event.clientX - canv.x, event.clientY - canv.y)) {
                    this.deck.addCard(this.rewards[0])
                    if (this.room.level % 5 === 0) {
                        this.state = "bossWarning"
                    } else {
                        this.state = "playMode";
                    }
                    this.deck.reload();
                    this.player.drawCards();
                    this.player.showCards();
                }
            }
        }
        addEventListener("click", rc3e);

    }
    

    leaderboard(){
        const submit = document.getElementById("submitButton")
        const leaderboard = document.getElementById("leaderboard")
        leaderboard.style.display = "flex";
        

        submit.addEventListener("click",  () => {
            let name = document.getElementById("input").value
            postData('/players', name , this.finalScore)
            leaderboard.style.display = "none";
            location.reload()
            // window.fetch('/players')
            //     .then((response) => {
            //         return response.json();
            //     })
            //     .then((myJson) => {
            //         let object = myJson["msg"]
            //         this.scores = object
            //     });
        });


        function postData(url = '/players', name, score) {
            // Default options are marked with *
            return fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: name, score: score })
                // body data type must match "Content-Type" header
            })
                .then(response => response.json()); // parses JSON response into native Javascript objects 
        }
    }

    turnReset(){
        this.player.energy = 3;
        this.player.armor = 0;
        this.player.strength = 0;
        this.player.nextEnergyBonus = 0
        this.player.metalBonus = 0
        this.player.barricadeOn = false;
        this.player.poisoned = 0
        this.room.turn = 1;
        this.room.nextLevel();
        this.enemy = this.room.enemy;
        this.player.enemy = this.enemy;
    }



    loseScreen() {
            this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = "rgba(0,0,0,0.5)";
            this.ctx.fill() 

            this.ctx.font = "bold italic 40 Arial";
            this.ctx.fillStyle = "red"
            this.ctx.fillText("Leaderboard", 1000, 70);

            this.ctx.font = "bold italic 50px Arial";
            this.ctx.fillStyle = "white"
            this.ctx.fillText("Try Again?", 650, 130);

            this.ctx.font = "bold italic 40px Arial";
            this.ctx.fillStyle = "white"
            this.ctx.fillText("Final Area: "+ this.room.level, 650, 180);
            this.ctx.fillText("score: " + this.finalScore, 650, 230);

            
            let y = 120
            this.scores.map( score => {
                this.ctx.font = "22px Arial";
                this.ctx.fillText(score.username + " " + score.score, 1000, y);
                y += 40
            })

            //  this.ctx.font = "bold 28px Arial";
            //  this.ctx.fillStyle = "white"
            // this.ctx.fillText("PRESS ANY BUTTON TO GO BACK TO THE START SCREEN", 650, 500);

            // const startPress3 = (event) => {
            //     location.reload()
            //     // removeEventListener("keypress", startPress3);
            //  }
            // addEventListener("keypress", startPress3);
    }




    deckback() {
       
        let img = document.getElementById("deckback")
        this.ctx.drawImage(img, 1100, 430, 180, 200)

        let img2 = document.getElementById("button")
        this.ctx.drawImage(img2, 1100, 300, 170, 60)

        this.ctx.font = "italic 30px Arial bold";
        this.ctx.fillStyle = "white"
        this.ctx.fillText("End Turn", 1182, 342);



    }

    endTurnListener() {
        const button = new Path2D();
        button.rect(1100, 300, 170, 60);
        this.ctx.fill(button);

       addEventListener("click", (event) => {
            const rec = this.canvas.getBoundingClientRect();
            if (this.ctx.isPointInPath(button, event.clientX - rec.x, event.clientY - rec.y)) {
                if (this.state === "playMode") {
                    setTimeout(() => { this.enemyTurn() }, 1000)
                    this.eCount = 0
                }
            }
           
        }) 



        const deckback = new Path2D();
        deckback.rect(1000, 430, 180, 200);
        this.ctx.fill(deckback);

        // addEventListener('keypress', (e) => {
        //     if (e.keyCode === 13) {      
        //         this.enemyTurn()
        //     }
        // })
       

          //TEST EVENT LISTENER
        // addEventListener("click", (event) => {

        //     if (this.ctx.isPointInPath(deckback, event.clientX, event.clientY )) {

        //     //    this.player.drawCards(), 
        //     //    this.player.showCards();
        //         this.graphic.attackFrame()
        //     }
        // })
    }

    enemyTurnBanner(){
        this.eCount += 1
        

        this.ctx.fillStyle = "rgba(0,0,0,0.5)";
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);

        
        this.ctx.fillRect(0,75, this.canvas.width, 150)
        this.ctx.fill()
    
        
        this.ctx.font = "bold italic 55px Arial";
        this.ctx.fillStyle = "white"
        this.ctx.fillText("Enemy Turn", 650, 180);

        this.ctx.fillStyle = "red"
        this.ctx.rect(0, 20, this.canvas.width, 100)

    
    

        
    }




    
   
}

window.onload = function() {
    const game = new Game("game-canvas");




}


