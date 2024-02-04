import {Navigate, Outlet} from "react-router";
import {useAppSelector} from "../../stores/hooks";
import {usePassportService} from "../../@framework/utilities/hooks";
import WuiLoadingScreen from "../../@framework/wui/components/LoadingScreen";

const AuthLayout: React.FC<any> = () => {
    const {isOnFetchingUser} = usePassportService()
    const system = useAppSelector((state) => state.system)

    if (isOnFetchingUser) {
        return <WuiLoadingScreen/>
    }

    if (system.isLoggedIn) {
        return <Navigate to={'/'} replace/>;
    }

    return (
        <section id={'auth-layout'}>
            <div className="container-wrapper">
                <div className="container">
                    <Outlet/>
                </div>
            </div>
        </section>
    )
}

export default AuthLayout
