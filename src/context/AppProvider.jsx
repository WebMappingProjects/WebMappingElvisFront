import { createContext, useContext, useRef, useState } from "react";

const appMainContext = createContext();

export function useAppMainContext () {
    return useContext(appMainContext);
}

const AppProvider = ({ children }) => {
    const [ currentLayerName, setCurrentLayerName ] = useState("");
    const [ currentLayerAttribution, setCurrentLayerAttribution ] = useState("");

    const [ authUser, setAuthUser ] = useState(null);

    const value = {
        currentLayerName, setCurrentLayerName,
        currentLayerAttribution, setCurrentLayerAttribution,
        authUser, setAuthUser
    };

  return <appMainContext.Provider value={value}>{children}</appMainContext.Provider>;
}

export default AppProvider;
