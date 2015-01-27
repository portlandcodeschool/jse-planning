// Part b)
var array = {
	length:0,

	push: function(val) {
    	this[this.length] = val;
    	this.length += 1;
    	return this.length;
	},

	pop: function() {
    	if (this.length<1)
    			return undefined; //nothing to pop
    	this.length -= 1;
    	var lastVal = this[this.length]; //keep copy of last item
    	delete this[this.length]; // destroy last item
    	return lastVal; //return copy
    },

    join: function(delim) {
    	if (delim === undefined)
    		delim = ',';  // use comma as default delimiter if none is provided

    	var str = ''; //accumulate result string here
    	for (var i=0; i<this.length; i++) {
    		if (this[i]!==undefined) // unless element is undefined...
    			str += this[i];	// append it to str
    		if (i < this.length - 1) // if another element follows...
    			str += delim;  // append delimiter
    	}
    	return str;
    }
}
