import React,{createContext, useState} from "react";

export const VechicleArrayContext = createContext();

export const VechicleArrayContextProvider = ({children}) => {

    const [vechicleArrayContext, setVechicleArrayContext] = useState([]);

    return(
        <VechicleArrayContext.Provider value={[vechicleArrayContext, setVechicleArrayContext]}>
            {children}
        </VechicleArrayContext.Provider>
    )
}
