const moment = require('moment')

module.exports = function (_locale, locale) {
  locale.id = _locale
  locale.osmDateFormatTemplates = require('../templates/' + _locale)

  moment.locale(_locale)
}
