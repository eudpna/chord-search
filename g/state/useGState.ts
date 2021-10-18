import { useState } from "react";
import { GState, newGState } from "./GState";

const useGState = (): [GState, () => void] => {
    const [state, setstate] = useState<{
        gState: GState
    }>({
        gState: newGState()
    });

    const setGState = () => {
        setstate(state => {
            return {
                ...state,
            }
        })
    }

    return [state.gState, setGState]
}

export default useGState