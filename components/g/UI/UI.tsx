import React from "react";
import { GCtx } from "../../../g/GCtx";
import { A } from "../../A";
import { InstrumentBtns } from "./InstrumentBtns";
import { SearchBox } from "./SearchBox";
import { SearchResults } from "./SearchResults";

export const UI: React.FC<{
    gctx: GCtx
}> = (props) => {
    return <>
        <div className="px-8 pb-6 mx-auto max-w-lg">
            <div className="pb-6">
                <InstrumentBtns gctx={props.gctx} />
                <SearchBox gctx={props.gctx} />
                <SearchResults gctx={props.gctx} />
            </div>

            <div className="py-6 text-sm text-center">
                <div>
                    <A href="https://github.com/eudpna/chord-search">GitHubでソースを見る</A>
                </div>
                <div className="my-4">
                    <A href="https://nyaw.net">nyaw.net</A>
                </div>
            </div>
        </div>
    </>
}
