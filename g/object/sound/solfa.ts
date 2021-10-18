



// 32 = 全音符
export type Solfa = 'C'
    | 'C#'
    | 'Db'
    | 'D'
    | 'D#'
    | 'Eb'
    | 'E'
    | 'F'
    | 'F#'
    | 'Gb'
    | 'G'
    | 'G#'
    | 'Ab'
    | 'A'
    | 'A#'
    | 'Bb'
    | 'B'

export  const solfaArr = [
    'C',
    'C#',
    'Db',
    'D',
    'D#',
    'Eb',
    'E',
    'F',
    'F#',
    'Gb',
    'G',
    'G#',
    'Ab',
    'A',
    'A#',
    'Bb',
    'B'
]

export const solfaFlatArr = [
        'C',
        'Db',
        'D',
        'Eb',
        'E',
        'F',
        'Gb',
        'G',
        'Ab',
        'A',
        'Bb',
        'B'
    ]


export function SolfaToFlat(solfa: Solfa): Solfa {
    return solfa.replace('C#', 'Db')
        .replace('D#', 'Eb')
        .replace('F#', 'Gb')
        .replace('G#', 'Ab')
        .replace('A#', 'Bb') as Solfa
}

export function SolfaToKatakana(solfa: Solfa): string {
    return solfa.replace('C', 'ド')
        .replace('D', 'レ')
        .replace('E', 'ミ')
        .replace('F', 'ファ')
        .replace('G', 'ソ')
        .replace('A', 'ラ')
        .replace('B', 'シ')　as Solfa
}