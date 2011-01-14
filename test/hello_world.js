var vows = require('vows')
  , assert = require('assert')
  , p = require('iterparse')
  ;

vows.describe('The First Test').addBatch({
    'Hello World': { topic: p.hello_world
	               , 'equals "Hello World"': function(topic) {
						 assert.equal(topic, "Hello World");
					 }
				   } 
}).export(module);
