/*
	desc-00: Create an Immutable.js Map() object with plain js array and object inside.
  desc-01: immutable-map, immutable-map-getIn, rxjs-map
	goal:
*/
// @flow
const {Stack, Map, List} = require('immutable');
const {of, from, Observable, EMPTY} = require('rxjs');
const {tap, map, filter, expand, toArray, take, takeWhile, mergeMap} = require('rxjs/operators');

const obj00:Map<string | number | Array<number | Object>, number | Object> = Map({
  a: 1,
  b: {
    c: 2,
    d: [3, 4, 5]
  },
  e: [6, {h:99}, {f:8 , g:10}]
});
const result00$ = of(obj00).pipe(
  map(obj99 => obj99.get('e'))
);
const result01$ = of(obj00).pipe(
  map(obj99 => obj99.getIn(['e', 0]))
);
result01$.subscribe(console.log);
