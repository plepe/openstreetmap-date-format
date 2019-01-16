/* global describe, it */
const assert = require('assert')

const format = require('../src/format')

describe('Locale "de"', () => {
  it('locale', () => {
    format.locale('de')
    assert.strictEqual(format.locale(), 'de')
  })

  it('day', () => {
    assert.strictEqual(format('1901-02-03'), '3. Februar 1901')
    assert.strictEqual(format('1901-02-03', { format: 'short' }), '3. Feb. 1901')
  })

  it('month', () => {
    assert.strictEqual(format('1901-02'), 'Februar 1901')
    assert.strictEqual(format('1901-02', { format: 'short' }), 'Feb. 1901')
  })

  it('year', () => {
    assert.strictEqual(format('1954'), '1954')
  })

  it('decade', () => {
    assert.strictEqual(format('1950s'), '1950er Jahre')
    assert.strictEqual(format('1950s', { format: 'short' }), '1950er')
  })

  it('century', () => {
    assert.strictEqual(format('c15'), '15. Jahrhundert')
    assert.strictEqual(format('c15', { format: 'short' }), '15. Jh.')
  })

  it('circa', () => {
    assert.strictEqual(format('~c15'), 'ca. 15. Jahrhundert')
    assert.strictEqual(format('~2010-10'), 'ca. Oktober 2010')
    assert.strictEqual(format('~2010-10', { format: 'short' }), 'ca. Okt. 2010')
  })

  it('pure', () => {
    assert.strictEqual(format('1901-02-03'), '3. Februar 1901')
    assert.strictEqual(format('1901-02'), 'Februar 1901')
  })

  it('before', () => {
    assert.strictEqual(format('before 1901-02'), 'vor Februar 1901')
    assert.strictEqual(format('before 1960s'), 'vor 1960er Jahre')
  })

  it('range', () => {
    assert.strictEqual(format('C19..1901-02'), 'zwischen 19. Jahrhundert und Februar 1901')
    assert.strictEqual(format('1901-02..2018-12-24'), 'zwischen Februar 1901 und 24. Dezember 2018')
    assert.strictEqual(format('1901-02..2018-12-24', { format: 'short' }), 'zw. Feb. 1901 und 24. Dez. 2018')
  })

  it('early/mid/late', () => {
    assert.strictEqual(format('early 1901-02'), 'Anfang Februar 1901')
    assert.strictEqual(format('mid C17'), 'Mitte 17. Jahrhundert')
  })

  it('circa', () => {
    assert.strictEqual(format('~c15'), 'ca. 15. Jahrhundert')
    assert.strictEqual(format('~2010-10'), 'ca. Oktober 2010')
    assert.strictEqual(format('1910..~2010-10'), 'zwischen 1910 und ca. Oktober 2010')
  })

  it('BC', () => {
    assert.strictEqual(format('~1000 BC'), 'ca. 1000 v.Chr.')
    assert.strictEqual(format('C1 BC'), '1. Jahrhundert v.Chr.')
    assert.strictEqual(format('C2 BCE', { format: 'short' }), '2. Jh. v.Chr.')
    assert.strictEqual(format('~1500 BC..~1000 BC'), 'zwischen ca. 1500 v.Chr. und ca. 1000 v.Chr.')
    assert.strictEqual(format('1500..1000 BC'), 'zwischen 1500 v.Chr. und 1000 v.Chr.')
    assert.strictEqual(format('~630BC'), 'ca. 630 v.Chr.')
  })

  it('other', () => {
    assert.strictEqual(format('foobar'), 'foobar')
    assert.strictEqual(format('foobar..2000-01'), 'zwischen foobar und Januar 2000')
  })
})
