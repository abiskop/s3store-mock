
module.exports = createMockStore;

function createMockStore() {
  var dict = {};

  return {
    writeObject: writeObject,
    readObject: readObject,
    deleteObject: deleteObject,
    readKeys: readKeys
  };

  function writeObject(key, data, cb) {
    dict[key] = data;
    cb();
  }

  function readObject(key, cb) {
    var offer = dict[key];
    if (offer === undefined) {
      var error = new Error('not found');
      error.statusCode = 404;
      return cb(error);
    }
    cb(null, offer);
  }

  function deleteObject(key, cb) {
    delete dict[key];
    cb();
  }

  function readKeys(cb) {
    var keys = Object.keys(dict);
    cb(null, keys);
  }
}
