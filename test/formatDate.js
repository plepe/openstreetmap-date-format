const assert = require('assert')
const moment = require('moment')

const formatDate = require('../src/formatDate')
moment.locale('de')

describe('formatDate', () => {
  it ('day', () => {
    let result = formatDate('1901-02-03')

    assert.equal(result, '3. Februar 1901')
  })

  it ('month', () => {
    let result = formatDate('1901-02')

    assert.equal(result, 'Februar 1901')
  })

  it ('year', () => {
    let result = formatDate('1954')

    assert.equal(result, '1954')
  })

  it ('decade', () => {
    let result = formatDate('1950s')

    assert.equal(result, '1950er Jahre')
  })

  it ('century', () => {
    let result = formatDate('c15')

    assert.equal(result, '15. Jahrhundert')
  })

  it ('circa', () => {
    assert.equal(formatDate('~c15'), 'ca. 15. Jahrhundert')
    assert.equal(formatDate('~2010-10'), 'ca. Oktober 2010')
  })

  it ('other', () => {
    let result = formatDate('foobar')

    assert.equal(result, 'foobar')
  })
})
