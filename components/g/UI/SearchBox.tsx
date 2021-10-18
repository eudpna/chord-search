import { useEffect } from "react"
import { GCtx } from "../../../g/GCtx"
import { guitarChords, ukuleleChords } from "../../../lib/chords"

const getChords = (instrument: 'guitar' | 'ukulele') => instrument === 'guitar' ? guitarChords : ukuleleChords

export const SearchBox: React.FC<{
    gctx: GCtx
}> = (props) => {
    
    useEffect(() => {
        
        setTimeout(() => {
            search(props.gctx)
            props.gctx.render()
        }, 0)
    }, [])

    return <input
            className="mb-4 w-full p-2 px-4 rounded-lg border-gray border-2"
            type="text"
            value={props.gctx.state.q}
            placeholder={"コードを検索"}
            onChange={e => {
                props.gctx.state.q = e.target.value
                search(props.gctx)
                props.gctx.render()
            }}
        />
}

export function search(gctx: GCtx) {
    const results = getChords(gctx.state.instrument).search(gctx.state.q)
    console.log(results)
    gctx.state.chords = results.slice(0, 20)
    gctx.state.theChord = null
}