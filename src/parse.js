const formatDate = require('./formatDate')

let templates

function parse (date) {
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

  let formattedDates = dates.map(d => formatDate(d, templates))

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

module.exports = function (locale) {
  templates = require('../locale/' + locale)
  return parse
}
