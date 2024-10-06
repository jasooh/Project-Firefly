"use client"

import {createContext, useContext, useState} from "react";

const FireData = createContext({})

const FireDataContext = ({children}) => {
    const [fireCount, setFireCount] = useState(0);
    const [xCoordinate, setXCoordinate] = useState(0);
    const [yCoordinate, setYCoordinate] = useState(0);
    const [temp, setTemp] = useState(0);

    return <FireData.Provider
        value={{fireCount, setFireCount, xCoordinate, setXCoordinate, yCoordinate, setYCoordinate, temp, setTemp}}>
        {children}
    </FireData.Provider>
}

const useFireContext = () => {
    return useContext(FireData);
}

export {FireDataContext, useFireContext};