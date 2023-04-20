import { ReactNode } from "react"

export interface HeaderBoxProps {
    title?: string,
    titleRight?: ReactNode
    description?: string
    children?: ReactNode
}