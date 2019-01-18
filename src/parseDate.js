module.exports = function parseDate (date, options, locale) {
  let result = {}

  if (date.match(/^~/)) {
    result.circa = true
    date = date.substr(1)
  }

  let mBc = date.match(/^([^ ]*)\s*BCE?$/)
  if (mBc) {
    result.bc = true
    date = mBc[1]
  }

  let m = date.match(/(before|early|late|mid|after) (.*)$/)
  if (m) {
    result.prefix = m[1]
    date = m[2]
  }

  result.value = date
  m = date.match(/^([0-9]{4})(-[0-9]{2})?(-[0-9]{2})?$/)
  if (m) {
    if (m[3]) {
      result.type = 'day'
    } else if (m[2]) {
      result.type = 'month'
    } else {
      result.type = 'year'
    }

    return result
  }

  m = date.match(/^C([0-9]+)$/i)
  if (m) {
    result.type = 'century'
    result.value = m[1]
    return result
  }

  m = date.match(/^([0-9]{4})s$/i)
  if (m) {
    result.type = 'decade'
    result.value = m[1]
    return result
  }

  result.type = 'unknown'
  return result
}
