var vows = require('vows');
var assert = require('assert');
var p = require('iterparse');

var LITERAL = p.LITERAL;
var SEQUENCE = p.SEQUENCE;

vows.describe('Sequence Test').addBatch( {
	'SEQUENCE(LITERAL("hello"), LITERAL(" "), LITERAL("world"))' : {
		topic : SEQUENCE(LITERAL("hello"), LITERAL(" "), LITERAL("world")).spawn(),
		'parses ""' : function(topic) {
			assert.isTrue(topic.open());
			assert.isFalse(topic.matched());
			assert.isFalse(topic.failed());
			assert.deepEqual(topic.completions(), ['hello world']);
		},
		'parses "h"' : function(topic) {
            topic.push("h");
			assert.isTrue(topic.open());
			assert.isFalse(topic.matched());
			assert.isFalse(topic.failed());
			assert.deepEqual(topic.completions(), ['ello world']);
		}
	}
}).export(module);
