const moment = require('moment')

module.exports = {
  modify: function (options, value, modifier) {
    if (modifier.circa) {
      value = 'v. ' + value
    }

    if (modifier.bc) {
      value += ' av. J.-C.'
    }

    return value
  },
  single: function (options, value) {
    return value
  },
  before: function (options, value) {
    return 'avant ' + value
  },
  after: function (options, value) {
    return 'après ' + value
  },
  early: function (options, value) {
    return 'début ' + value
  },
  mid: function (options, value) {
    if (value.endsWith('siècle') || value.endsWith(' s.')) {
      return 'milieu du ' + value
    }
    return 'milieu ' + value
  },
  late: function (options, value) {
    return 'fin ' + value
  },
  range: function (options, value1, value2) {
    // there is no short version in French to my knowledge
    // il n'y a pas, à ma connaissance une façon courte d'écrire <<entre>>
    // if (options.format === 'short') { return 'b/w ' + value1 + ' and ' + value2 }
    if (value1.endsWith('siècle') || value1.endsWith(' s.') || value1.match(/^\d{1,2}\s(jan|fév|mar|avr|mai|ju|ao|sep|oct|nov|déc)/)) {
      value1 = 'entre le ' + value1
    } else {
      value1 = 'entre ' + value1
    }
    if (value2.endsWith('siècle') || value2.endsWith(' s.') || value2.match(/^\d{1,2}\s(jan|fév|mar|avr|mai|ju|ao|sep|oct|nov|déc)/)) {
      value2 = 'le ' + value2
    }

    return value1 + ' et ' + value2
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
    return 'les années ' + value
  },
  formatCentury: function (options, value) {
    if (parseInt(value) === 1) {
      value += 'er'
    } else {
      value += 'e'
    }
    if (options.format === 'short') { return value + ' s.' }
    return value + ' siècle'
  }
}
