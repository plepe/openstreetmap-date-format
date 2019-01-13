module.exports = {
  circa: function (options, value) {
    return 'ca. ' + value
  },
  single: function (options, value) {
    return value
  },
  before: function (options, value) {
    return 'vor ' + value
  },
  after: function (options, value) {
    return 'nach ' + value
  },
  early: function (options, value) {
    return 'Anfang ' + value
  },
  mid: function (options, value) {
    return 'Mitte ' + value
  },
  late: function (options, value) {
    return 'Ende ' + value
  },
  range: function (options, value1, value2) {
    return 'zwischen ' + value1 + ' und ' + value2
  },
  formatDay: function (options, value) {
    return this.moment(value).format('LL')
  },
  formatMonth: function (options, value) {
    return this.moment(value).format('MMMM YYYY')
  },
  formatYear: function (options, value) {
    return value
  },
  formatDecade: function (options, value) {
    return value + 'er Jahre'
  },
  formatCentury: function (options, value) {
    return value + '. Jahrhundert'
  }
}
