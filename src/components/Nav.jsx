import { Link } from "react-router-dom"

export default function Nav() {
    return (
        <nav className="mt-1 mb-8 text-rose-500 font-semibold flex justify-center">
            <Link to="/" className="hover:text-rose-700 bg-rose-200 hover:bg-rose-300 px-2 mx-2 rounded-full">Home</Link>
            <Link to="/recipes" className="hover:text-rose-700 bg-rose-200 hover:bg-rose-300 px-2 mx-2 rounded-full">Recipes</Link>
        </nav>
    )
}