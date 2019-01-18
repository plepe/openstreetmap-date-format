const fs = require('fs')
const browserify = require('browserify')

let locales = fs.readdirSync('templates/')
locales = locales
  .filter(file => file.match(/\.js$/))
  .map(file => file.substr(0, file.length - 3))

fs.writeFileSync('dist/locales.json', JSON.stringify(locales, null, '    '))

if (fs.existsSync('dist/test.js')) {
  fs.unlinkSync('dist/test.js')
}

let b = browserify([ 'src/test.js' ], {
  debug: true
})
let stream = b.bundle()
stream.on('data', value => fs.appendFileSync('dist/test.js', value))

locales.forEach(locale => {
  if (fs.existsSync('dist/test-' + locale + '.js')) {
    fs.unlinkSync('dist/test-' + locale + '.js')
  }

  let b = browserify([ 'test/' + locale + '.js' ], {
    debug: true
  })
  b.external("src/node.js")
  let stream = b.bundle()
  stream.on('data', value => fs.appendFileSync('dist/test-' + locale + '.js', value))
})

locales.forEach(locale => {
  if (fs.existsSync('dist/locale-' + locale + '.js')) {
    fs.unlinkSync('dist/locale-' + locale + '.js')
  }

  let b = browserify([ 'locale/' + locale + '.js' ], {
    debug: true,
    expose: [ 'src/node.js' ]
  })
  let stream = b.bundle()
  stream.on('data', value => fs.appendFileSync('dist/locale-' + locale + '.js', value))
})
