#!/usr/bin/env node
const osmDateFormat = require('.')

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin
})

rl.on('line', input => {
  console.log(osmDateFormat(input))
})
