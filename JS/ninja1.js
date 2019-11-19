
function Ninja(name){
  this.name=name;
  this.health = 100;
  var speed = 3;
  var strength = 3;
  this.sayName = function(){
    console.log(this.name);
  }
  this.showStats = function(){
    console.log("Name : "+this.name+" "+"Strength : "+strength+" "+"Speed : "+speed+" "+"Health : "+this.health);
  }
  this.drinkShake = function(){
    this.health += 10;
    console.log("New health is : ",this.health);
    return this;
  }
  this.punch = function(opponent){
    this.opponent = opponent;
    this.opponent.health -= 5;
    console.log(this.opponent.health);
  }
  this.kick = function(opponent){
    this.opponent = opponent;
    this.opponent.health -= 15;
    console.log(this.opponent.health);
    this.sayName();
    console.log(strength+1);
  }
  
}


var ninja1 = new Ninja("Hyabusa");
ninja1.sayName();
// -> "My ninja name is Hyabusa!"
ninja1.showStats();
ninja1.drinkShake();
var ninja2 = new Ninja("ooha");
ninja2.sayName();
ninja1.punch(ninja2);
ninja1.kick(ninja2);
console.log(ninja2 instanceof Ninja);
console.log(ninja1 instanceof Ninja);

// -> "Name: Hayabusa, Health: 100, Speed: 3, Strength: 3"
