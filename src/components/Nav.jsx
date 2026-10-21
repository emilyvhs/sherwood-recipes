import { Link, useLocation, useNavigate } from "react-router-dom"

export default function Nav() {

    const { pathname } = useLocation();
    let navigate = useNavigate();

    let loggedIn = false;

    if (localStorage.getItem("id") !== "" && localStorage.getItem("id") !== null && localStorage.getItem("id") !== undefined) {
        loggedIn = true;
    };

    function logoutUser() {
        localStorage.clear();
        loggedIn = false;
        navigate("/");
    };

    if (pathname === "/login") {

        return (
            <nav className="mt-1 mb-8 text-rose-500 font-semibold flex justify-center">
                <Link to="/" className="hover:text-rose-700 bg-rose-200 hover:bg-rose-300 px-2 mx-2 rounded-full">Home</Link>
            </nav>
        );

    } else if (loggedIn) {

        return (
            <nav className="mt-1 mb-8 text-rose-500 font-semibold flex justify-center">
                <Link to="/" className="hover:text-rose-700 bg-rose-200 hover:bg-rose-300 px-2 mx-2 rounded-full">Home</Link>
                <Link to="/recipes" className="hover:text-rose-700 bg-rose-200 hover:bg-rose-300 px-2 mx-2 rounded-full">Recipes</Link>
                <form onSubmit={logoutUser}>
                    <input type="submit" value="Log out" className="hover:text-rose-700 bg-rose-200 hover:bg-rose-300 px-2 mx-2 rounded-full cursor-pointer"
                    />
                </form>
            </nav>
        );

    } else {

        return (
             <nav className="mt-1 mb-8 text-rose-500 font-semibold flex justify-center">
                <Link to="/" className="hover:text-rose-700 bg-rose-200 hover:bg-rose-300 px-2 mx-2 rounded-full">Home</Link>
                <Link to="/login" className="hover:text-rose-700 bg-rose-200 hover:bg-rose-300 px-2 mx-2 rounded-full">Log in</Link>
            </nav>
        );
    };   
};