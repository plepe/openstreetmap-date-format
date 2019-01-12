const assert = require('assert')

const parse = require('../src/parse')

describe('parse', () => {
  it ('pure', () => {
    assert.equal(parse('1901-02-03'), '3. Februar 1901')
    assert.equal(parse('1901-02'), 'Februar 1901')
  })

  it ('before', () => {
    assert.equal(parse('before 1901-02'), 'vor Februar 1901')
    assert.equal(parse('before 1960s'), 'vor 1960er Jahre')
  })

  it ('range', () => {
    assert.equal(parse('C19..1901-02'), 'zwischen 19. Jahrhundert und Februar 1901')
    assert.equal(parse('1901-02..2018-12-24'), 'zwischen Februar 1901 und 24. Dezember 2018')
  })

  it ('early/mid/late', () => {
    assert.equal(parse('early 1901-02'), 'Anfang Februar 1901')
    assert.equal(parse('mid C17'), 'Mitte 17. Jahrhundert')
  })

})
