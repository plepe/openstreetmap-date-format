const moment = require('moment')
const templates = {
  single: '%1',
  before: 'vor %1',
  range: 'zwischen %1 und %2'
}

function formatDate(date) {
  return moment(date).format()
}

function parse (date) {
  let dates = [ date ]
  let modi
  let template = templates.single
  let m =date.match(/(before|early|late|mid|after) (.*)$/)
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

  formattedDates.forEach((v, i) => template = template.replace('%' + (i + 1), v))

  return template
}

console.log(parse('1954'))
console.log(parse('before 1954'))
console.log(parse('1954..1966'))
console.log(parse('1954-08-13..1966-01-01'))
