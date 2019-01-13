module.exports = {
    circa: "ca. ",
    single: function (value) {
      return value
    },
    before: function (value) {
      return "vor " + value
    },
    after: function (value) {
      return "nach " + value
    },
    early: function (value) {
      return "Anfang " + value
    },
    mid: function (value) {
      return "Mitte " + value
    },
    late: function (value) {
      return "Ende " + value
    },
    range: function (value1, value2) {
      return "zwischen " + value1 + " und " + value2
    },
    formatDay: function (value) {
      return this.moment(value).format("LL")
    },
    formatMonth: function (value) {
      return this.moment(value).format("MMMM YYYY")
    },
    formatYear: function (value) {
      return value
    },
    formatDecade: function (value) {
      return value + "er Jahre"
    },
    formatCentury: function (value) {
      return value + ". Jahrhundert"
    }
}
