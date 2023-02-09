module.exports = {
  max: 500,
  length: function (n, key) {
    return n * 2 + key.length
  },
  dispose: function (key, n) {
    n.close()
  },
  maxSize: 1000 * 60 * 60
}
