import { useState } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import Error from "../atoms/Error";

export default function LogIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [userError, setUserError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    let navigate = useNavigate();

    function loginUser(e) {

        e.preventDefault();

        setError("");
        setUserError("");
        setPasswordError("");

        const data = {
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

        fetch(`${process.env.HOST}/api/users/login`, requestOptions)
            .then(res => res.json())
            .then(data => {

                if (data.userExistsError === true) {
                    setUserError(data.message);
                
                } else if (data.passwordMatchError === true) {
                    setPasswordError(data.message);

                } else if (data.success === false) {
                    setError(data.message ? data.message : "Unknown error occured! Please contact admin or try again later");

                } else {
                    console.log(data);
                    localStorage.setItem("id", data.id);
                    navigate("/recipes");                   
                };
            });
    };

    return (
        <div className="md:flex md:flex-col md:items-center">
            <Header></Header>

            <form method="POST" onSubmit={loginUser} className="flex flex-col md:w-1/3">

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

                <label htmlFor="password">
                    Password
                </label>        
                <input 
                    type="password" name="password" id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white 
                    rounded-md border-1 border-rose-100 
                    pl-2 py-1 mb-2
                    shadow-sm shadow-olive-300 
                    focus:outline focus:outline-rose-300"
                />

                <input 
                    type="submit" value="Log in" 
                    className="text-rose-500 font-semibold hover:text-rose-700 bg-rose-200 hover:bg-rose-300 px-2 mx-2 mt-4 rounded-full pb-1 cursor-pointer md:flex"
                />
                <Error text={userError} />
                <Error text={passwordError} />
                <Error text={error} />

            </form>

            <p className="mt-4">
                New user? <Link to="/register" className="font-semibold text-rose-700 hover:text-rose-500">Register here.</Link>
            </p>
        </div>
    )
}