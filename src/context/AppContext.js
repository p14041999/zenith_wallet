import React from 'react';

const initialValue = {
    isOnboarded:false,
    isCreated:false,
    setOnBoarding: ()=>{},
    setCreation: ()=>{}
}

export const AppContext = React.createContext(initialValue);