import React, { useEffect, useState } from "react";
import { GCtx } from "../../g/GCtx";
import { GView } from "./View";

export const GController: React.FC<{
    gctx: GCtx | null
}> = (props) => {

    const [_, setState] = useState<{}>({})
    
    function rerender() {
        setState(state => ({...state}))
    }

    useEffect(() => {
        if (props.gctx === null) return
        
        window.addEventListener('custom', e => {
            rerender()
        })
    }, [props.gctx === null]);

    return <>
        <GView gctx={props.gctx}/>
    </>
}
