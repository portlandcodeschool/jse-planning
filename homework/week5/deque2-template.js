// Part a): modify factory to use non-shared (instance-specific) methods
//  which have access to private variables:

function makeDeque(values) {

	// These vars are private, local to scope of makeDeque,
	//  only accessible to functions defined in makeDeque:
	var array = values.slice(); //copy values
	var absent = []; //list of missing elements


	// Each function below is specific to one deque, with access to the private vars

	// ---- Internal use only ----
	function readmit(val) {
		//...
	}

	// ---- Public instance methods: -----

	function top() {
	}

	function bottom() {
	}

	// etc...


	return { //one deque instance...
			top : top,
			bottom : bottom,
			//etc
	};

} //end makeDeque


// Part b): Turn this file into an IIFE module!
