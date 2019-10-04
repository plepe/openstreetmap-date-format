/* global location:false, mocha:false */

const async = require('async')

const locales = require('../dist/locales.json')

function reload () {
  const localeSelector = document.getElementById('localeId')
  location.assign('?' + localeSelector.value)
}

window.onload = function () {
  const localeSelector = document.getElementById('localeId')

  localeSelector.onchange = reload

  locales.forEach(locale => {
    const option = document.createElement('option')
    option.value = locale
    option.appendChild(document.createTextNode(locale))
    localeSelector.appendChild(option)
  })

  if (location.search) {
    localeSelector.value = location.search.substr(1)
  } else {
    localeSelector.value = 'en'
  }

  async.parallel([
    function (done) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'dist/locale-' + loc + '.js'
      document.body.appendChild(script)
      script.onload = () => done()
    },
    function (done) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'dist/test-' + loc + '.js'
      document.body.appendChild(script)
      script.onload = () => done()
    }
  ], (err) => {
    if (err) {
      return console.error(err)
    }

    mocha.checkLeaks()
    mocha.globals([])
    mocha.run()
  })
}

const loc = location.search ? location.search.substr(1) : 'en'
