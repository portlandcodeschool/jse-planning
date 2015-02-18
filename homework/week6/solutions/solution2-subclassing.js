// ================ Part a) ================

function Animal(name) {
	this.name = name;
}

// All subclass instances will inherit prototype methods...
Animal.prototype.move = function() {
	return 'walk'; // but subclasses will override this one
}

// ------------ Birds ------------
// Create new class (ctor):
function Bird(name) {
	//give Bird instances the personal properties of Animals (i.e. name)
	// by calling Animal as an initializer on this:
	Animal.call(this,name);
}

// Turn Bird into subclass of Animal...
// Replace Bird's default prototype with a new Animal, which inherits from Animal.prototype:
Bird.prototype = new Animal();
// OR Alternative:
Bird.prototype = Object.create(Animal.prototype);
// Now link the new prototype back to its new ctor:
Bird.prototype.constructor = Bird;

// Now add Bird-specific behaviors:
Bird.prototype.move = function() { return 'fly'}; //override Animal.prototype.move
Bird.prototype.hasWings = true;

// ------------ Fish ------------
// Same steps for Fish subclass:
function Fish(name) {
	Animal.call(this,name);
}

//Fish.prototype = new Animal();
// OR: 
Fish.prototype = Object.create(Animal.prototype);

Fish.prototype.constructor = Fish;
Fish.prototype.move = function() { return 'swim'};

// ------------ Penguin ------------
function Penguin(name) {
	Bird.call(this,name);
}
//Penguin.prototype = new Bird();
// OR:
Penguin.prototype = Object.create(Bird.prototype);

Penguin.prototype.constructor = Penguin;
Penguin.prototype.move = Fish.prototype.move; // borrow Fish prototype method to 'swim'

// Testing:

new Animal().move();// 'walk'
new Fish().move();// 'swim'
new Bird().move();// 'fly'
var pengo = new Penguin('Pengo');
pengo.name;	//'Pengo'
pengo.move();  	//'swim'
pengo.hasWings; //true;
pengo instanceof Bird; //true
pengo instanceof Animal; //true


// ================ Part b) ================

function Egg(Species) { // var Species stores a Constructor
	this.hatch = function(name) {
		return new Species(name);
	}
}
// This will be applied retroactively to existing animals:
Animal.prototype.layEgg = function() {
	return new Egg(this.constructor);
}

// Testing:
var pengo = new Penguin("Pengo");
var egg = pengo.layEgg();
egg.constructor === Egg; //true
var baby = egg.hatch("Penglet");
baby instanceof Penguin; //true

var nemo = new Fish("Nemo");
egg = nemo.layEgg();
egg.constructor === Egg; //true
baby = egg.hatch("Nemolet");
baby instanceof Fish; //true
