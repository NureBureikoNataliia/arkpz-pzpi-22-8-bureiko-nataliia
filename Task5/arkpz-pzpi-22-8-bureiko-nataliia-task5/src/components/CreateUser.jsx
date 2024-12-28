import { useState } from "react"
import { createAdmin } from "../api"

export function CreateUser() {

    const [user, setUser] = useState({
        firstName: "",
        surname: "",
        email: "",
        password: "",
    })

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        let response = await createAdmin(user)
        console.log(response)
        if(response.data.message) {
            alert("User account could not be created :<")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder={"First name"} onChange={handleChange} name="firstName" required maxLength={20}/>
            <input placeholder={"Surname"} onChange={handleChange} name="surname" required maxLength={20}/>
            <input placeholder={"Email"} onChange={handleChange} name="email" required maxLength={50}/>
            <input placeholder={"Password"} onChange={handleChange} name="password" type="password" required maxLength={8}/>
            <button type="submit">CreateAccount</button>
        </form>
    ) 
}