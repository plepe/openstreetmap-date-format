const moment = require('moment')

function formatDate (options, date, article) {
  let result = date.value

  switch (date.type) {
    case 'day':
      if (options.format === 'short') {
        result = moment(date.value).format('ll')
      } else {
        result = moment(date.value).format('LL')
      }
      break
    case 'month':
      if (options.format === 'short') {
        result = moment(date.value).format('MMM YYYY')
      } else {
        result = moment(date.value).format('MMMM YYYY')
      }
      break
    case 'year':
      result = date.value
      break
    case 'decade':
      result = 'les années ' + date.value
      break
    case 'century':
      if (parseInt(date.value) === 1) {
        result = date.value += 'er'
      } else {
        result = date.value += 'e'
      }

      if (options.format === 'short') {
        result += ' s.'
      } else {
        result += ' siècle'
      }
      break
  }

  switch (date.prefix) {
    case 'before':
      result = 'avant ' + result
      break
    case 'after':
      result = 'après ' + result
      break
    case 'early':
      result = 'début ' + result
      break
    case 'mid':
      if (date.type === 'century') {
        result = 'milieu du ' + result
      } else {
        result = 'milieu ' + result
      }
      break
    case 'late':
      result = 'fin ' + result
      break
  }

  if (date.circa) {
    result = 'v. ' + result
  }

  if (date.bc) {
    result += ' av. J.-C.'
  }

  if (article && (date.type === 'century' || date.type === 'day')) {
    result = 'le ' + result
  }

  return result
}

module.exports = {
  single: function (options, value) {
    return formatDate(options, value, false)
  },
  range: function (options, value1, value2) {
    return 'entre ' + formatDate(options, value1, true) + ' et ' + formatDate(options, value2, true)
  }
}
