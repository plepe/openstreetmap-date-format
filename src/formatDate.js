const moment = require('moment')

const templates = require('./templates')

module.exports = function formatDate (date) {
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

    return moment(date).format(format)
  }

  m = date.match(/^C([0-9]+)$/i)
  if (m) {
    return templates.formatCentury.replace('%d', parseInt(m[1]))
  }

  m = date.match(/^([0-9]{4})s$/i)
  if (m) {
    return templates.formatDecade.replace('%d', m[1])
  }
}
