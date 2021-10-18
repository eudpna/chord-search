import React from "react"
import { GCtx } from "../../g/GCtx"
import { UI } from "./UI/UI"

export const GView: React.FC<{
    gctx: GCtx | null
}> = (props) => {
    return <UI gctx={props.gctx}/>
}
