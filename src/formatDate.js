module.exports = function formatDate (date, locale) {
  const templates = locale.osmDateFormatTemplates
  let modifier = function (value) {
    return value
  }

  let prefix = ''
  if (date.match(/^~/)) {
    modifier = templates.circa
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

    return modifier.call(locale, format.call(locale, date))
  }

  m = date.match(/^C([0-9]+)$/i)
  if (m) {
    return modifier.call(locale, templates.formatCentury.call(locale, m[1]))
  }

  m = date.match(/^([0-9]{4})s$/i)
  if (m) {
    return modifier.call(locale, templates.formatDecade.call(locale, m[1]))
  }

  return modifier.call(locale, date)
}
