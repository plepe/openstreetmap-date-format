/* global describe, it */
const assert = require('assert')

const parse = require('../src/parse')
describe('Locale "en"', () => {
  it('locale', () => {
    parse.locale('en')
    assert.strictEqual(parse.locale(), 'en')
  })

  it('day', () => {
    let result = parse('1901-02-03')

    assert.strictEqual(result, 'February 3, 1901')
  })

  it('month', () => {
    let result = parse('1901-02')

    assert.strictEqual(result, 'February 1901')
  })

  it('year', () => {
    let result = parse('1954')

    assert.strictEqual(result, '1954')
  })

  it('decade', () => {
    let result = parse('1950s')

    assert.strictEqual(result, 'the 1950s')
  })

  it('century', () => {
    let result = parse('c15')

    assert.strictEqual(result, '15th century')
  })

  it('circa', () => {
    assert.strictEqual(parse('~c15'), 'c. 15th century')
    assert.strictEqual(parse('~2010-10'), 'c. October 2010')
  })

  it('pure', () => {
    assert.strictEqual(parse('1901-02-03'), 'February 3, 1901')
    assert.strictEqual(parse('1901-02'), 'February 1901')
  })

  it('before', () => {
    assert.strictEqual(parse('before 1901-02'), 'before February 1901')
    assert.strictEqual(parse('before 1960s'), 'before the 1960s')
  })

  it('range', () => {
    assert.strictEqual(parse('C19..1901-02'), 'between 19th century and February 1901')
    assert.strictEqual(parse('1901-02..2018-12-24'), 'between February 1901 and December 24, 2018')
  })

  it('early/mid/late', () => {
    assert.strictEqual(parse('early 1901-02'), 'early February 1901')
    assert.strictEqual(parse('mid C17'), 'mid 17th century')
  })

  it('circa', () => {
    assert.strictEqual(parse('~c15'), 'c. 15th century')
    assert.strictEqual(parse('~2010-10'), 'c. October 2010')
    assert.strictEqual(parse('1910..~2010-10'), 'between 1910 and c. October 2010')
  })

  it('other', () => {
    assert.strictEqual(parse('foobar'), 'foobar')
    assert.strictEqual(parse('foobar..2000-01'), 'between foobar and January 2000')
  })
})
