module.exports = function (_locale, locale) {
  locale.id = _locale
  locale.moment = require('moment')
  locale.osmDateFormatTemplates = require('../templates/' + _locale)

  locale.moment.locale(_locale)
}
