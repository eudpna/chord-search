import { GState } from "./state/GState";

export type GCtx = {
    state: GState
    render: () => void
}