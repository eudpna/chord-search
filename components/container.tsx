import { useEffect } from 'react'

const Container: React.FC<{
    wide?: boolean
}> = (props) => {

    const removeNoFocusOutline = e => {
        if (e.key === 'Tab') {
            document.body.classList.remove('no-focus-outline')
        }
    }

    useEffect(() => {
        document.body.classList.add('no-focus-outline')
        document.body.addEventListener('keyup', removeNoFocusOutline)
        return () => {
            document.body.removeEventListener('keyup', removeNoFocusOutline)
        }
    }, []);

    return (
        <>
            <div id="scroll-el">
                {props.children}
            </div>
        </>
    )
}


const scrollRemains = () => {
    const containerEl = document.getElementById('scroll-el')
    const allScrollWay = (containerEl.offsetHeight - window.innerHeight)
    return allScrollWay - window.scrollY
}

export default Container

export {
    scrollRemains
}