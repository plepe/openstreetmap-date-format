const formatDate = require('./formatDate')

let locale = {}

function parse (date) {
  if (typeof locale.id === 'undefined') {
    locale = global.locale
  }

  const templates = locale.osmDateParserTemplates

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

  formattedDates.forEach(
    (v, i) => {
      template = template.replace('%' + (i + 1), v)
    }
  )

  return template
}

parse.locale = function (_locale) {
  require('../locale/node.js')(_locale, locale)
}

module.exports = parse
