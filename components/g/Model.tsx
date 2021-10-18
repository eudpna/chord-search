import React from "react"
import { GCtx } from "../../g/GCtx"
import { newGState } from "../../g/state/GState"
import useGState from "../../g/state/useGState"
import { GController } from "./Controller"

export const GModel: React.FC<{}> = () => {
    const [gState, _] = useGState()

    function fire() {
        window.dispatchEvent(new CustomEvent('custom', {
        }))
    }

    const gctx: GCtx = {
        state: gState,
        render: fire
    }
   
    return <>
        <GController gctx={gctx}/>
    </>
}
