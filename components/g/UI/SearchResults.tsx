import { GCtx } from "../../../g/GCtx"
import Chord from '@tombatossals/react-chords/lib/Chord'
import instruments from '@tombatossals/chords-db/lib/instruments.json'
import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ChordType, name2url } from "../../../lib/chords"
import { sound } from "../../../g/object/sound/sound"
import SoundIcon from "../../icons/Sound"


export const guitarInstrument = {
    ...instruments.guitar,
    tunings: {
        standard: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']
    }
}

export const ukuleleInstrument = {
    ...instruments.ukulele,
    tunings: {
        standard: ['G4', 'C4', 'E4', 'A4']
    }
}



export const SearchResult: React.FC<{
    gctx: GCtx
    chord: ChordType
}> = (props) => {
    const [state, setState] = useState<{
        isSounding: boolean
    }>({
        isSounding: false
    })
    
    const gctx = props.gctx
    const c = props.chord
    
    return (
        <div key={gctx.state.instrument + c.key + c.suffix}
            className="w-full max-w-sm mx-auto border-2 my-4 rounded-lg cursor-pointer relative pb-2"
            onClick={(e) => {
                if (gctx.state.theChord !== c) {
                    gctx.state.theChord = c
                } else gctx.state.theChord = null
                gctx.render()
            }}
        >
            {gctx.state.theChord !== c ? <div className="p-1 absolute bottom-0 right-0 text-xs text-gray-400">タップして詳細を表示</div> : null}
            <div className="w-full flex">
                <div className="text-gray-700 text-2xl flex-grow px-4 py-4">
                    <div className="ml-1">
                        {c.key + c.suffix}
                    </div>
                    <div
                        className={"mt-2 rounded-full w-16 h-16 border-gray border-2 p-4 " + (state.isSounding ? 'bg-gray-200' : '')}
                        onClick={(e) => {
                            e.stopPropagation()
                            c.positions[0].midi.map(keyId => {
                                sound(gctx, keyId)
                            })
                            setState(state => ({
                                isSounding: true
                            }))
                            setTimeout(() => {
                                setState(state => ({
                                    isSounding: false
                                }))
                            }, 500)
                        }}>
                        <SoundIcon />
                    </div>
                </div>
                <div className="w-52 pt-1 mx-4 my-2">
                    {gctx.state.theChord !== c ?
                        <div>
                            <Chord
                                chord={c.positions[0]}
                                instrument={gctx.state.instrument === 'guitar' ? guitarInstrument : ukuleleInstrument}
                                lite={true}
                            />
                        </div> :
                        c.positions.map((p, i) =>
                            <div key={i} className="my-2">
                                <div className="my-3">
                                    <Chord
                                        chord={p}
                                        instrument={gctx.state.instrument === 'guitar' ? guitarInstrument : ukuleleInstrument}
                                    />
                                </div>
                            </div>)
                    }
                </div>
            </div>
        </div>
    )
}


export const SearchResults: React.FC<{
    gctx: GCtx
}> = (props) => {
    return <>{
        props.gctx.state.chords.map((c, i) => <div key={i}><SearchResult gctx={props.gctx} chord={c}/></div>)
    }</>
}