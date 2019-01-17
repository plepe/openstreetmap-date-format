module.exports = function formatDate (date, options, locale) {
  const templates = locale.osmDateFormatTemplates

  let result
  switch (date.type) {
    case 'day':
      result = templates.formatDay.call(locale, options, date.value)
      break
    case 'month':
      result = templates.formatMonth.call(locale, options, date.value)
      break
    case 'year':
      result = templates.formatYear.call(locale, options, date.value)
      break
    case 'decade':
      result = templates.formatDecade.call(locale, options, date.value)
      break
    case 'century':
      result = templates.formatCentury.call(locale, options, date.value)
      break
    case 'unknown':
      result = date.value
      break
  }

  return templates.modify.call(locale, options, result, date)
}
