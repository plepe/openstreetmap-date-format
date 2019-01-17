/* global describe, it */
const locale = 'en'
const assert = require('assert')

const format = require('../src/format')
describe(`Locale "${locale}"`, () => {
  it('locale', () => {
    format.locale(locale)
    assert.strictEqual(format.locale(), locale)
  })

  it('day', () => {
    assert.strictEqual(format('1901-02-03'), 'February 3, 1901')
    assert.strictEqual(format('1901-02-03', { format: 'short' }), 'Feb 3, 1901')
  })

  it('month', () => {
    assert.strictEqual(format('1901-02'), 'February 1901')
    assert.strictEqual(format('1901-02', { format: 'short' }), 'Feb 1901')
  })

  it('year', () => {
    assert.strictEqual(format('1954'), '1954')
  })

  it('decade', () => {
    assert.strictEqual(format('1950s'), 'the 1950s')
  })

  it('century', () => {
    assert.strictEqual(format('c1'), '1st century')
    assert.strictEqual(format('c2'), '2nd century')
    assert.strictEqual(format('c3'), '3rd century')
    assert.strictEqual(format('c4'), '4th century')
    assert.strictEqual(format('c11'), '11th century')
    assert.strictEqual(format('c12'), '12th century')
    assert.strictEqual(format('c21'), '21st century')
    assert.strictEqual(format('c15', { format: 'short' }), '15c.')
  })

  it('circa', () => {
    assert.strictEqual(format('~c15'), 'c. 15th century')
    assert.strictEqual(format('~2010-10'), 'c. October 2010')
    assert.strictEqual(format('~2010-10', { format: 'short' }), 'c. Oct 2010')
  })

  it('pure', () => {
    assert.strictEqual(format('1901-02-03'), 'February 3, 1901')
    assert.strictEqual(format('1901-02'), 'February 1901')
  })

  it('before', () => {
    assert.strictEqual(format('before 1901-02'), 'before February 1901')
    assert.strictEqual(format('before 1960s'), 'before the 1960s')
  })

  it('range', () => {
    assert.strictEqual(format('C19..1901-02'), 'between 19th century and February 1901')
    assert.strictEqual(format('1901-02..2018-12-24'), 'between February 1901 and December 24, 2018')
    assert.strictEqual(format('1901-02..2018-12-24', { format: 'short' }), 'b/w Feb 1901 and Dec 24, 2018')
  })

  it('early/mid/late', () => {
    assert.strictEqual(format('early 1901-02'), 'early February 1901')
    assert.strictEqual(format('mid C17'), 'mid 17th century')
  })

  it('circa', () => {
    assert.strictEqual(format('~c15'), 'c. 15th century')
    assert.strictEqual(format('~2010-10'), 'c. October 2010')
    assert.strictEqual(format('1910..~2010-10'), 'between 1910 and c. October 2010')
  })

  it('BC', () => {
    assert.strictEqual(format('~1000 BC'), 'c. 1000 BC')
    assert.strictEqual(format('C1 BC'), '1st century BC')
    assert.strictEqual(format('C2 BCE'), '2nd century BC')
    assert.strictEqual(format('~1500 BC..~1000 BC'), 'between c. 1500 BC and c. 1000 BC')
    assert.strictEqual(format('1500..1000 BC'), 'between 1500 BC and 1000 BC')
    assert.strictEqual(format('~630BC'), 'c. 630 BC')
  })

  it('other', () => {
    assert.strictEqual(format('foobar'), 'foobar')
    assert.strictEqual(format('foobar..2000-01'), 'between foobar and January 2000')
  })
})
