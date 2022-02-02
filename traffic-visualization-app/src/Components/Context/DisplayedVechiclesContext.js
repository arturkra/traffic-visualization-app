import React,{createContext, useState} from "react";

export const DisplayedVechiclesContext = createContext();

export const DisplayedVechiclesContextProvider = ({children}) => {

    const [displayedVechiclesContext, setDisplayedVechiclesContext] = useState([]);

    return(
        <DisplayedVechiclesContext.Provider value={[displayedVechiclesContext, setDisplayedVechiclesContext]}>
            {children}
        </DisplayedVechiclesContext.Provider>
    )
}