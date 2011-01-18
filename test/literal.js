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
}).addBatch( {
    'LITERAL("help")' : {
        topic : p.LITERAL("help").spawn(),
        'parses ""' : function(topic) {
            assert.equal(topic.text, "help");
            assert.deepEqual(topic.expecting, ["h", "e", "l", "p"]);
            assert.deepEqual(topic.matching, []);
            assert.deepEqual(topic.failing, []);
            assert.isTrue(topic.open());
            assert.isFalse(topic.matched());
            assert.isFalse(topic.failed());
            assert.deepEqual(topic.completions(), ['help']);
        },
        'parses "h"' : function(topic) {
            topic.push("h");
            assert.equal(topic.text, "help");
            assert.deepEqual(topic.expecting, ["e", "l", "p"]);
            assert.deepEqual(topic.matching, ["h"]);
            assert.deepEqual(topic.failing, []);
            assert.isTrue(topic.open());
            assert.isFalse(topic.matched());
            assert.isFalse(topic.failed());
            assert.deepEqual(topic.completions(), ['elp']);
        },
        'parses "hel"' : function(topic) {
            topic.push("e").push("l");
            assert.equal(topic.text, "help");
            assert.deepEqual(topic.expecting, ["p"]);
            assert.deepEqual(topic.matching, ["h", "e", "l"]);
            assert.deepEqual(topic.failing, []);
            assert.isTrue(topic.open());
            assert.isFalse(topic.matched());
            assert.isFalse(topic.failed());
            assert.deepEqual(topic.completions(), ['p']);
        },
        'parses "hell"' : function(topic) {
            topic.push("l");
            assert.equal(topic.text, "help");
            assert.deepEqual(topic.expecting, ["p"]);
            assert.deepEqual(topic.matching, ["h", "e", "l"]);
            assert.deepEqual(topic.failing, ["l"]);
            assert.isFalse(topic.open());
            assert.isFalse(topic.matched());
            assert.isTrue(topic.failed());
            assert.deepEqual(topic.completions(), []);
        },
        'parses "hello"' : function(topic) {
			assert.throws(function() {
				topic.push("o");
			}, "Force Feeding Exception");
        }
    }
}).export(module);
