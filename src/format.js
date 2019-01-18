const parseDate = require('./parseDate')

let locale = {}

function format (date, options = {}) {
  if (typeof locale.id === 'undefined') {
    format.locale()
  }

  const templates = locale.osmDateFormatTemplates

  let dates
  let template = templates.single

  let m = date.match(/(.*)\.\.(.*)$/)
  if (m) {
    dates = [ parseDate(m[1]), parseDate(m[2]) ]

    if (dates[1].bc) {
      dates[0].bc = true
    }

    template = templates.range
  } else {
    dates = [ parseDate(date) ]
  }

  return template.apply(locale, [ options ].concat(dates))
}

format.locale = function (_locale) {
  if (_locale) {
    require('./node.js')(_locale, locale)
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
