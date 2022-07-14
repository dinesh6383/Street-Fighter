let p1name = document.querySelector('.pname');
let p2name = document.querySelector('.ename');
let p1score = document.querySelector('.ppoint');
let p2score = document.querySelector('.epoint');
let p1attackBtn = document.querySelector('.pattack');
let p2attackBtn = document.querySelector('.eattack');
let p1healBtn = document.querySelector('.pheal');
let p2healBtn = document.querySelector('.eheal');
let autoBtn = document.querySelector('#automate button');
let messageBoard = document.querySelector('.msg h1');
let resetBtn = document.getElementById('reset');
let waterImage = document.querySelector('.water');
let fireImage = document.querySelector('.fire');
let victorySound = document.getElementById('victory');

const updateGame = (p1,p2) => {
        p1name.innerText = p1.name;
        p2name.innerText = p2.name;
        p1score.innerText = p1.health;
        p2score.innerText = p2.health;

        if(p1.health <= 0 || p2.health <=0){
            fighter.gameOver = true;
            messageBoard.innerText = fighter.declareWinner(p1,p2,fighter.gameOver)
            victorySound.play();
        }

}

class match{
    constructor(name,health){
        this.name = name;
        this.health = health;
    }

    attack(player,opponent){
        opponent.health -= Math.ceil(Math.random()*10)
        updateGame(p1,p2)
        
    }

    heal(player){
        player.health += Math.ceil(Math.random()*5)
        updateGame(p1,p2)

    }
}

const p1 = new match('Player 1',100);
const p2 = new match('Player 2',100);

class game{
    constructor(){
        this.gameOver = false;
    }

    declareWinner(p1,p2,gameOver){
        let msg

        if(p1.health <= 0 && gameOver == true){
            msg = `${p2.name} WINS!`
        }
        else if(p2.health <= 0 && gameOver == true){
            msg = `${p1.name} WINS!`
        }
        return msg
    }

    reset(p1,p2){
        p1.health = 100;
        p2.health = 100;
        this.gameOver = false;
        messageBoard.innerText = '-----'
        updateGame(p1,p2)
    }

    auto(p1,p2){
        while(!this.gameOver){
            p1.attack(p1,p2)
            p1.heal(p1)
            p2.attack(p2,p1)
            p2.heal(p2)
        }
        return this.declareWinner(p1,p2,this.gameOver)
    }
}

const fighter = new game()

//**************Button press************************/
p1attackBtn.addEventListener('click',()=>{
    if(p2.health > 0 && fighter.gameOver == false){
        p1.attack(p1,p2)
        if(!waterImage.classList.contains('anime')){
            waterImage.classList.add('anime')
        setTimeout(()=>{
        waterImage.classList.remove('anime')
        },200)
        }
    }
})

p1healBtn.addEventListener('click',()=>{
    if(p2.health > 0 && fighter.gameOver == false){
        p1.heal(p1)
    }
})

p2attackBtn.addEventListener('click',()=>{
    if(p1.health > 0 && fighter.gameOver == false){
        p2.attack(p2,p1)
        if(!fireImage.classList.contains('hott')){
            fireImage.classList.add('hott')
        setTimeout(()=>{
        fireImage.classList.remove('hott')
        },200)
        }
    }
})

p2healBtn.addEventListener('click',()=>{
    if(p1.health > 0 && fighter.gameOver == false){
        p2.heal(p2)
    }
})

autoBtn.addEventListener('click',()=>{
    fighter.auto(p1,p2)
})

//****************************Reset the game***************//
resetBtn.addEventListener('click',()=>{
    fighter.reset(p1,p2)
})

//*******************Keyboard Press********************** */
document.addEventListener('keyup',(e)=>{
    if(e.key == 'q' && p2.health > 0 && fighter.gameOver == false){
        p1.attack(p1,p2)
        waterImage.classList.add('anime')
        setTimeout(()=>{
        waterImage.classList.remove('anime')
        },200)
    }

    else if(e.key == 'a' && p2.health > 0 && fighter.gameOver == false){
        p1.heal(p1)
    }

    else if(e.key == 'p' && p1.health > 0 && fighter.gameOver == false){
        p2.attack(p2,p1)
        fireImage.classList.add('hott')
        setTimeout(()=>{
        fireImage.classList.remove('hott')
        },200)

    }

    else if(e.key == 'l' && p1.health > 0 && fighter.gameOver == false){
        p2.heal(p2)
    }
})
//********************************************************/

