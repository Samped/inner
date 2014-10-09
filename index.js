'use strict';

/**
 * Get the value of a deeply nested property
 *
 * @param  {any}     object The object to drill into.
 * @param  {Array}   path   List of properties to dig through.
 * @param  {Boolean} create Should properties down the path be created if
 *                          they do not exist?
 * @return {any}            Value inside object at path.
 */
function get(object, path, create) {
  while (path.length) {
    var key = path.shift();

    if (!object || typeof object != 'object') {
      return undefined;
    }

    if (!(key in object) && create) {
      object[key] = {};
    }

    object = object[key];
  }

  return object;
}

/**
 * Set a deeply nested property in an object, creating intermediary
 * objects if needed.
 *
 * @param {Object}   object Target object.
 * @param {Array}    path   List of keys.
 * @param {any}      value  Value to set in object at path.
 * @return {Boolean}        Was the value set successfully?
 */
function set(object, path, value) {
  var key = path.pop();

  object = get(object, path, true);

  if (object && typeof object == 'object') {
    object[key] = value;
    return true;
  }

  return false;
}

/**
 * Check for the presence of a deeply nested key.
 *
 * @param  {Object}  object The object to check.
 * @param  {Array}   path   List of keys to go through.
 * @return {Boolean}        Does path exist in object?
 */
function has(object, path) {
  var key = path.pop();

  object = get(object, path);

  return object && typeof object == 'object' && key in object;
}

module.exports = {
  get: get,
  set: set,
  has: has
};
