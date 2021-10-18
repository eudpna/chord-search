import Chord from '@tombatossals/react-chords/lib/Chord'
import Container, { scrollRemains } from '../components/container'
import instruments from '@tombatossals/chords-db/lib/instruments.json'
import Chords, { guitarChords, ukuleleChords, ChordType, name2url, url2name } from '../lib/chords'
import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import SearchIcon from '../components/icons/Search'

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
}> = (props) => {
    const [state, setstate] = useState<{
        q: string
        chords: ChordType[]
        chordsDisplayed: ChordType[]
        displayCount: number
        isDetailOpened: boolean
        theChord: ChordType | null
        isFocused: boolean
    }>({
        q: '',
        chords: getChords(props.instrument).search(''),
        chordsDisplayed: getChords(props.instrument).search('').slice(0, 15),
        displayCount: 1,
        isDetailOpened: false,
        theChord: null,
        isFocused: false
    });

    const inputRef = useRef()

    const displayStep = 15
   

    function search() {
        setstate(state => {
            const results = getChords(props.instrument).search(state.q)
            return {
                ...state,
                chords: results,
                chordsDisplayed: results.slice(0, displayStep),
                displayCount: 1
            }
        })
    }

    function displayMore() {
        setstate(state => {
            if (state.chordsDisplayed.length === state.chords.length) return state
            const c = state.displayCount + 1
            return {
                ...state,
                chordsDisplayed: state.chords.slice(0, displayStep * c),
                displayCount: c
            }
        })
    }


    useEffect(() => {
        search()
    }, [state.q, props.instrument])

    

    useEffect(() => {
        window.scrollTo(0, 0)
        window.addEventListener('scroll', handleScrollBottom)

        setstate(state => ({
            ...state,
            isFocused: document.activeElement === inputRef.current
        }))

        return () => {
            window.removeEventListener('scroll', handleScrollBottom)
        }
    }, []);

    const handleScrollBottom = (e) => { if (scrollRemains() < 400) displayMore() }

    const router = useRouter()

    // function localize<T1, T2>(en: T1, jp: T2) {
    //     return router.locale === 'en' ? en : jp
    // }

    return <>
        <Head>
            <title>ChordSearch</title>
        </Head>
        <Container>


            <div className="mx-6 relative">
                <div className="max-w-sm mx-auto">
                    <div className="pt-14">
                        <div className="flex">
                            <div className="flex-grow"></div>

                            <div className="flex text-sm text-gray-400 mr-4">
                                <div className="">
                                    {props.instrument === 'guitar' ?
                                        <div className="text-yellow-500 bg-white p-2 px-2  border-yellow-500 leading-4">
                                            Guitar
                                    </div>
                                        :
                                        <div className="bg-white rounded-lg ">
                                            <a className="block w-full h-full p-2 px-2 leading-4" href="/guitar">Guitar</a>
                                        </div>
                                    }
                                </div>
                                <div className="">
                                    {props.instrument === 'ukulele' ?
                                        <div className="  text-yellow-500  p-2 px-1 leading-4  border-yellow-500 ">
                                            Ukulele
                                    </div>
                                        :
                                        <div className="">
                                            <a className="block w-full h-full p-2 px-1 leading-4 " href="/ukulele ">Ukulele</a>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="relative ">
                            <div className="absolute pointer-events-none">
                                {state.q !== '' || state.isFocused ? null : <div className="flex">
                                    <div className="h-10 w-9 py-1.5 pl-2" style={{
                                        paddingTop: '0.57rem',
                                        paddingBottom: '0.42rem'
                                    }}>
                                        <SearchIcon />
                                    </div>
                                    <p className="h-10 leading-8 py-1 text-gray-400 " style={{
                                        // color: '#c7cbd1',
                                        paddingTop: '0.3rem'
                                    }}>Enter a chord name</p>
                                </div>}
                            </div>
                            <input
                                onFocus={() => {
                                    setstate(state => ({
                                        ...state,
                                        isFocused: true
                                    }))
                                }}
                                onBlur={() => {
                                    setstate(state => ({
                                        ...state,
                                        isFocused: false
                                    }))
                                }}
                                ref={inputRef}
                                className="w-full p-2 px-4 rounded-lg bg-gray-100"
                                type="text"
                                value={state.q}
                                placeholder={""}
                                onChange={e => {
                                    setstate(state => ({
                                        ...state,
                                        q: e.target.value,
                                    }))
                                }}
                            />
                        </div>
                        
                    </div>
                    <div className="w-full my-8 mt-4 pb-20">
                        <div className="text-center mb-4 text-sm text-gray-500">
                            {state.q.trim() === '' ? <p className="">{state.chords.length} chords available</p> :
                                state.chords.length === 0 ? <p>no results found for <span className="font-bold">{state.q}</span></p>:
                                <p><span className="">results for </span><span className="font-bold">{state.q}</span></p>
                            }
                        </div>

                        <div className="w-full border-t ">
                            {state.chordsDisplayed.map((c, i) => {
                                return (
                                    <div key={props.instrument+c.key+c.suffix} className="w-full max-w-sm mx-auto border-b ">
                                        <div>
                                            <a href={'/' + props.instrument + '/' + name2url(c.key + c.suffix)} className="h-full w-full block">
                                                <div
                                                    className="h-full w-full flex p-2 relative"
                                                >
                                                    {/* <div className="flex-grow w-12">

                                                    </div> */}
                                                    <div className="">
                                                        <div className="w-24 h-24 mx-auto pt-1">
                                                            <Chord
                                                                chord={c.positions[0]}
                                                                instrument={props.instrument === 'guitar' ? guitarInstrument : ukuleleInstrument}
                                                                lite={true}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="py-6 flex flex-col h-full">
                                                        <p className="text-gray-700 no-underline text-2xl">
                                                            {c.key + c.suffix}
                                                        </p>
                                                        <p className="text-yellow-500 text-sm pl-0.5">
                                                            Click to view details →
                                                        </p>
                                                    </div>
                                                 
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                )

                            })}
                        </div>
                    </div>
                    {/* <div className="text-gray-500 text-center py-8">
                        <p>created by <a className="underline" href="https://twitter.com/teiwv" target="_blank" rel="noopener noreferrer">@teiwv</a></p>
                    </div> */}
                </div>
            </div>
        </Container>
    </>


}







export async function getStaticPaths() {
    return {
        paths: [
            {
                params: {
                    instrument: 'guitar'
                }
            },
            {
                params: {
                    instrument: 'ukulele'
                }
            },
        ],
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    return {
        props: {
            instrument: params.instrument
        },
    }
}

export default Element