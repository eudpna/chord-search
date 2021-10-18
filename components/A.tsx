export const A: React.FC<{
    href: string
    inSite?: boolean
    className?: string
}> = (props) => {
    const className = props.className ? props.className : ""
    if (props.inSite) {
        return <a href={props.href} className={"text-blue-600 underline visited:text-purple-600 " + className} rel="noopener noreferrer" >{props.children}</a>
    }
    return <a href={props.href} className={"text-blue-600 underline visited:text-purple-600 " + className} target="_blank" rel="noopener noreferrer" >{props.children}</a>
}