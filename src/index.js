module.exports = function (locale) {
  require('./locale-' + locale)
  return require('./parse')
}
