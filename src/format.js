const parseDate = require('./parseDate')
const formatDate = require('./formatDate')

let locale = {}

function format (date, options = {}) {
  if (typeof locale.id === 'undefined') {
    format.locale()
  }

  const templates = locale.osmDateFormatTemplates

  let dates
  let modi
  let template = templates.single
  let m = date.match(/(before|early|late|mid|after) (.*)$/)
  if (m) {
    modi = m[1]
    dates = [ parseDate(m[2]) ]
  }

  m = date.match(/(.*)\.\.(.*)$/)
  if (m) {
    modi = 'range'
    dates = [ parseDate(m[1]), parseDate(m[2]) ]

    if (dates[1].bc) {
      dates[0].bc = true
    }
  }

  if (!dates) {
    dates = [ parseDate(date) ]
  }

  let formattedDates = dates.map(d => formatDate(d, options, locale))

  if (modi) {
    template = templates[modi]
  }

  return template.apply(locale, [ options ].concat(formattedDates))
}

format.locale = function (_locale) {
  if (_locale) {
    require('../locale/node.js')(_locale, locale)
  } else {
    if (typeof locale.id === 'undefined') {
      if ('locale' in global) {
        locale = global.locale
      } else {
        format.locale('en')
        if (!locale.id) {
          console.error("Can't load default locale - embed locale as additional script")
        }
      }
    }

    return locale.id
  }
}

module.exports = format
