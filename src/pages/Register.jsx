import { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import Error from "../atoms/Error";

export default function Register() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [userError, setUserError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    let navigate = useNavigate();

    function addUser(e) {

        e.preventDefault();

        setError("");
        setUserError("");
        setUsernameError("");
        setEmailError("");
        setPasswordError("");

        const data = {
            "username": username,
            "email": email,
            "password": password 
        };

        const requestOptions = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        };

        fetch(`${process.env.HOST}/api/users/register`, requestOptions)
            .then(res => res.json())
            .then(data => {

                if (data.userExistsError === true) {
                    setUserError(data.message);

                } else if (data.passwordLengthError === true) {
                    setPasswordError(data.message);
                
                } else if (data.errors) {
                    setUsernameError(data.errors.username.message ? data.errors.username.message : "");
                    setEmailError(data.errors.email.message ? data.errors.email.message : "");
                    setPasswordError(data.errors.password.message ? data.errors.password.message : "");

                } else if (data.success === false) {
                setError(data.message ? data.message : "Unknown error occured! Please contact admin or try again later");
                    
                } else {
                    console.log(data);
                    navigate("/recipes");
                };
            });
    };

    return (
        <div className="md:flex md:flex-col md:items-center">
            <Header></Header>

            <form method="POST" onSubmit={addUser} className="flex flex-col md:w-1/3">

                <label htmlFor="username">
                    Username
                </label>
                <input 
                    type="text" name="username" id="username"
                    placeholder="e.g. Emily"
                    onChange={(e) => {setUsername(e.target.value)}}
                    className="bg-white 
                    rounded-md border-1 border-rose-100 
                    pl-2 py-1 mb-2
                    shadow-sm shadow-olive-300 
                    focus:outline focus:outline-rose-300"
                />
                <Error text={usernameError} />

                <label htmlFor="email">
                    Email address
                </label>
                <input 
                    type="email" name="email" id="email"
                    placeholder="e.g. chef@cooking.com"
                    onChange={(e) => {setEmail(e.target.value)}}
                    className="bg-white 
                    rounded-md border-1 border-rose-100 
                    pl-2 py-1 mb-2
                    shadow-sm shadow-olive-300 
                    focus:outline focus:outline-rose-300"
                />
                <Error text={emailError} />

                <label htmlFor="password">
                    Password
                </label>
                <p className="text-xs">Must be over 8 characters</p>
                <input 
                    type="password" name="password" id="password"
                    onChange={(e) => {setPassword(e.target.value)}}
                    className="bg-white 
                    rounded-md border-1 border-rose-100 
                    pl-2 py-1 mb-2
                    shadow-sm shadow-olive-300 
                    focus:outline focus:outline-rose-300"
                />
                <Error text={passwordError} />

                <input 
                    type="submit" value="Register" 
                    className="text-rose-500 font-semibold hover:text-rose-700 bg-rose-200 hover:bg-rose-300 px-2 mx-2 mt-4 rounded-full pb-1 cursor-pointer md:flex"
                />
                <Error text={userError} />
                <Error text={error} />

            </form>
        </div>
    )
}