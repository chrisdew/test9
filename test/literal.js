var vows = require('vows');
var assert = require('assert');
var p = require('iterparse');

vows.describe('Literal Test').addBatch( {
	'LITERAL("hello")' : {
		topic : p.LITERAL("hello").spawn(),
		'parses ""' : function(topic) {
			assert.equal(topic.text, "hello");
			assert.deepEqual(topic.expecting, ["o", "l", "l", "e", "h"]);
			assert.deepEqual(topic.matching, []);
			assert.deepEqual(topic.failing, []);
			assert.isTrue(topic.open());
			assert.isFalse(topic.matched());
			assert.isFalse(topic.failed());
			assert.deepEqual(topic.completions(), ['hello']);
		}
	}
}).export(module);
