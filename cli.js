#!/usr/bin/env node
const osmDateFormat = require('.')

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin
})

// detect locale
let [ , lang ] = process.env.LANG.match(/^([a-z]+)[_\.]/)
const locales = require('./locale/list.json')
if (!locales.includes(lang)) {
  lang = locales[0]
}

osmDateFormat.locale(lang)

rl.on('line', input => {
  console.log(osmDateFormat(input))
})
