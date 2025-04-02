// @flow

const { Stack } = require('immutable');

const myStack00:Stack<number> = Stack.of(1,2,3);
const myStack01:Stack<number[]> = Stack.of([1,2],[3,4]);
const myStack02:Stack<string[]> = Stack.of(['a','b'],['c','d']);
const myStack03:Stack<{a:number, b:number, c:number}> = Stack.of({a:1, b:2, c:3});

const result00 = myStack03.map(val99 => val99.b);

console.log(result00.toJS());
