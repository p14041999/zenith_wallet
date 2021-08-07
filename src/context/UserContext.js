import React from 'react';

const initialValue = {
    isLoggedIn:false,
    data:{},
    login: ()=>{},
    logout: ()=>{},
    setData:()=>{}
}

export const UserContext = React.createContext(initialValue)