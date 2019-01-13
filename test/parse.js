const assert = require('assert')

const parse = require('../src/parse')
parse.locale('de')

describe('parse', () => {
  it ('day', () => {
    let result = parse('1901-02-03')

    assert.equal(result, '3. Februar 1901')
  })

  it ('month', () => {
    let result = parse('1901-02')

    assert.equal(result, 'Februar 1901')
  })

  it ('year', () => {
    let result = parse('1954')

    assert.equal(result, '1954')
  })

  it ('decade', () => {
    let result = parse('1950s')

    assert.equal(result, '1950er Jahre')
  })

  it ('century', () => {
    let result = parse('c15')

    assert.equal(result, '15. Jahrhundert')
  })

  it ('circa', () => {
    assert.equal(parse('~c15'), 'ca. 15. Jahrhundert')
    assert.equal(parse('~2010-10'), 'ca. Oktober 2010')
  })

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

  it ('circa', () => {
    assert.equal(parse('~c15'), 'ca. 15. Jahrhundert')
    assert.equal(parse('~2010-10'), 'ca. Oktober 2010')
    assert.equal(parse('1910..~2010-10'), 'zwischen 1910 und ca. Oktober 2010')
  })

  it ('other', () => {
    assert.equal(parse('foobar'), 'foobar')
    assert.equal(parse('foobar..2000-01'), 'zwischen foobar und Januar 2000')
  })
})
