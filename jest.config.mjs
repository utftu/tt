import config from 'jest-config'

export default {
    transform: {},
    testRegex: '\\.test\\.(c|m)?js$',
    moduleFileExtensions: [...config.defaults.moduleFileExtensions, 'mjs', 'cjs'],
}
