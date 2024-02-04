import {Navigate, Outlet} from "react-router";
import WuiHeader from "../../@framework/wui/components/Header";
import {useAppSelector} from "../../stores/hooks";
import {usePassportService} from "../../@framework/utilities/hooks";
import WuiMainMenu from "../../@framework/wui/components/MainMenu";
import {defaultMenus} from "../../constant/menu"
import WuiLoadingScreen from "../../@framework/wui/components/LoadingScreen";
import React, { useEffect } from "react";
import AccountRepository from "../../repositories/AccountRepository"

const AppLayout: React.FC<any> = () => {
    const {isOnFetchingUser} = usePassportService()
    const system = useAppSelector((state) => state.system)
    const [notif, setNotif] = React.useState<any>([])
    const [unreadNotif, setUnreadNotif] = React.useState<boolean>(false)

    useEffect(() => {  
        if(system.isLoggedIn){
            getNotifications()
        }
    }, [unreadNotif, system.isLoggedIn]) // eslint-disable-line react-hooks/exhaustive-deps

    const getNotifications = async () => {
        try {
            let params: any = {
                per_page: 99999,
            } 
            if(unreadNotif){
                params['only'] = 'unread' 
            }
            const res = await AccountRepository.allNotification(params)
            setNotif(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleReadAll = async () => {
        try{
            await AccountRepository.readAllNotification()
            getNotifications()
        } catch(err){

        }
    }

    const handleReadNotif = async (id: number | string) => {
        try{
            await AccountRepository.showNotification(id)
            getNotifications()
        } catch(err){

        }
    }

    if (isOnFetchingUser) {
        return <WuiLoadingScreen/>
    }

    if (!system.isLoggedIn) {
        return <Navigate to={'/login'} replace/>;
    }

    return (
        <section id={'app-layout'}>
            <WuiHeader notif={notif} 
                handleUnreadSwitch={((value:boolean) => setUnreadNotif(value))} 
                handleReadAll={handleReadAll}
                handleReadNotif={handleReadNotif}
            />
            <div className="container-wrapper">
                <main className="navigation-vertical-wrapper show-lg">
                    {
                        (system.isLoggedIn) ? (
                            <>
                                <WuiMainMenu menus={defaultMenus} mode="inline"/>
                            </>
                        ) : null
                    }
                </main>


                <Outlet/>
            </div>
        </section>
    )
}

export default AppLayout
