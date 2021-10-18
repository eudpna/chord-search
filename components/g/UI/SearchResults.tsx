import { GCtx } from "../../../g/GCtx"
import Chord from '@tombatossals/react-chords/lib/Chord'
import instruments from '@tombatossals/chords-db/lib/instruments.json'
import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { name2url } from "../../../lib/chords"


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



export const SearchResults: React.FC<{
    gctx: GCtx
}> = (props) => {
    const gctx = props.gctx
    const state = gctx.state
    return <>{
        state.chords.map((c, i) => {
            return (
                <div key={state.instrument + c.key + c.suffix}
                className="w-full max-w-sm mx-auto border-2 my-4 rounded-lg cursor-pointer"
                onClick={() => {
                    if (gctx.state.theChord !== c) {
                        gctx.state.theChord = c
                    } else gctx.state.theChord = null
                    gctx.render()
                }}
                >
                    <div className="w-full flex">
                        <div className="text-gray-700 text-2xl flex-grow px-4 py-4">
                            <div>
                                {c.key + c.suffix}
                            </div>
                            <div>
                                音を再生
                            </div>
                        </div>
                        <div className="w-52 pt-1 mx-4 my-2">
                            {state.theChord !== c ?
                                <div>
                                    <Chord
                                        chord={c.positions[0]}
                                        instrument={state.instrument === 'guitar' ? guitarInstrument : ukuleleInstrument}
                                        lite={true}
                                    />
                                </div> :
                                c.positions.map((p, i) =>
                                    <div className="my-2">
                                        <div key={i} className="my-3">
                                            <Chord
                                                chord={p}
                                                instrument={state.instrument === 'guitar' ? guitarInstrument : ukuleleInstrument}
                                            />
                                        </div>
                                    </div>)
                            }
                        </div>
                    </div>
                </div>
            )

        })
    }</>
}