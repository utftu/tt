const {execSync} = require('child_process')
const fs = require('fs')
const path = require('path')
const remove = require('fs-extra/lib/remove').remove

describe('cli', () => {
  it('file', async () => {
    const dirPath = path.join(__dirname, 'playground', 'cli', 'file')
    await remove(dirPath)
    await fs.promises.mkdir(dirPath, {recursive: true})
    await fs.promises.writeFile(path.join(dirPath, 'source.json'), '{"$KEY": "$VALUE"}')
    execSync(`node ${__dirname}/../cli.js -e KEY=key -e VALUE=value ${dirPath}/source.json ${dirPath}/target.json`)
    const target = require(`${dirPath}/target.json`)
    expect(target.key).toBe('value')
    await remove(dirPath)
  })

  it('dir', async () => {
    const dirPath = path.join(__dirname, 'playground', 'cli', 'dir')
    await remove(dirPath)

    await fs.promises.mkdir(dirPath, {recursive: true})
    await fs.promises.mkdir(path.join(dirPath, 'source', 'subdir'), {recursive: true})

    await fs.promises.writeFile(`${dirPath}/source/file.json`, '{"$KEY": "$VALUE"}')
    await fs.promises.writeFile(`${dirPath}/source/subdir/file.json`, '{"$KEY": "$VALUE"}')
    execSync(`node ${__dirname}/../cli.js -e KEY=key -e VALUE=value ${dirPath}/source ${dirPath}/target`)
    const file = require(`${dirPath}/target/file.json`)
    const subdirFile = require(`${dirPath}/target/subdir/file.json`)
    expect(file.key).toBe('value')
    expect(subdirFile.key).toBe('value')

    await remove(dirPath)
  })
});


