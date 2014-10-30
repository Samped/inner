'use strict';

var test = require('tape');
var inner = require('./');

test('Get nested value', function (assert) {
  assert.plan(5);
  assert.equal(inner.get({a: 1}, ['b']), undefined, 'undefined');
  assert.equal(inner.get('something', ['b']), undefined, 'non-object');
  assert.equal(inner.get({a: 1}, ['a']), 1, '1 level');
  assert.equal(inner.get({a: {b: 2}}, ['a', 'b']), 2, '2 levels');
  assert.equal(inner.get({a: [4, 5, 6]}, ['a', '1']), 5, 'array');
});

test('Get empty path', function (assert) {
  assert.plan(1);

  assert.deepEqual(inner.get({a: 1}, []), {a: 1});
});

test('Set nested value', function (assert) {
  var data = {};

  assert.plan(4);

  inner.set(data, ['a'], 'alpha');
  assert.equal(data.a, 'alpha', '1 level');

  inner.set(data, ['b', 'c'], 'beta');
  assert.equal(data.b.c, 'beta', '2 levels');

  assert.equal(inner.set({}, ['a'], 1), true, 'successful set');
  assert.equal(inner.set(5, ['a'], 1), false, 'unsuccessful set');
});

test('Check existence of nested value', function (assert) {
  var data = {
    a: 1,
    b: undefined
  };

  assert.plan(3);

  assert.equal(inner.has(data, ['a']), true);
  assert.equal(inner.has(data, ['b']), true);
  assert.equal(inner.has(data, ['c']), false);
});

test('Path array does not mutate', function (assert) {
  var data = {a: {b: {c: 'yo'}}};
  var path = ['a', 'b', 'c'];

  assert.plan(3);

  inner.get(data, path);
  assert.deepEqual(path, ['a', 'b', 'c'], 'get');
  inner.set(data, path, 'hi');
  assert.deepEqual(path, ['a', 'b', 'c'], 'set');
  inner.has(data, path);
  assert.deepEqual(path, ['a', 'b', 'c'], 'has');
});
