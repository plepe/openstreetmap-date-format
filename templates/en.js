module.exports = {
  circa: function (value) {
    return 'c. ' + value
  },
  single: function (value) {
    return value
  },
  before: function (value) {
    return 'before ' + value
  },
  after: function (value) {
    return 'after ' + value
  },
  early: function (value) {
    return 'early ' + value
  },
  mid: function (value) {
    return 'mid ' + value
  },
  late: function (value) {
    return 'late ' + value
  },
  range: function (value1, value2) {
    return 'between ' + value1 + ' and ' + value2
  },
  formatDay: function (value) {
    return this.moment(value).format('LL')
  },
  formatMonth: function (value) {
    return this.moment(value).format('MMMM YYYY')
  },
  formatYear: function (value) {
    return value
  },
  formatDecade: function (value) {
    return 'the ' + value + 's'
  },
  formatCentury: function (value) {
    return value + 'th century'
  }
}
