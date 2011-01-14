exports.hello_world = "Hello World";

function LITERAL(text) {
	return { spawn: function() { return new Literal(text); }
	};
}

function Literal(text) {
	this.text = text;
	this.expecting = text.split("").reverse();
	this.matching = [];
	this.failing = [];
}

Literal.prototype.push = function(char) {
	if (char === this.expecting[0]) {
		this.matching.push(this.expecting.pop());
	}
}

Literal.prototype.open = function() { return (this.expecting.length !== 0); }
Literal.prototype.matched = function() { return (this.matching.length === 0); }
Literal.prototype.failed = function() { return (this.failing.length !== 0); }
Literal.prototype.completions = function() { return [this.expecting.join("")]; }


exports.LITERAL = LITERAL;