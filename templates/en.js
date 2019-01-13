module.exports = {
  circa: function (options, value) {
    return 'c. ' + value
  },
  single: function (options, value) {
    return value
  },
  before: function (options, value) {
    return 'before ' + value
  },
  after: function (options, value) {
    return 'after ' + value
  },
  early: function (options, value) {
    return 'early ' + value
  },
  mid: function (options, value) {
    return 'mid ' + value
  },
  late: function (options, value) {
    return 'late ' + value
  },
  range: function (options, value1, value2) {
    return 'between ' + value1 + ' and ' + value2
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
    return 'the ' + value + 's'
  },
  formatCentury: function (options, value) {
    return value + 'th century'
  }
}
