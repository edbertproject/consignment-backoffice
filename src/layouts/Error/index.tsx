import WuiHeader from "../../@framework/wui/components/Header";
import {Outlet} from "react-router";
/*import WuiFooter from "../../@framework/wui/components/Footer";*/

const ErrorLayout: React.FC<any> = () => {
    return (
        <section id={'auth-layout'}>
            <WuiHeader/>

            <div className="container-wrapper">
                <div className="container">
                    <Outlet/>
                </div>
            </div>

            {/*<WuiFooter/>*/}
        </section>
    )
}

export default ErrorLayout
