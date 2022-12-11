/* global describe, it */
const locale = 'nl'
const assert = require('assert')

const format = require('../src/format')
describe(`Locale "${locale}"`, () => {
  it('locale', () => {
    format.locale(locale)
    assert.strictEqual(format.locale(), locale)
  })

  it('day', () => {
    assert.strictEqual(format('1901-02-03'), '3 februari 1901')
    assert.strictEqual(format('1901-02-03', { format: 'short' }), '3 feb. 1901')
  })

  it('month', () => {
    assert.strictEqual(format('1901-02'), 'februari 1901')
    assert.strictEqual(format('1901-02', { format: 'short' }), 'feb. 1901')
  })

  it('year', () => {
    assert.strictEqual(format('1954'), '1954')
  })

  it('decade', () => {
    assert.strictEqual(format('1950s'), 'de jaren 1950')
  })

  it('century', () => {
    assert.strictEqual(format('c1'), '1e eeuw')
    assert.strictEqual(format('c2'), '2e eeuw')
    assert.strictEqual(format('c3'), '3e eeuw')
    assert.strictEqual(format('c4'), '4e eeuw')
    assert.strictEqual(format('c11'), '11e eeuw')
    assert.strictEqual(format('c12'), '12e eeuw')
    assert.strictEqual(format('c21'), '21e eeuw')
  })

  it('circa', () => {
    assert.strictEqual(format('~c15'), 'ca. 15e eeuw')
    assert.strictEqual(format('~2010-10'), 'ca. oktober 2010')
    assert.strictEqual(format('~2010-10', { format: 'short' }), 'ca. okt. 2010')
  })

  it('pure', () => {
    assert.strictEqual(format('1901-02-03'), '3 februari 1901')
    assert.strictEqual(format('1901-02'), 'februari 1901')
  })

  it('before', () => {
    assert.strictEqual(format('before 1901-02'), 'voor februari 1901')
    assert.strictEqual(format('before 1960s'), 'voor de jaren 1960')
  })

  it('range', () => {
    assert.strictEqual(format('C19..1901-02'), 'tussen de 19e eeuw en februari 1901')
    assert.strictEqual(format('1901-02..2018-12-24'), 'tussen februari 1901 en 24 december 2018')
  })

  it('early/mid/late', () => {
    assert.strictEqual(format('early 1901-02'), 'begin februari 1901')
    assert.strictEqual(format('mid C17'), 'midden 17e eeuw')
  })

  it('circa', () => {
    assert.strictEqual(format('~c15'), 'ca. 15e eeuw')
    assert.strictEqual(format('~2010-10'), 'ca. oktober 2010')
    assert.strictEqual(format('1910..~2010-10'), 'tussen 1910 en ca. oktober 2010')
  })

  it('BC', () => {
    assert.strictEqual(format('~1000 BC'), 'ca. 1000 v. Chr.')
    assert.strictEqual(format('C1 BC'), '1e eeuw v. Chr.')
    assert.strictEqual(format('C2 BCE'), '2e eeuw v. Chr.')
    assert.strictEqual(format('~1500 BC..~1000 BC'), 'tussen ca. 1500 v. Chr. en ca. 1000 v. Chr.')
    assert.strictEqual(format('1500..1000 BC'), 'tussen 1500 v. Chr. en 1000 v. Chr.')
    assert.strictEqual(format('~630BC'), 'ca. 630 v. Chr.')
  })

  it('other', () => {
    assert.strictEqual(format('foobar'), 'foobar')
    assert.strictEqual(format('foobar..2000-01'), 'tussen foobar en januari 2000')
  })
})
