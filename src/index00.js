// @flow
function foo(x: ?number): number {
  if (x) {
    return x * 2;
  }
  return 0;
}
