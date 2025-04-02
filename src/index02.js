// @flow
// desc-00: Combining RxJS expand() with Immutable.js Stack.of()
const {Stack} = require('immutable');
const {of, from, Observable} = require('rxjs');
const {tap, map, expand, toArray, take, takeWhile, mergeMap} = require('rxjs/operators');

const source00$ = of(1,2,3,4,5);
const result00$ = source00$.pipe(
  map(val99 => {
    let stack99 = Stack.of(0, 0);
    stack99 = stack99.unshift(val99 + 1);

    return stack99.toArray();
  })
);
const initValue = 1;
const limit = 5;
const result01$ = of(initValue).pipe(
  expand(val99 => {
    const nextVal99 = val99 + 1;
    return of(nextVal99);
  }),
  takeWhile(val98 => val98 <= limit)
);
// result01$.subscribe(console.log);

// desc-00
const initStack00 = Stack.of(1,2,3,4,5,6,7,8,9);
const result02$ = of(initStack00).pipe(
  expand(stack99 => {
    if(stack99.isEmpty()){
      return of(stack99);
    };
    const peeked00 = stack99.peek();
    console.log(`Popped value: ${peeked00}`);
    return of(stack99.pop());
  }),
  takeWhile(stack98 => !stack98.isEmpty())
);
result02$.subscribe(stack97 => console.log(stack97.toJS()));
