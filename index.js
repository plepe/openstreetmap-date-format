const moment = require('moment')
const templates = {
  single: '%1',
  before: 'vor %1',
  range: 'zwischen %1 und %2',
  formatDay: 'LL',
  formatMonth: 'MMMM YYYY',
  formatYear: 'YYYY',
  formatCentury: '%d. Jahrhundert',
  formatDecade: '%der Jahre'
}

function formatDate (date) {
  let format
  let m = date.match(/^([0-9]{4})(-[0-9]{2})?(-[0-9]{2})?$/)
  if (m) {
    if (m[3]) {
      format = templates.formatDay
    } else if (m[2]) {
      format = templates.formatMonth
    } else {
      format = templates.formatYear
    }

    return moment(date).format(format)
  }

  m = date.match(/^C([0-9]+)$/i)
  if (m) {
    return templates.formatCentury.replace('%d', parseInt(m[1]))
  }

  m = date.match(/^([0-9]{4})s$/i)
  if (m) {
    return templates.formatDecade.replace('%d', m[1])
  }
}

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

console.log(parse('1954'))
console.log(parse('before 1954'))
console.log(parse('before 1954-04'))
console.log(parse('1954..1966'))
console.log(parse('1954-08-13..1966-01-01'))
console.log(parse('C16'))
console.log(parse('before C16'))
console.log(parse('C19..1920s'))
