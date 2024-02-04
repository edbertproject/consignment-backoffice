import './style.less'
import React from "react";

const WuiContainer: React.FC<any> = ({children}) => {
    return (
        <div className="wui-container-wrapper">
            <div className="container">
                {children}
            </div>
        </div>
    )
}

export default WuiContainer
