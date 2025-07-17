import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast } from "../utils/toastHelper";

const AppContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext() {
    return useContext(AppContext);
}

const AppContextProvider = ({ children }) => {
    const [appLoading, setAppLoading] = useState(true);
    const [user, setUser] = useState({ isAuthenticated: false });

    const getUserDetails = async () => {
        try {
            setAppLoading(true);
            const resp = await axiosInstance.get("/users", {
                withCredentials: true,
            });
            if (resp.data.isSuccess) {
                setUser({
                    isAuthenticated: true,
                    ...resp.data.data.user,
                });
            } else {
                ErrorToast("Error in user validation", resp.data.message);
            }
        } catch (err) {
            console.log("Error in user validation", err.message);
            if (!["/login", "/signup", "/"].some((path) =>
                    window.location.pathname.includes(path)
                )
            ) {
                ErrorToast("Error in user validation", err.message);
            }
        } finally {
            setAppLoading(false);
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    const valueObj = {
        appLoading,
        user,
    };

    return <AppContext.Provider value={valueObj}>{children}</AppContext.Provider>;
};

export { AppContextProvider };
