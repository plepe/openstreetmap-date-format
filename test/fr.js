/* global describe, it */
const locale = 'fr'
const assert = require('assert')

const format = require('../src/format')
describe(`Locale "${locale}"`, () => {
  it('locale', () => {
    format.locale(locale)
    assert.strictEqual(format.locale(), locale)
  })

  it('day', () => {
    assert.strictEqual(format('1901-02-03'), '3 février 1901')
    assert.strictEqual(format('1901-02-03', { format: 'short' }), '3 févr. 1901')
  })

  it('month', () => {
    assert.strictEqual(format('1901-02'), 'février 1901')
    assert.strictEqual(format('1901-02', { format: 'short' }), 'févr. 1901')
  })

  it('year', () => {
    assert.strictEqual(format('1954'), '1954')
  })

  it('decade', () => {
    assert.strictEqual(format('1950s'), 'les années 1950')
  })

  it('century', () => {
    assert.strictEqual(format('c1'), '1er siècle')
    assert.strictEqual(format('c2'), '2e siècle')
    assert.strictEqual(format('c3'), '3e siècle')
    assert.strictEqual(format('c4'), '4e siècle')
    assert.strictEqual(format('c11'), '11e siècle')
    assert.strictEqual(format('c12'), '12e siècle')
    assert.strictEqual(format('c21'), '21e siècle')
    assert.strictEqual(format('c15', { format: 'short' }), '15e s.')
  })

  it('circa', () => {
    assert.strictEqual(format('~c15'), 'v. 15e siècle')
    assert.strictEqual(format('~2010-10'), 'v. octobre 2010')
    assert.strictEqual(format('~2010-10', { format: 'short' }), 'v. oct. 2010')
  })

  it('pure', () => {
    assert.strictEqual(format('1901-02-03'), '3 février 1901')
    assert.strictEqual(format('1901-02'), 'février 1901')
  })

  it('before', () => {
    assert.strictEqual(format('before 1901-02'), 'avant février 1901')
    assert.strictEqual(format('before 1960s'), 'avant les années 1960')
  })

  it('range', () => {
    assert.strictEqual(format('C19..C20'), 'entre le 19e siècle et le 20e siècle')
    assert.strictEqual(format('C19..1901-02'), 'entre le 19e siècle et février 1901')
    assert.strictEqual(format('1901-02..2018-12-24'), 'entre février 1901 et le 24 décembre 2018')
  })

  it('early/mid/late', () => {
    assert.strictEqual(format('early 1901-02'), 'début février 1901')
    assert.strictEqual(format('mid C17'), 'milieu du 17e siècle')
    assert.strictEqual(format('mid 2019-12'), 'milieu décembre 2019')
    assert.strictEqual(format('late 2019-12'), 'fin décembre 2019')
  })

  it('circa', () => {
    assert.strictEqual(format('~c15'), 'v. 15e siècle')
    assert.strictEqual(format('~2010-10'), 'v. octobre 2010')
    assert.strictEqual(format('1910..~2010-10'), 'entre 1910 et v. octobre 2010')
  })

  it('BC', () => {
    assert.strictEqual(format('~1000 BC'), 'v. 1000 av. J.-C.')
    assert.strictEqual(format('C1 BC'), '1er siècle av. J.-C.')
    assert.strictEqual(format('C2 BCE'), '2e siècle av. J.-C.')
    assert.strictEqual(format('~1500 BC..~1000 BC'), 'entre v. 1500 av. J.-C. et v. 1000 av. J.-C.')
    assert.strictEqual(format('1500..1000 BC'), 'entre 1500 av. J.-C. et 1000 av. J.-C.')
    assert.strictEqual(format('~630BC'), 'v. 630 av. J.-C.')
  })

  it('other', () => {
    assert.strictEqual(format('foobar'), 'foobar')
    assert.strictEqual(format('foobar..2000-01'), 'entre foobar et janvier 2000')
  })
})
