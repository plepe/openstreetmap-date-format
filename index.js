const templates = {
  before: 'vor %s'
}

function parse (date) {
  let modi
  let m =date.match(/(before|early|late|mid|after) (.*)$/)
  if (m) {
    modi = m[1]
    date = m[2]
  }

  let formattedDate = date

  if (modi) {
    let template = templates[modi]
    formattedDate = template.replace('%s', formattedDate)
  }

  return formattedDate
}

console.log(parse('1954'))
console.log(parse('before 1954'))
