const fs = require('fs')
const browserify = require('browserify')

let locales = fs.readdirSync('templates/')
locales = locales
  .filter(file => file.match(/\.js$/))
  .map(file => file.substr(0, file.length - 3))

fs.writeFileSync('dist/locales.json', JSON.stringify(locales, null, '    '))

locales.forEach(locale => {
  if (fs.existsSync('dist/locale-' + locale + '.js')) {
    fs.unlinkSync('dist/locale-' + locale + '.js')
  }

  let b = browserify([ 'locale/' + locale + '.js' ], {
  })
  let stream = b.bundle()
  stream.on('data', value => fs.appendFileSync('dist/locale-' + locale + '.js', value))
})
