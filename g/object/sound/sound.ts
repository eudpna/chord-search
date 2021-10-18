import { GCtx } from "../../GCtx";
import { Howl } from 'howler'
import { keyidToPitch } from "./keyIdToPitch";
import { SolfaToFlat } from "./solfa";

export function sound(gctx: GCtx, keyID: number) {
    const pitch = keyidToPitch(keyID)
    const instrument = gctx.state.instrument
    const filename = `${pitch.octave}${SolfaToFlat(pitch.solfa)}.mp3`
    const audio = new Howl({
        src: [ `/audios/${instrument}/${filename}`],
        volume: 1,
    });
    audio.play()
}