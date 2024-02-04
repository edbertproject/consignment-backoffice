import {useAppDispatch, useAppSelector} from "../../../stores/hooks";
import {useMemo, useState} from "react";
import {update} from "../../../stores/system";
import passportService from "../../services/passport.service";
import useIsMounted from "./useIsMounted";


const usePassportService = (disableAutoFetchUser = false) => {
    const dispatch = useAppDispatch()
    const system = useAppSelector((state) => state.system)
    const isMounted = useIsMounted()

    const [isOnSignIn, setIsOnSignIn] = useState(false);
    const [isOnFetchingUser, setIsOnFetchingUser] = useState(!disableAutoFetchUser);

    const fetchUser = async () => {
        const accessToken = passportService.getAccessToken();
        if (accessToken && !system.isLoggedIn) {
            setIsOnFetchingUser(true);
            await passportService
                .fetchUser()
                .then((response: any) => {
                    if (isMounted) {
                        dispatch(update({
                            isLoggedIn: true,
                            account: response.data.data
                        }))
                    }
                })
                .catch(() => {});
        }

        setIsOnFetchingUser(false);
    };

    const login = async (username: string, password: string, scope: string = '*') => {
        return new Promise(async (resolve, reject) => {
            setIsOnSignIn(true);

            await passportService
                .login(username, password, scope)
                .then(response => {
                    setIsOnFetchingUser(true);
                    resolve(response);
                })
                .catch(error => {
                    if (error.response) {
                        // Request made and server responded
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }

                    reject(error)
                });

            setIsOnSignIn(false);
        });
    };

    const logout = async () => {
        return new Promise(async (resolve, reject) => {
            localStorage.setItem('isLoggedIn', 'false');
            dispatch(update({
                isLoggedIn: false
            }))
            resolve(true)
        })
    }

    useMemo(() => {
        (async () => {
            if (isOnFetchingUser) {
                await fetchUser()
                    .then(() => {})
                    .catch(() => {});
            }
        })();

    }, [isOnFetchingUser]); // eslint-disable-line react-hooks/exhaustive-deps

    return {
        isOnSignIn,
        isOnFetchingUser,
        login,
        logout,
        fetchUser
    };
}

export default usePassportService;
