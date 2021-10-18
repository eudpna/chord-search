import Chord from '@tombatossals/react-chords/lib/Chord'
import Container from '../components/container'
import instruments from '@tombatossals/chords-db/lib/instruments.json'
import Chords, { guitarChords, ukuleleChords, ChordType, url2name, name2url } from '../lib/chords'
import Head from 'next/head'
import BackIcon from '../components/icons/Back'
import LeftArrow from '../components/icons/LeftArrow'

const guitarInstrument = {
    ...instruments.guitar,
    tunings: {
        standard: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']
    }
}

const ukuleleInstrument = {
    ...instruments.ukulele,
    tunings: {
        standard: ['G4', 'C4', 'E4', 'A4']
    }
}

type Instrument = 'guitar' | 'ukulele'

const getChords = (instrument: Instrument) => instrument === 'guitar' ? guitarChords : ukuleleChords

const Element: React.FC<{
    instrument: Instrument,
    chord: ChordType
}> = (props) => {
    const instrument = props.instrument
    const chord = props.chord
    return (
        <Container>


            <div className="max-w-sm mx-auto">
                <a className="w-24 h-24 p-8 pl-9 block" href={`/${instrument}`} style={{
                    marginLeft: '-0.5rem',
                    marginTop: '-0.5rem'
                }}>
                    <div>
                        <LeftArrow />
                    </div>
                </a>
            </div>
        <div className="p-6 pt-0">
            <Head>
                <title>{instrument === 'guitar' ? 'Guitar' : 'Ukulele'} {chord.key+chord.suffix} | ChordSearch</title>
            </Head>
         
            
            <div className=" bg-white  max-w-sm mx-auto">
                <h2 className="text-center text-4xl text-gray-600">{chord.key + chord.suffix}</h2>
                <div className="max-w-xs mx-auto mt-4 pb-12">
                    <div className="ml-5">
                        {chord.positions.map((p, i) =>
                        <div key={i} className="my-3">
                            <Chord
                                chord={p}
                                instrument={instrument === 'guitar' ? guitarInstrument : ukuleleInstrument}
                            />
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
        </Container>
    )
}

export async function getStaticPaths() {
    const arr1 = Object.values(getChords('guitar').chords).map(c => ({
        params: {
            param: ['guitar', name2url(c.key + c.suffix)]
        },
    }))
    const arr2 = Object.values(getChords('ukulele').chords).map(c => ({
        params: {
            param: ['ukulele', name2url(c.key + c.suffix)]
        },
    }))
    return {
        paths: arr1.concat(arr2),
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const instrument: Instrument = params.param[0]
    
    return {
        props: {
            instrument,
            chord: getChords(instrument).chords[url2name(params.param[1])]
        },
    }
}

export default Element