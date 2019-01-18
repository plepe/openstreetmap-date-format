const moment = require('moment')

module.exports = {
  modify: function (options, value, modifier) {
    if (modifier.circa) {
      value = 'ca. ' + value
    }

    if (modifier.bc) {
      value += ' v.Chr.'
    }

    return value
  },
  single: function (options, value) {
    return value
  },
  before: function (options, value) {
    return 'vor ' + value
  },
  after: function (options, value) {
    return 'nach ' + value
  },
  early: function (options, value) {
    return 'Anfang ' + value
  },
  mid: function (options, value) {
    return 'Mitte ' + value
  },
  late: function (options, value) {
    return 'Ende ' + value
  },
  range: function (options, value1, value2) {
    if (options.format === 'short') { return 'zw. ' + value1 + ' und ' + value2 }
    return 'zwischen ' + value1 + ' und ' + value2
  },
  formatDay: function (options, value) {
    if (options.format === 'short') { return moment(value).format('ll') }
    return moment(value).format('LL')
  },
  formatMonth: function (options, value) {
    if (options.format === 'short') { return moment(value).format('MMM YYYY') }
    return moment(value).format('MMMM YYYY')
  },
  formatYear: function (options, value) {
    return value
  },
  formatDecade: function (options, value) {
    if (options.format === 'short') { return value + 'er' }
    return value + 'er Jahre'
  },
  formatCentury: function (options, value) {
    if (options.format === 'short') { return value + '. Jh.' }
    return value + '. Jahrhundert'
  }
}
