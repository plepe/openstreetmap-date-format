const assert = require('assert')

const parse = require('../src/parse')
describe('Default locale -> load "en"', () => {
  it('locale', () => {
    assert.equal(parse.locale(), 'en')
  })

  it('day', () => {
    assert.equal(parse('1901-02-03'), 'February 3, 1901')
  })
})
