import React from "react";
import {useState} from "@hookstate/core";
import Switch from "antd/lib/switch";
interface Props {
    id: number,
    is_active: boolean,
    disabled?: boolean
    callback: (id: number, is_active: boolean) => Promise<any>
}

const WuiTableSwitch: React.FC<Props> = (
    {
        id,
        is_active,
        callback,
        disabled = false,
    }
) => {
    const scopeValue = useState<boolean>(is_active)
    const loading = useState<boolean>(false)

    const handleOnChange = async (val: boolean) => {
        loading.set(true)

        await callback(id, val).then((res) => {
            scopeValue.set(val)
            loading.set(false)
        }).catch((e) => {
            loading.set(false)
        })
    }

    return (
        <Switch disabled={disabled} checked={scopeValue.get()} loading={loading.get()} onChange={handleOnChange} />
    )
}

export default WuiTableSwitch;