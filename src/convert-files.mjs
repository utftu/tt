import fs from 'fs'
import path from 'path'
import convertValue from './convert.mjs'

async function convertFiles(input, initSource, target, env) {
  const stat = await fs.promises.stat(input)
  if (stat.isFile()) {
    return await convertFile(input, initSource, target, env)
  }

  const subPaths = await fs.promises.readdir(input)
  return await Promise.all(subPaths.map((subPath) => convertFiles(path.join(input, subPath), initSource, target, env)))
}

async function convertFile(source, initSource, targetDir, env) {
  const file = await fs.promises.readFile(source)
  const value = await convertValue(file.toString(), env)

  const relativePath = path.relative(initSource, source)
  const outputPath = path.join(targetDir, relativePath)
  await fs.promises.mkdir(path.parse(outputPath).dir, {recursive: true})
  
  return await fs.promises.writeFile(outputPath, value)
}

async function main(input, output, env) {
  const stat = await fs.promises.stat(input)
  if (stat.isFile()) {
    const file = await fs.promises.readFile(input)
    const fileString = file.toString()
    const value = await convertValue(fileString, env)
    await fs.promises.mkdir(path.parse(output).dir, {recursive: true})
    return await fs.promises.writeFile(output, value)
  }

  return await convertFiles(input, input, output, env)
}

export default main
