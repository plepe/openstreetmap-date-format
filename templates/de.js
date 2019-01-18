const moment = require('moment')

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
      if (options.format === 'short') {
        result =  date.value + 'er'
      } else {
        result =  date.value + 'er Jahre'
      }
      break
    case 'century':
      if (options.format === 'short') {
        result =  date.value + '. Jh.'
      } else {
        result =  date.value + '. Jahrhundert'
      }
  }

  switch (date.prefix) {
    case 'before':
      result =  'vor ' + result
      break
    case 'after':
      result =  'nach ' + result
      break
    case 'early':
      result =  'Anfang ' + result
      break
    case 'mid':
      result =  'Mitte ' + result
      break
    case 'late':
      result =  'Ende ' + result
      break
  }

  if (date.circa) {
    result = 'ca. ' + result
  }

  if (date.bc) {
    result += ' v.Chr.'
  }

  return result
}

module.exports = {
  single: function (options, value) {
    return formatDate(options, value)
  },
  range: function (options, value1, value2) {
    if (options.format === 'short') {
      return 'zw. ' + formatDate(options, value1) + ' und ' + formatDate(options, value2)
    }

    return 'zwischen ' + formatDate(options, value1) + ' und ' + formatDate(options, value2)
  }
}
