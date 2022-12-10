const moment = require('moment')
const ordinal = require('ordinal')

function formatDate (options, date) {
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
      result = 'de jaren ' + date.value
      break
    case 'century':
      result = date.value += 'e eeuw'
  }

  switch (date.prefix) {
    case 'before':
      result = 'voor ' + result
      break
    case 'after':
      result = 'na ' + result
      break
    case 'early':
      result = 'begin ' + result
      break
    case 'mid':
      result = 'midden ' + result
      break
    case 'late':
      result = 'eind ' + result
      break
  }

  if (date.circa) {
    result = 'ca. ' + result
  }

  if (date.bc) {
    result += ' v. Chr.'
  }

  if (article && (date.type === 'century')) {
    result = 'le ' + result
  }

  return result
}
module.exports = {
  single: function (options, value) {
    return formatDate(options, value, false)
  },
  range: function (options, value1, value2) {
    return 'tussen ' + formatDate(options, value1, true) + ' en ' + formatDate(options, value2, true)
  }
}
