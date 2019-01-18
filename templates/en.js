const moment = require('moment')
const ordinal = require('ordinal')

function formatDate (options, date) {
  let result = date.value

  switch (date.type) {
    case 'day':
      if (options.format === 'short') {
        result =  moment(date.value).format('ll')
      } else {
        result =  moment(date.value).format('LL')
      }
      break
    case 'month':
      if (options.format === 'short') {
        result =  moment(date.value).format('MMM YYYY')
      } else {
        result =  moment(date.value).format('MMMM YYYY')
      }
      break
    case 'year':
      result =  date.value
      break
    case 'decade':
      result =  'the ' + date.value + 's'
      break
    case 'century':
      if (options.format === 'short') {
        result =  date.value + 'c.'
      } else {
        result =  ordinal(parseInt(date.value)) + ' century'
      }
  }

  switch (date.prefix) {
    case 'before':
      result =  'before ' + result
      break
    case 'after':
      result =  'after ' + result
      break
    case 'early':
      result =  'early ' + result
      break
    case 'mid':
      result =  'mid ' + result
      break
    case 'late':
      result =  'late ' + result
      break
  }

  if (date.circa) {
    result = 'c. ' + result
  }

  if (date.bc) {
    result += ' BC'
  }

  return result
}

module.exports = {
  single: function (options, value) {
    return formatDate(options, value)
  },
  range: function (options, value1, value2) {
    if (options.format === 'short') {
      return 'b/w ' + formatDate(options, value1) + ' and ' + formatDate(options, value2)
    }

    return 'between ' + formatDate(options, value1) + ' and ' + formatDate(options, value2)
  }
}
