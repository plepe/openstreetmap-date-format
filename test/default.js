/* global describe, it */

const assert = require('assert')

const format = require('../src/format')
describe('Default locale -> load "en"', () => {
  it('locale', () => {
    assert.strictEqual(format.locale(), 'en')
  })

  it('day', () => {
    assert.strictEqual(format('1901-02-03'), 'February 3, 1901')
  })
})
