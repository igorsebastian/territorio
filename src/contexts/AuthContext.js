import { createContext, useState, useEffect } from "react"
import { auth } from "../service/firebase"
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export default function AuthContextProvider(props) {
    const [user, setUser] = useState();

    //Verifica login
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                console.log("Usuário logado UID: " + user.email);
                console.log(user)
            } else {
                //console.log("Usuário não logado");
            }
        })
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}