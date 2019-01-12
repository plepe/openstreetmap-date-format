const templates = require('./templates')
const formatDate = require('./formatDate')

module.exports = function parse (date) {
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

  let formattedDates = dates.map(formatDate)

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
