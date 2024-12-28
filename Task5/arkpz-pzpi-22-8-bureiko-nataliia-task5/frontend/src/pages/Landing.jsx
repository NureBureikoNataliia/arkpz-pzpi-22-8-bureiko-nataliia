import { CreateUser } from "../components/CreateUser"
import { Login } from "../components/Login"
import { useState } from "react"

export function Landing() {

    //view == 0 --> Login
    const [view, setView] = useState(0)

    return (
        <>
            {!view ? 
            <> 
                <Login/>
                <button onClick={() => setView(!view)}>Create new Account</button>
            </> :
            <>
                <CreateUser/>
                <button onClick={() => setView(!view)}>Login</button>
            </>
            }
        </>
    )
}