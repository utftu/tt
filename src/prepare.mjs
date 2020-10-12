import config from './config.mjs'

export default function (str, regexp = config.regexp) {
    const matchAll = Array.from(str.matchAll(regexp))
    let lastStrIndex = 0
    const arrStr = []
    const arrEnv = []
    
    matchAll.forEach((match, i) => {
        arrStr.push(str.slice(lastStrIndex, match.index))
        
        let group
        for (const mayGroup of match.slice(1)) {
            if (mayGroup) {
                group = mayGroup
                break
            }
        }

        arrEnv.push({i, env: group})
        lastStrIndex = match.index + match[0].length
    })
    arrStr.push(str.slice(lastStrIndex))
    
    return function(env) {
        let result = ''
        arrStr.forEach((strPart, i) => {
            result = result + strPart
            if (arrEnv.length === i) {
                return
            }
            result = result + env[arrEnv[i].env]
        })
        return result
    }
}