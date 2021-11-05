import { GCtx } from "../../GCtx";
import { Howl } from 'howler'
import { keyidToPitch } from "./keyIdToPitch";
import { SolfaToFlat } from "./solfa";



export function sound(gctx: GCtx, keyIDs: number[]) {
    const promises = keyIDs.map(keyID => {
        return new Promise<Howl>((resolve) => {
            const pitch = keyidToPitch(keyID)
            const instrument = gctx.state.instrument
            const filename = `${pitch.octave}${SolfaToFlat(pitch.solfa)}.mp3`
            const audio = new Howl({
                src: [`/audios/${instrument}/${filename}`],
                volume: 0.3,
            });
            if (audio.state() === 'loaded') resolve(audio)
            else audio.on('load', () => {
                resolve(audio)
            })
        })
    })
    return Promise.all(promises)
    .then(audios => {
        audios.map(audio => audio.play())
    })
}