import "./style.less"
import {GridLoader, HashLoader, ScaleLoader} from "react-spinners";

interface Props {
    color?: string
}

const WuiLoadingScreen: React.FC<Props> = (
    {
        color= '#00649a'
    }
) => {

    return (
        <div className="loading-screen-section">
            <ScaleLoader color={color}/>
        </div>
    )
}

export default WuiLoadingScreen;