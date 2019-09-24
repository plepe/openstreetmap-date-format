Format openstreetmap dates (like start_date) in a localized string.

Examples:
```js
osmDateFormat.locale('en')
console.log(osmDateFormat('1940s'))
// 'the 1940s'

console.log(osmDateFormat('2018-10..2018-12-24'))
// 'between October 2018 and December 24, 2018'

osmDateFormat.locale('de')
console.log(osmDateFormat('2018-10..2018-12-24'))
// 'zwischen Oktober 2018 und 24. Dezember 2018'
```

Available locales:
* English (en)
* Deutsch / German (de)
* Français / French (fr) (thanks to james2432)

## Installation
```sh
npm install --save openstreetmap-date-format
```

## API
### osmDateFormat(dateString, options) ###
Convert a date string (as found in a osm tage like 'start_date') to a localized string.

Available options:
* format: choose an alternative format. Currently available: 'long' (default), 'short'

Example:
```js
console.log(osmDateFormat('C19'))
// '19th century'
console.log(osmDateFormat('1980..~1990'))
// 'between 1980 and c. 1990'
console.log(osmDateFormat('1901-02-03'))
// 'February 3, 1901'
console.log(osmDateFormat('1901-02-03', { format: 'short' }))
// 'Feb 3, 1901'
```

### osmDateFormat.locale([localeId]) ###
Either return the currently set locale or set a different locale. When using browserify it will not be possible to change the current locale, see below how to embed locales.

```js
osmDateFormat.locale('en')
console.log(osmDateFormat('1940s'))
// 'the 1940s'

osmDateFormat.locale('de')
console.log(osmDateFormat('1940s'))
// '1940er Jahre'

console.log(osmDateFormat.locale())
// 'de'
```

## Localization
### Using nodejs
```js
const osmDateFormat = require('openstreetmap-date-format')

osmDateFormat.locale('en')

console.log(osmDateFormat('2010-10'))
// 'October 2010'
```

### Using locales via browserify
It would be easy to bundle all locales using browserify, but this would also
bloat code. I found the following solution by using a global variable with name `locale`:

Create files for each locale, example 'locale/de.js':
```js
global.locale = {
  id: 'de',
  moment: require('moment'),
  osmDateFormatTemplates: require('openstreetmap-date-format/templates/de')
}
require('moment/locale/de') // don't do this for 'en'
```

Compile distribution files for each locale:
```sh
browserify locale/de.js -o dist/locale-de.js
```

Additionally include locale file in your app:
```html
<html>
  <head>
    <script src='dist/app.js'></script>
    <script src='dist/locale-de.js'></script>
  </head>
  <body>
    ...
  </body>
</html>
```

Code:
```js
const osmDateFormat = require('openstreetmap-date-format')

console.log(osmDateFormat('2010-10', { format: 'short' }))
// 'Oct 2010'
```

## Further links
### Code
* Source code: https://github.com/plepe/openstreetmap-date-format

### Documentation
* https://wiki.openstreetmap.org/wiki/Key:start_date

## Related modules
* [openstreetmap-date-parser](https://github.com/plepe/openstreetmap-date-parser): parse a date string and return a minimum and maximum date.
* [openstreetmap-date-query](https://github.com/plepe/openstreetmap-date-query): builds a regexp from a date query, e.g. for usage with Overpass API.
