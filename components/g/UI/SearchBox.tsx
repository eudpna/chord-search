import { GCtx } from "../../../g/GCtx"
import { guitarChords, ukuleleChords } from "../../../lib/chords"

const getChords = (instrument: 'guitar' | 'ukulele') => instrument === 'guitar' ? guitarChords : ukuleleChords

export const SearchBox: React.FC<{
    gctx: GCtx
}> = (props) => {
    return <input
            className="w-full p-2 px-4 rounded-lg border-gray border-2"
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
    gctx.state.chords = results.slice(0, 20)
}