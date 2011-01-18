var sys = require("sys");

exports.hello_world = "Hello World";

function conthunktor(Constructor, args) {
    //var args = Array.prototype.slice.call(arguments, 1);
    return function() {
         //console.log(Constructor);

         var Temp = function(){}, // temporary constructor
             inst, ret; // other vars

         // Give the Temp constructor the Constructor's prototype
         //console.log(Constructor);
         Temp.prototype = Constructor.prototype;

         // Create a new instance
         inst = new Temp;

         // Call the original Constructor with the temp
         // instance as its context (i.e. its 'this' value)
         ret = Constructor.apply(inst, args);

         // If an object has been returned then return it otherwise
         // return the original instance.
         // (consistent with behaviour of the new operator)
         return new Object(ret) === ret ? ret : inst;
    }
}
exports.conthunktor = conthunktor;

function LITERAL(text) {
	return { spawn: function() { return new Literal(text); }
	};
}

function Literal(text) {
	this.text = text;
	this.expecting = text.split("");
	this.matching = [];
	this.failing = [];
}

Literal.prototype.push = function(char) {
	if (!this.open()) {
		throw "Force Feeding Exception";
	}
	
	if (char === this.expecting[0]) {
		this.matching.push(this.expecting.shift());
	} else {
		this.failing.push(char);
    }
    return this;
}

Literal.prototype.open = function() { 
    if (this.failed()) {
        return false;
    } else {
        return this.expecting.length !== 0; 
    }
}

Literal.prototype.matched = function() { return (this.expecting.length === 0); }
Literal.prototype.failed = function() { return (this.failing.length !== 0); }

Literal.prototype.completions = function() { 
    if (this.expecting.length > 0 && !this.failed()) {
        return [this.expecting.join("")]; 
    } else {
        return [];
    }
}

exports.LITERAL = LITERAL;


// A sequence is a group of two or more parsers, each which must produce a 
// match before the seqeunce is considered matched.
function SEQUENCE() {
    var args = Array.prototype.slice.call(arguments);
    return { spawn: conthunktor(Sequence, args)
    };
}

function Sequence() {
	this.pre_children = Array.prototype.slice.call(arguments);
	this.children = [];
	this.started = false;
	
	if (!this.started) {
		for(var i in this.pre_children) {
			this.children.push(this.pre_children[i].spawn());
		}
		this.started = true;
	}
}


Sequence.prototype.push = function(char) {

	
	if (!this.open()) {
		throw "Force Feeding Exception";
	}
	
	// decide which child to push the char into
	for(var i in this.pre_children) {
		var child = this.children[i];
		//console.log("children", this.children, ":");
		if (child.open()) {
			child.push(char);
			break;
		}
	}
	return this;
}
Sequence.prototype.open = function() {
	if (!this.started) {
		return true;
	}
	for(var i in this.children) {
		if (this.children[i].open()) {
			return true;
		}
	}
	return false;
}
Sequence.prototype.matched = function() {
	if (!this.started) {
		return false;
	}
	for(var i in this.children) {
		if (!this.children[i].matched()) {
			return false;
		}
	}
	return true;
}
Sequence.prototype.failed = function() {
	if (!this.started) {
		return false;
	}
	for(var i in this.children) {
		//console.log("i", i, this.children[i].failing);
		if (this.children[i].failed()) {
			return true;
		}
	}
	return false;
}

// The completions from a sequence are *simply* all the combinations of
// completions from all the matched children. This is exponential in nature and
// will hopefully work for simple sentences.  It will not work for longer input.
Sequence.prototype.completions = function() {
	if (!this.open()) {
		throw "Not Open";
	}
	if (this.failed()) {
		return [];
	}
	
	var all_comps = [""];
	//console.log("foo");
	for(var i in this.children) {
		var comps = this.children[i].completions();
		var old_all_comps = all_comps;
		all_comps = [];

		console.log("foo", JSON.stringify(old_all_comps));
		for (var j in old_all_comps) {
			console.log("foo2");
			if (comps.length === 0) {
				all_comps.push("");
			} else {
				for (var k in comps) {
					console.log("foo3");
					all_comps.push(old_all_comps[j] + comps[k]);
				}
			}
		}
		console.log("foo4", JSON.stringify(all_comps));
	}
	
	return all_comps;	
}

exports.SEQUENCE = SEQUENCE;