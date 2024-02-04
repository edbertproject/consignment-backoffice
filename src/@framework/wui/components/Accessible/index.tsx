import useAccess from "../../../utilities/hooks/useAccess"
import React, { ReactChild, ReactChildren } from 'react'
import { haveAccess } from "../../../../functions/global"

interface Props {
    access: string | string[],
    children: ReactChildren | ReactChild
}

const Accessible = (props: Props) => {
    const acl = useAccess()

    if(!haveAccess(acl, props.access)){
        return null
    }
    return <>{props.children}</> 
}

export default Accessible