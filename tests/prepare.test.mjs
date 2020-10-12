import prepare from '../src/prepare.mjs'

describe('prepare', () => {
    it('single', () => {
        const needStr = 'bar'
        const strings = ['$FOO', '${FOO}', '{{FOO}}']
    
        strings.forEach((str) => {
            expect( prepare(str)({FOO: 'bar'})).toBe(needStr)
        })
    })
    it('multi', () => {
        const needStr = 'bar a bar b bar'
        const strings = ['$FOO a $FOO b $FOO', '${FOO} a ${FOO} b ${FOO}', '{{FOO}} a {{FOO}} b {{FOO}}']
        
        strings.forEach((str) => {
            expect( prepare(str)({FOO: 'bar'})).toBe(needStr)
        })
    })
})

