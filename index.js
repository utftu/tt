const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
const convert = require('./convert')
const args = require('minimist')(process.argv.slice(2))

let vars = {}

const source = getArgSingleValue('source', args) || args._[0]
const target = getArgSingleValue('target', args) || args._[1]
const envFileShort = getArgMultiValue('f', args)
const envFileFull = getArgMultiValue('env-file', args)
const envShort = getArgMultiValue('e', args)
const envFull = getArgMultiValue('env', args)
envFileShort.forEach((path) => vars = {...vars, ...dotenv.config({path}).parsed})
envFileFull.forEach((path) => vars = {...vars, ...dotenv.config({path}).parsed})
envShort.forEach((env) => vars = {...vars, ...dotenv.parse(Buffer.from(env || ''))})
envFull.forEach((env) => vars = {...vars, ...dotenv.parse(Buffer.from(env || ''))})


function getArgMultiValue(key, args) {
  const value = args[key]
  return Array.isArray(value) ? value : [value]
}

function getArgSingleValue(key, args) {
  const value = args[key]
  return Array.isArray(value) ? value[value.length - 1] : value
}

convert(path.resolve(source), path.resolve(target), Object.keys(vars).length ? vars : process.env)
