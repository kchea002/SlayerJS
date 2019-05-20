class Hand {
    constructor(deck) {
            this.deck = deck
            let res = []
            for (let index = 0; index < 5; index++) {
                
                let popped = this.deck.cards.pop()
                if (popped === undefined ){
                    // continue;
                    res.push("placeholder");
                } else {
                    res.push(popped);
                }
            }
        this.hand = res;
    }

    drawCards(){

    }
    
}