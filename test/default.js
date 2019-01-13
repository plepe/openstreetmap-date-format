/* global describe, it */

const assert = require('assert')

const parse = require('../src/parse')
describe('Default locale -> load "en"', () => {
  it('locale', () => {
    assert.strictEqual(parse.locale(), 'en')
  })

  it('day', () => {
    assert.strictEqual(parse('1901-02-03'), 'February 3, 1901')
  })
})
