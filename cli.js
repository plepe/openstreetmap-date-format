#!/usr/bin/env node
const osmDateFormat = require('.')
const locales = require('./locale/list.json')

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin
})

const ArgumentParser = require('argparse').ArgumentParser
const parser = new ArgumentParser({
  addHelp: true,
  description: 'Read openstreetmap date values (like start_date) from stdin and print a localized string to stdout.'
})

parser.addArgument('--lang', {
  help: 'Language to use (if not set, automatically detected from $LANG). Available languages: ' + locales.join(', ')
})

parser.addArgument('--format', {
  help: 'Format to use (default: short)',
  default: 'long',
  choices: [ 'long', 'short' ]
})

const args = parser.parseArgs()

let lang
if (args.lang) {
  if (!locales.includes(args.lang)) {
    console.error(`Language ${args.lang} not available`)
    process.exit(1)
  }

  lang = args.lang
} else {
  // detect locale
  [ , lang ] = process.env.LANG.match(/^([a-z]+)[_\.]/)
  if (!locales.includes(lang)) {
    lang = locales[0]
  }
}

osmDateFormat.locale(lang)

rl.on('line', input => {
  console.log(osmDateFormat(input, args))
})
