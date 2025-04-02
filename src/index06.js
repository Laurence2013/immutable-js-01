/*
	desc-00: Give code examples using RxJs zip() operator. Tag rxjs-zip, immutable-orderedMap
  desc-01: Example 1: Zipping two simple observables
  desc-02: Example 2: Zipping observables with different emission rates
  desc-03: Example 3: Zipping observables with different value types and mapping the result
  desc-04: Example 4: Zipping with a projection function for more complex combinations
  desc-05: Example 4.1: Zipping with a projection function to create objects with calculated properties.
  desc-06: Example 4.3: Zipping with a projection function to combine data from API responses (simulated)
  desc-07: Example 4.4: Zipping with a projection function for conditional logic
  desc-08: Example 1: Zipping observables with Immutable.js OrderedMaps. With RxJs reduce() and map() operators
  desc-09: Example 2: Zipping multiple OrderedMaps and combining them, with RxJs merge() operator
	goals:
*/
// @flow
const {Stack, Map, List, OrderedMap, fromJS} = require('immutable');
const {of, interval, from, zip, Observable, EMPTY} = require('rxjs');
const {tap, map, filter, take, reduce} = require('rxjs/operators');

// desc-01
const obs00$ = of(1, 2, 3);
const obs01$ = of('a', 'b', 'c');
const result00$ = zip(obs00$, obs01$);
// result00$.subscribe(([nums, letters]) => console.log(`Number: ${nums} and Letter: ${letters}`))

// desc-02
const source00$ = interval(1000).pipe(take(5));
const source01$ = interval(2000).pipe(take(5), map(val => val * 10));
const result01$ = zip(source00$, source01$);
// result01$.subscribe(console.log);

// desc-03
const names$ = of("Alice", "Bob", "Charlie");
const ages$ = of(25, 30, 35);
const cities$ = of("New York", "London", "Tokyo");
const result02$ = zip(names$, ages$, cities$).pipe(
  map(([name, age, city]) => `Name: ${name}, Age: ${age}, City: ${city}`)
);
// result02$.subscribe(console.log);

// desc-04
const numbers00$ = of(11, 12, 23);
const letters00$ = of('AA', 'BB', 'CC');
const result03$ = zip(numbers00$, letters00$, (numbers, letters) => ({numbers, letters}));
// result03$.subscribe(console.log);S

// desc-05
const quantities00$ = of(1, 2, 3);
const prices00$ = of(10, 20, 30);
const result04$ = zip(quantities00$, prices00$, (quantities, prices) => ({
  quantities,
  prices,
  total: quantities * prices
}))
// result04$.subscribe(console.log);

// desc-06
const userIds00$ = of(1, 2, 3);
const userData00$ = of(
  { name: 'Alice', city: 'New York' },
  { name: 'Bob', city: 'London' },
  { name: 'Charlie', city: 'Tokyo' }
);
const result05$ = zip(userIds00$, userData00$, (userIds, userData) => ({
  userIds, 
  ...userData,
  userInfo: `IDs: ${userIds}, Name: ${userData.name}, City: ${userData.city}`
}));
// result05$.subscribe(console.log);

// desc-07
const scores00$ = of(85, 60, 92);
const passingScores00$ = of(70, 70, 70);
const result06$ = zip(scores00$, passingScores00$, (scores, passingScores) => ({
  exam: scores > passingScores ? {scores, result: 'Passed'} : {scores, result: 'Failed'}
}));
const result06a$ = zip(scores00$, passingScores00$, (scores, passingScores) => (
  scores > passingScores ? {scores, result: 'Passed'} : {scores, result: 'Failed'}
));
// result06a$.subscribe(console.log);

// desc-08
const keys00$ = of('name', 'age', 'city');
const values00$ = of('Alice', 30, 'New York');
const result07$ = zip(keys00$, values00$).pipe(
  reduce((acc, [key, value]) => acc.set(key, value), OrderedMap()),
  map(data99 => data99.toJS())
);
// result07$.subscribe(console.log);

// desc-09
const map00$ = of(OrderedMap({ a: 1, b: 2 }));
const map01$ = of(OrderedMap({ b: 3, c: 4 }));
const result08$ = zip(map00$, map01$).pipe(
  map(([map00, map01]) => map00.merge(map01)),
  map(data99 => data99.toJS())
);
result08$.subscribe(console.log);

