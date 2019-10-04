#!/usr/bin/env node
const osmDateFormat = require('.')

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin
})

const ArgumentParser = require('argparse').ArgumentParser
const parser = new ArgumentParser({
  addHelp: true,
  description: 'Read openstreetmap date values (like start_date) from stdin and print a localized string to stdout.'
})

const args = parser.parseArgs()

const locales = require('./locale/list.json')
if (!locales.includes(lang)) {
  lang = locales[0]
}

osmDateFormat.locale(lang)

rl.on('line', input => {
  console.log(osmDateFormat(input))
})
