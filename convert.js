const fs = require('fs')
const path = require('path')

async function convert(input, initSource, target, env) {
  const stat = await fs.promises.stat(input)
  if (stat.isFile()) {
    return await convertFile(input, initSource, target, env)
  }

  const subPaths = await fs.promises.readdir(input)
  return await Promise.all(subPaths.map((subPath) => convert(path.join(input, subPath), initSource, target, env)))
}

async function convertFile(source, initSource, targetDir, env) {
  const file = await fs.promises.readFile(source)
  const value = await convertValue(file.toString(), env)

  const relativePath = path.relative(initSource, source)
  const outputPath = path.join(targetDir, relativePath)
  await fs.promises.mkdir(path.parse(outputPath).dir, {recursive: true})

  return await fs.promises.writeFile(outputPath, value)
}

async function convertValue(raw, env) {
  // $FOO (?<!\\)\$(\w+)
  // ${FOO} (?<!\\)\${(\w+)
  return raw.replace(/(?<!\\)\$(\w+)|(?<!\\)\${(\w+)}/gi, (match, p1, p2) => {
    const key = p1 || p2
    return env[key] || match
  })
}

async function main(input, output, env) {
  const stat = await fs.promises.stat(input)
  if (stat.isFile()) {
    const file = await fs.promises.readFile(input)
    const fileString = file.toString()
    const value = await convertValue(fileString, env)
    return await fs.promises.writeFile(output, value)
  }

  return await convert(input, input, output, env)
}

module.exports = main
