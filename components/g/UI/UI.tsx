import React from "react";
import { GCtx } from "../../../g/GCtx";
import { SearchBox } from "./SearchBox";
import { SearchResults } from "./SearchResults";

export const UI: React.FC<{
    gctx: GCtx
}> = (props) => {
    return <>
    <div className="px-8 pb-12 mx-auto max-w-xl">
            <SearchBox gctx={props.gctx} />
            <SearchResults gctx={props.gctx} />
    </div>
    
    </>
}
