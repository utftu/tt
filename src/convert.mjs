import config from './config.mjs'

export default function convertValue(raw, env, regexp = config.regexps.complex) {
    return raw.replace(regexp, (match, ...groups) => {
        let key
        for (const group of groups) {
            if (group) {
                key = group
                break
            }
        }
        return env[key] || match
    })
}