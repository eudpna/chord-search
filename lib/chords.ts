import guitar from '@tombatossals/chords-db/lib/guitar.json'
import ukulele from '@tombatossals/chords-db/lib/ukulele.json'

const keysPriority = [
    'C',
    'D',
    'E',
    'F',
    'G',
    'A',
    'B',
    'Db',
    'Eb',
    'Gb',
    'Ab',
    'Bb',
    'C#',
    'D#',
    'F#',
    'G#',
    'A#'
]

const key2sharp = key => key
    .replace('Db', 'C#')
    .replace('Eb', 'D#')
    .replace('Gb', 'F#')
    .replace('Ab', 'G#')
    .replace('Bb', 'A#')

const key2flat = key => key
    .replace('C#', 'Db')
    .replace('D#', 'Eb')
    .replace('F#', 'Gb')
    .replace('G#', 'Ab')
    .replace('A#', 'Bb')

const guitarChordsData = Object.values(guitar.chords).flatMap(a => a)
const ukuleleChordsData = Object.values(ukulele.chords).flatMap(a => a)

export type ChordType = typeof guitarChordsData[number]

export default class Chords {
    public readonly chords: {[key: string]: ChordType} = {}
    private keys = new Set()
    private suffixes = new Set()

    make(c: ChordType) {
        this.keys.add(c.key)
        this.suffixes.add(c.suffix)
        this.chords[c.key + c.suffix] = { ...c }
    }

    constructor(chords: ChordType[]) {
        chords.forEach(c => {
            c.suffix = c.suffix
                .replace('minor', 'm')
                .replace('mmaj', 'mM')
                .replace('major', 'maj')
                .replace('maj', 'M')

            c.key = key2flat(c.key)
            this.make(c)

            if (c.key.substr(1, 1) === 'b') {
                c.key = key2sharp(c.key)
                this.make(c)
            }
        })
    }

    getChordsByKey(key: string) {
        return Object.values(this.chords).filter(c => c.key === key)
    }

    getChordsBySuffix(suffix: string) {
        return Object.values(this.chords).filter(c => c.suffix === suffix)
    }

    getChordByName(name: string) {
        if (!(name in this.chords)) return null
        return this.chords[name]
    }

    keyExists(key: string) {
        return this.keys.has(key)
    }

    suffixExists(suffix: string) {
        return this.suffixes.has(suffix)
    }

    // getPrimaryChords(key: string) {
    //     return ['major', 'minor', '7', 'm7', 'maj7', 'dim', 'sus4', 'sus2', '6', '9'].map(s => this.chords[key + s])
    // }

    private sort(chords: ChordType[]) {
        return chords.sort((a, b) => {
            const ap = keysPriority.indexOf(a.key)
            const bp = keysPriority.indexOf(b.key)
            return ap - bp
        })
    }

    search(query: string) {
        const results: (ChordType | null)[] = []

        let q = query
        q = q
            .replace('＃', '#')
            .replace('マイナー', 'min')
            .replace('メジャー', 'maj')
            .replace('サス', 'sus')
            .replace('フォー', '4')
            .replace('セブンス', '7')
            .replace('セブン', '7')
            .replace('ナインス', '9')
            .replace('ナイン', '9')
            .replace('シックス', '6')
            .replace(/\s/g, '')
        q = format2name(q)

        if (q === '') return this.sort(Object.values(this.chords))

        // minor
        results.push((() => {
            const m = q.match(/^(C#|C|D#|Db|D|Eb|E|F#|F|G#|Gb|G|A#|Ab|A|Bb|B)m$/)
            if (!m) return null
            return this.getChordByName(m[1].slice(0, 1).toUpperCase() + m[1].slice(1) + 'minor')
        })())

        // key exact match
        results.push(...(() => {
            return this.getChordsByKey(q)
        })())

        // exact match
        results.push((() => {
            return this.getChordByName(q)
        })())

        // suffix exact match
        results.push(...(() => {
            return this.sort(
                this.getChordsBySuffix(q)
            )
        })())

        // head match
        results.push(...(() => {
            return this.sort(
                Object.values(this.chords).filter(c => (c.key+c.suffix).indexOf(q) === 0)
            )
        })())

        // suffix head match
        results.push(...(() => {
            return this.sort(
                Object.values(this.chords).filter(c => (c.suffix).indexOf(q) === 0)
            )
        })())

        // include
        results.push(...(() => {
            return this.sort(
                Object.values(this.chords).filter(c => (c.key+c.suffix).indexOf(q) !== -1)
            )
        })())


        return Array.from(new Set(results.filter(r => r !== null)))
    }
}

function name2url(name: string) {
    return name.replace(/#/g, 'sharp')
        .replace(/\//g, 'on')
        .replace(/M/g, 'maj')
}

function url2name(url: string) {
    return url.replace(/sharp/g, '#')
        .replace(/on/g, '/')
        .replace(/maj/g, 'M')
}

const guitarChords = new Chords(guitarChordsData)
const ukuleleChords = new Chords(ukuleleChordsData)

export {
    guitarChords,
    ukuleleChords,
    name2url,
    url2name,
}



function format2name(q: string) {
    return q.replace(/M(?!a)/, 'maj')
    .toLowerCase()
        .replace('major', 'maj')
        .replace('maj', 'M')
        .replace('minor', 'm')
        .replace('min', 'm')
        .replace('on', '/')
        .replace(/\/(c|d|e|f|g|a|b)/,
            function (m, m1) {
                return '/'+m1.toUpperCase();
            })
        .replace(/^(csharp|c|dsharp|db|d|eb|e|fsharp|f|gsharp|gb|g|asharp|ab|a|bb|b)(?!dd)(?!l)(?!u)(?!i)/,
            function (m, m1) {
                return m1.substr(0, 1).toUpperCase() + m1.substr(1)
            })
}
