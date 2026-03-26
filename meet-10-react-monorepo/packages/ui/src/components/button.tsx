import * as React from "react"

interface ButtonProps {
    children: React.ReactNode
}

export const Button = (props: ButtonProps) => {
    return <button style={{background: "blue"}}>{props.children}</button>
}