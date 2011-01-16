var vows = require('vows');
var assert = require('assert');
var p = require('iterparse');

vows.describe('Literal Test').addBatch( {
	'LITERAL("hello")' : {
		topic : p.LITERAL("hello").spawn(),
		'parses ""' : function(topic) {
			assert.equal(topic.text, "hello");
			assert.deepEqual(topic.expecting, ["h", "e", "l", "l", "o"]);
			assert.deepEqual(topic.matching, []);
			assert.deepEqual(topic.failing, []);
			assert.isTrue(topic.open());
			assert.isFalse(topic.matched());
			assert.isFalse(topic.failed());
			assert.deepEqual(topic.completions(), ['hello']);
		},
		'parses "h"' : function(topic) {
            topic.push("h");
			assert.equal(topic.text, "hello");
			assert.deepEqual(topic.expecting, ["e", "l", "l", "o"]);
			assert.deepEqual(topic.matching, ["h"]);
			assert.deepEqual(topic.failing, []);
			assert.isTrue(topic.open());
			assert.isFalse(topic.matched());
			assert.isFalse(topic.failed());
			assert.deepEqual(topic.completions(), ['ello']);
		},
		'parses "hell"' : function(topic) {
            topic.push("e").push("l").push("l");
			assert.equal(topic.text, "hello");
			assert.deepEqual(topic.expecting, ["o"]);
			assert.deepEqual(topic.matching, ["h", "e", "l", "l"]);
			assert.deepEqual(topic.failing, []);
			assert.isTrue(topic.open());
			assert.isFalse(topic.matched());
			assert.isFalse(topic.failed());
			assert.deepEqual(topic.completions(), ['o']);
		},
		'parses "hello"' : function(topic) {
            topic.push("o");
			assert.equal(topic.text, "hello");
			assert.deepEqual(topic.expecting, []);
			assert.deepEqual(topic.matching, ["h", "e", "l", "l", "o"]);
			assert.deepEqual(topic.failing, []);
			assert.isFalse(topic.open());
			assert.isTrue(topic.matched());
			assert.isFalse(topic.failed());
			assert.deepEqual(topic.completions(), []);
		}
	}
}).export(module);
