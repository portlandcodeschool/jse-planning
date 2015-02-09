var MemoryBoard = (function() {
	function Ctor(values,matchFn,displayFn,endgameFn) {
		//...
	}
	//...

	return Ctor;
})();


// ----Example set 1:----

// card values:
var food = ['apple','artichoke','banana','blueberry','carrot','cranberry'];
// match callback:
var sameInitial = function(str1,str2) {
	return str1[0]===str2[0];
}
// end game callback:
var gameoverFn = function() {console.log("You win!")}

var game = new MemoryBoard(food,sameInitial,null,gameoverFn);

// ----Example set 2:----

// card values (each card is a pair, array [name,num]) :
var animals = [['dog',1],['puppy',1],['cat',2],['kitten',2],['frog',3],['tadpole',3],['bird',4],['chick',4]];
// match callback:
var sameSpecies = function(animal1,animal2) { // check if num matches:
	return (animal1[1]===animal2[1]);
}
// display callback:
var showName = function(animal) { // display only name:
	return animal[0];
}

var game = new MemoryBoard(animals,sameSpecies,showName);

