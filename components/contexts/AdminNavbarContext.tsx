'use client'
import React, { useState } from "react";

const AdminNavbarContext = React.createContext({
    isDisplayed: false,
    openNavbar: () => {},
    onClose: ()=>{}
});
const AdminNavbarProvider = ({children}:{children:React.ReactNode}) =>{

    const [open, setopen] = useState(false)
    return <AdminNavbarContext.Provider value={{
        isDisplayed :open,
        openNavbar: () => setopen((prev)=>!prev),
        onClose: ()=> setopen(false)
    }}>
        {children}
    </AdminNavbarContext.Provider>
}
export { AdminNavbarContext , AdminNavbarProvider };

