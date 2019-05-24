class defendCard {
    constructor(){
        this.img = document.getElementById("defend");
        this.type = "defend";
        this.value = 5;
        this.cost = 1;
    }
}

class attackCard {
    constructor() {
        this.img = document.getElementById("attack");
        this.type = "attack";
        this.value = 6; 
        this.cost = 1;
    }
}

class healCard {
    constructor() {
        this.img = document.getElementById("heal");
        this.type = "heal";
        this.value = 5;
        this.cost = 3;
    }
}

class strengthCard {
    constructor() {
        this.img = document.getElementById("strength");
        this.type = "strength";
        this.value = 4;
        this.cost = 0;
    }
}

class clothesline {
    constructor() {
        this.img = document.getElementById("clothesline");
        this.type = "clothesline";
        this.value = 12;
        this.debuff = 2
        this.cost = 2;
    } 
}

class bloodletting {
    constructor() {
        this.img = document.getElementById("bloodletting");
        this.type = "bloodletting";
        // this.value = -3;
        this.cost = 1;
    }
}

class metalCard {
    constructor() {
        this.img = document.getElementById("metal");
        this.type = "metal";
        this.value = 2;
        this.cost = 3;
    }
}