module.exports = function formatDate (date, locale) {
  const templates = locale.osmDateParserTemplates

  let prefix = ''
  if (date.match(/^~/)) {
    prefix = templates.circa
    date = date.substr(1)
  }

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

    return prefix + locale.moment(date).format(format)
  }

  m = date.match(/^C([0-9]+)$/i)
  if (m) {
    return prefix + templates.formatCentury.replace('%d', parseInt(m[1]))
  }

  m = date.match(/^([0-9]{4})s$/i)
  if (m) {
    return prefix + templates.formatDecade.replace('%d', m[1])
  }

  return date
}
