/*
	desc-00: Create an Immutable.js Map() object with plain js array and object inside.
  desc-01: immutable-map, immutable-map-getIn, rxjs-map
	goals:
*/
// @flow
const {Stack, Map, List, fromJS} = require('immutable');
const {of, from, Observable, EMPTY} = require('rxjs');
const {tap, map, filter, expand, toArray, take, takeWhile, mergeMap} = require('rxjs/operators');

interface mainObj {
  name: string;
  details: {
    items: Array<[id: number, info: {
      type: string;
      value: number;
    }]>
  };
  category: {
    title: string;
    settings: {
      active: boolean;
      count: number;
    }
  }
}

const nestedStructure00:mainObj  = {
  name: "Parent",
  details: {
    items: [
      { id: 1,
        info: {
          type: "child",
          value: 10
        }},
      { id: 2,
        info: {
          type: "child",
          value: 20
        }}
    ],
    category: { title: "Group",
      settings: {
        active: true,
        count: 2
      }}
  }
};
const result00$ = of(nestedStructure00).pipe(
  expand(obj99 => typeof obj99.details === 'object' ? of(obj99.details) : EMPTY),
  mergeMap(obj98 => of(obj98.items).pipe(
    filter(obj97 => obj97),
    map(obj96 => obj96.map(obj95 => obj95.info.type))
  ))
);
const result01 = fromJS(nestedStructure00).toMap();
const result01$ = of(result01).pipe(
  map(obj99 => obj99.get('details').get('items')),
  map(obj98 => obj98.map(obj97 => obj97.get('info').get('type')))
);
const result02$ = of(nestedStructure00).pipe(
  map(obj99 => obj99.details),
  map(obj98 => fromJS(obj98).toMap()),
  map(obj97 => obj97.get('items').map(obj96 => obj96.get('info').get('type')))
);
result02$.subscribe(val00 => console.log(val00.toJS()));
