module.exports = function formatDate (date, options, locale) {
  const templates = locale.osmDateFormatTemplates
  let modifier = {}

  if (date.match(/^~/)) {
    modifier.circa = true
    date = date.substr(1)
  }

  let mBc = date.match(/^([^ ]*)\s*BCE?$/)
  if (mBc) {
    modifier.bc = true
    date = mBc[1]
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

    return templates.modify.call(locale, options, format.call(locale, options, date), modifier)
  }

  m = date.match(/^C([0-9]+)$/i)
  if (m) {
    return templates.modify.call(locale, options, templates.formatCentury.call(locale, options, m[1]), modifier)
  }

  m = date.match(/^([0-9]{4})s$/i)
  if (m) {
    return templates.modify.call(locale, options, templates.formatDecade.call(locale, options, m[1]), modifier)
  }

  return templates.modify.call(locale, options, date, modifier)
}
