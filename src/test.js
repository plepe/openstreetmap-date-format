const async = require('async')

const locales = require('../dist/locales.json')

function reload () {
  let localeSelector = document.getElementById('localeId')
  location.assign('test.html?' + localeSelector.value)
}

window.onload = function () {
  let localeSelector = document.getElementById('localeId')

  localeSelector.onchange = reload

  locales.forEach(locale => {
    let option = document.createElement('option')
    option.value = locale
    option.appendChild(document.createTextNode(locale))
    localeSelector.appendChild(option)
  })

  if (location.search) {
    localeSelector.value = location.search.substr(1)
  }

  async.parallel([
    function (done) {
      let script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = "dist/locale-" + loc +".js"
      document.body.appendChild(script)
      script.onload = done
    },
    function (done) {
      let script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = "dist/test-" + loc + ".js"
      document.body.appendChild(script)
    },
  ], (err) => {
    mocha.checkLeaks();
    mocha.globals([]);
    mocha.run();
  })
}

let loc = location.search ? location.search.substr(1) : 'en'
