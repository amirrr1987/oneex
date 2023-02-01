import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react"

const Button = (props) => {
    return (
        <button className={`bg-[#4ac1c7] text-white px-4 py-2 rounded ${props.className}`}>
            {props.children}
        </button>
    )
}
export default Button