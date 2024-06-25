'use client'
import React, { useState } from "react";

const MyKuttanaduAdminNavbarContext = React.createContext({
    isDisplayed: false,
    openNavbar: () => {},
    onClose: ()=>{}
});
const MyKuttanaduAdminNavbarProvider = ({children}:{children:React.ReactNode}) =>{

    const [open, setopen] = useState(false)
    return <MyKuttanaduAdminNavbarContext.Provider value={{
        isDisplayed :open,
        openNavbar: () => {
            setopen((prev)=>!prev);
            console.log(open);
        },
        onClose: ()=> setopen(false)
    }}>
        {children}
    </MyKuttanaduAdminNavbarContext.Provider>
}
export { MyKuttanaduAdminNavbarContext , MyKuttanaduAdminNavbarProvider };

