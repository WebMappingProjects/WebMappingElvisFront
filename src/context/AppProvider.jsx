import { createContext, useContext, useRef, useState } from "react";

const appMainContext = createContext();

export function useAppMainContext () {
    return useContext(appMainContext);
}

const AppProvider = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState(0);

    const value = {
        activeMenu, setActiveMenu
    };

  return <appMainContext.Provider value={value}>{children}</appMainContext.Provider>;
}

export default AppProvider;
