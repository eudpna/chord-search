import { ChordType } from "../../lib/chords"

export type GState = {
    instrument: 'guitar' | 'ukulele'
    q: string
    chords: ChordType[]
    theChord: ChordType | null
}

export function newGState(): GState {
    return {
        instrument: 'guitar',
        q: '',
        chords: [],
        theChord: null,
    }
}