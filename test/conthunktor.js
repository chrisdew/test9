var vows = require('vows');
var assert = require('assert');
var p = require('iterparse');

function Cons() {
    this.args = Array.prototype.slice.call(arguments);
}
Cons.prototype.getArgs = function() {
    return this.args;
}

vows.describe('Conthunktor Test').addBatch( {
	'conthunktor' : {
		topic : p.conthunktor,
		'[]' : function(topic) {
            //console.log(Cons, topic);

            var C = p.conthunktor(Cons, []);
            var o = C();
            assert.deepEqual(o.getArgs(), []);
		},
        '[0]' : function(topic) {
            var C = p.conthunktor(Cons, [0]);
            var o = C();
            assert.deepEqual(o.getArgs(), [0]);
        },
		'[0, 1]' : function(topic) {
            var C = p.conthunktor(Cons, [0, 1]);
            var o = C();
            assert.deepEqual(o.getArgs(), [0, 1]);
		},
		'[0, 1, 2, 3, 4, 5, 6, 7]' : function(topic) {
            var C = p.conthunktor(Cons, [0, 1, 2, 3, 4, 5, 6, 7]);
            var o = C();
            assert.deepEqual(o.getArgs(), [0, 1, 2, 3, 4, 5, 6, 7]);
		}
	}
}).export(module);
