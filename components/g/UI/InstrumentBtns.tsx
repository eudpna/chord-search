import React from "react";
import { GCtx } from "../../../g/GCtx";
import { search, SearchBox } from "./SearchBox";

export const InstrumentBtns: React.FC<{
    gctx: GCtx
}> = (props) => {
    const gctx = props.gctx
    const state = props.gctx.state
    return <>
    <div className="flex">
        <div className="flex-grow"></div>
        <div>
                <button className={"text-center w-24 px-1 py-1 border-2 rounded-lg mx-1 my-3 " + (state.instrument === 'guitar' ? 'bg-gray-200 ' : 'text-gray-300')}
                    onClick={() => {
                        state.instrument = 'guitar'
                        search(props.gctx)
                        gctx.render()
                    }}>ギター</button>
                <button 
                    onClick={() => {
                        state.instrument = 'ukulele'
                        search(props.gctx)
                        gctx.render()
                    }}
                className={"text-center w-24 px-1 py-1 border-2 border-gray rounded-lg mx-1 my-3 " + (state.instrument === 'ukulele' ? 'bg-gray-200 ' : 'text-gray-300')}>ウクレレ</button>
        </div>

    </div>
    </>
}
