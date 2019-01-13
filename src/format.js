const formatDate = require('./formatDate')

let locale = {}

function format (date) {
  if (typeof locale.id === 'undefined') {
    format.locale()
  }

  const templates = locale.osmDateFormatTemplates

  let dates = [ date ]
  let modi
  let template = templates.single
  let m = date.match(/(before|early|late|mid|after) (.*)$/)
  if (m) {
    modi = m[1]
    dates = [ m[2] ]
  }

  m = date.match(/(.*)\.\.(.*)$/)
  if (m) {
    modi = 'range'
    dates = [ m[1], m[2] ]
  }

  let formattedDates = dates.map(d => formatDate(d, locale))

  if (modi) {
    template = templates[modi]
  }

  return template.apply(locale, formattedDates)
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
