module.exports = function (_locale, locale) {
  locale.id = _locale
  locale.moment = require('moment')
  locale.osmDateParserTemplates = require('../lang/' + _locale)

  locale.moment.locale(_locale)
}
