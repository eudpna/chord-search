import { GCtx } from "../../../g/GCtx"
import Chord from '@tombatossals/react-chords/lib/Chord'
import instruments from '@tombatossals/chords-db/lib/instruments.json'
import React, { useState, useEffect, useRef } from 'react'
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

export const Position: React.FC<{
    gctx: GCtx
    position: ChordType['positions'][number]
}> = (props) => {

    const [state, setState] = useState<{
        isSounding: boolean
    }>({
        isSounding: false
    })


    return <div className="my-2 flex pl-2">
        <div className="flex flex-col">
            <div className="flex-grow"></div>
            <div
                className={"rounded-full w-16 h-16 border-gray border-2 p-4 mb-6 ml-3 " + (state.isSounding ? 'bg-gray-200' : '')}
                onClick={(e) => {
                    e.stopPropagation()
                    sound(props.gctx, props.position.midi)
                    .then(() => {
                        setTimeout(() => {
                            setState(state => ({
                                isSounding: false
                            }))
                        }, 500)
                    })
                    setState(state => ({
                        isSounding: true
                    }))
                }}>
                <SoundIcon />
            </div>
        </div>
    
        <div className="my-3">
            <Chord
                chord={props.position}
                instrument={props.gctx.state.instrument === 'guitar' ? guitarInstrument : ukuleleInstrument}
            />
        </div>
    </div>
}

export const SearchResult: React.FC<{
    gctx: GCtx
    chord: ChordType
}> = (props) => {
    
    
    const gctx = props.gctx
    const c = props.chord
    const positions = gctx.state.theChord !== c ? c.positions.slice(0, 1) : c.positions
    
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
                <div className="absolute top-0 left-0 text-gray-700 text-2xl flex-grow p-3">
                    <div className="ml-1 pl-2">
                        {c.key + c.suffix}
                    </div>
                    
                </div>
                <div className="">
                    {positions.map((p, i) =>
                        <div key={i} >
                            <Position gctx={gctx} position={p}/>
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