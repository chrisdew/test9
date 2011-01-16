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

function SEQUENCE() {
    var args = Array.prototype.slice.call(arguments);
    return { spawn: conthunktor(Sequence, args)
    };
}

function Sequence() {
}
