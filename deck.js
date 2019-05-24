

class Deck {
    constructor(){
        
        let cardArr = [];
        while (cardArr.length < 12) {
            cardArr.push(new defendCard)
            cardArr.push(new attackCard);
            // cardArr.push(new metalCard);
            // cardArr.push(new strengthCard);

        }
        let stored = cardArr.slice() 
       
        
        this.AllCards = stored; 
        this.cards = this.shuffleArray(cardArr)
    
        this.lastRemoved = null;

        this.shuffleArray = this.shuffleArray.bind(this);
        this.reload = this.reload.bind(this);

    }
     
    shuffleArray(array) {
        let arr2 =  array.slice()
        for (let i = arr2.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr2[i], arr2[j]] = [arr2[j], arr2[i]];
        }
        return arr2;
    }

   
  

    reload(){
        this.cards = this.shuffleArray(this.AllCards.slice())
    }

    remove(){
        // this.shuffleArray(this.Allcards)
        this.lastRemoved = this.AllCards.shift()
    }

    addCard(type){
        if (type === "strength") {
            this.AllCards.push( new strengthCard)
        } else if (type === "heal"){
            this.AllCards.push(new healCard)
        } else if (type === "clothesline") {
            this.AllCards.push(new clothesline)
        } else if (type === "bloodletting") {
            this.AllCards.push(new bloodletting)
        } else if (type === "metal") {
            this.AllCards.push(new metalCard)
        }
    }

}


