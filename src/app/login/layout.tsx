import React from "react";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'LoginLayout metadata'
}

type Props = { children: React.ReactNode }
const LoginLayout = ({children}: Props) => {
    return (
        <>
            {children}
        </>
    )
}

export default LoginLayout;