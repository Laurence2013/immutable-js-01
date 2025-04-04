/*
	desc-00: Give code examples using RxJs zip() operator. Tag rxjs-zip, immutable-orderedMap
  desc-01: Example 3: Zipping and transforming OrderedMaps with a projection function.
  desc-02: Example 4: Zipping and filtering OrderedMaps.
  desc-03: Example 1: Filtering an OrderedMap. No RxJs here just pure Immutable.js OrderedMap() and its filter() method
  desc-04: Example 3: Using RxJS zip() and filter().
	goals:
*/
// @flow
const {Stack, Map, List, OrderedMap, fromJS} = require('immutable');
const {of, interval, from, zip, Observable, EMPTY} = require('rxjs');
const {tap, map, filter, take, reduce} = require('rxjs/operators');

// desc-01
const items$ = of(OrderedMap({ item1: { price: 10, quantity: 2 }, item2: { price: 20, quantity: 1 } }));
const discounts$ = of(OrderedMap({ item1: 0.1, item2: 0.2 }));
const result00$ = zip(items$, discounts$, (items, discounts) => {
  return items.map((item, key) => {
    const discount = discounts.get(key) || 0;
    return {
      ...item, 
      test: 'jello',
      discountedPrice: item.price * (1 - discount)
    }
  })
});
// result00$.subscribe(discountedItems => console.log(discountedItems.toJS()))

// desc-02
const data00$ = of(OrderedMap({
  user1: { age: 25, city: 'New York' },
  user2: { age: 30, city: 'London' },
  user3: { age: 22, city: 'Tokyo' },
}));
const filterAges00$ = of(19, 28, 20);
const result01$ = zip(data00$, filterAges00$, (data00, filterAges00) => {
  return data00.filter(data => data.age > filterAges00)
});
const result01a$ = zip(data00$, filterAges00$, (data00, filterAges00) => data00.filter(data => data.age > filterAges00));
// result01a$.subscribe(val99 => console.log(val99.toJS()));

// desc-03
const myOrderedMap = OrderedMap({
  'a': 1,
  'b': 2,
  'c': 3,
  'd': 4,
  'e': 5,
});
const result00 = myOrderedMap.filter((val, key) => val % 2 === 0);
const result01 = myOrderedMap.filter((val, key) => val % 2 === 0 && key !== 'd');
// console.log(result01.toJS());

// desc-04
const keys$ = from(['a', 'b', 'c', 'd', 'e']);
const values$ = from([1, 2, 3, 4, 5]);
const result02$ = zip(keys$, values$).pipe(
  map(pair => OrderedMap([pair])),
  //map(orderedMap => orderedMap.filter(val => val % 2 === 0)),
  map(obj99 => obj99.toJS())
);
const result02a$ = zip(keys$, values$).pipe(
  map(val99 => OrderedMap(val99)),
  map(val98 => val98.toJS())
);
const result02b$ = zip(keys$, values$).pipe(
  map(val98 => val98)
);
const result02c$ = zip(keys$, values$, (keys, values) => { 
  return {keys, values} 
});
result02$.subscribe(console.log);
//result02a$.subscribe(val99 => console.log(val99.toJS()));
