/* eslint-env mocha */

var lib = require('./')('linusu-test')
var fs = require('fs')
var assert = require('assert')

var payload = { n: 1337 }

describe('application-config', function () {
  it('should write', function (done) {
    lib.write(payload, done)
  })

  it('should read', function (done) {
    lib.read(function (err, data) {
      assert.ifError(err)
      assert.equal(payload.n, data.n)

      done()
    })
  })

  it('should export path to file', function (done) {
    assert.equal(typeof lib.filePath, 'string')

    fs.readFile(lib.filePath, function (err, raw) {
      assert.ifError(err)
      assert.deepEqual(JSON.parse(raw.toString()), payload)

      done()
    })
  })

  it('should trash', function (done) {
    lib.trash(done)
  })

  it('should be gone', function (done) {
    lib.read(function (err, data) {
      assert.ifError(err)
      assert.equal(undefined, data.n)

      done()
    })
  })

  it('should throw', function () {
    assert.throws(function () {
      lib.write()
    }, TypeError)

    assert.throws(function () {
      lib.write(null)
    }, TypeError)

    assert.throws(function () {
      lib.write(undefined)
    }, TypeError)

    assert.throws(function () {
      lib.write(1)
    }, TypeError)

    assert.throws(function () {
      lib.write('test')
    }, TypeError)
  })
})
