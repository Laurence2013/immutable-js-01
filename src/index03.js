/*
	desc-00: Using Flow.js with Immutable Map() object, mixed with Map() and plain Javascript
  desc-01:
	goal:
*/
// @flow
const {Stack, Map, List} = require('immutable');
const {of, from, Observable} = require('rxjs');
const {tap, map, expand, toArray, take, takeWhile, mergeMap} = require('rxjs/operators');

const dataMap00:Map<string, string | number | Array<string>> = Map({
  id: 1,
  name: 'Laurence',
  hobbies: ['weights', 'boxing', 'hiit', 'wrestling', 'judo']
});
const test00: Array<string> = (dataMap00.get('hobbies'): any);
const test01: ?Array<string> | string | number = dataMap00.get('hobbies');

const test02 = dataMap00.get('hobbies');

if(Array.isArray(test02)){
  const test02a:Array<string> = test02;
  console.log('test02a ', test02a);
}
if(test02){
  const test02b:Array<string> | string | number = test02;
  console.log('test02b', test02b);
}
if(Array.isArray(test00)){
  const test00a:Array<string> = test00;
  console.log('test00a ', test00a);
}
if(test00){
  const test00b:Array<string> | string | number = test00;
  console.log('test00b', test00b);
}

console.log(test01);
