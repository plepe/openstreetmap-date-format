const templates = require('./src/templates')
const formatDate = require('./src/formatDate')

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
