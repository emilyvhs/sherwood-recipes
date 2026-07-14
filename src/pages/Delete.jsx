import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import Header from "../components/Header";

export default function Delete() {

    const {_id} = useParams();
    
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    let navigate = useNavigate();

    function getRecipeName() {
        fetch(`${process.env.HOST}/api/recipes/${_id}`)
            .then(res => res.json())
            .then(recipe => {
                setName(recipe.data.name);
            });
    };

    function deleteRecipe() {

        let errorMessage = document.getElementById("error-message");        

        const requestOptions = {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        fetch(`${process.env.HOST}/api/recipes/delete/${_id}`, requestOptions)
            .then(res => res.json())
            .then(data => {
                if(data.success === false) {
                    setError(data.message);    
                    errorMessage.classList.remove("hidden");          
                } else {
                    navigate("/recipes");
                };
            });
    };

    useEffect(getRecipeName, []);

    return (

        <div>

            <Header></Header>

            <p>Are you sure you want to delete <strong>{name}</strong>? Deletion is permanent and cannot be reversed.</p>

            <div className="flex flex-col">
                <button onClick={deleteRecipe} className="text-left underline underline-offset-2 hover:decoration-wavy text-rose-700 hover:text-rose-500 cursor-pointer">Confirm</button>
                <Link to={`/recipes/${_id}`} className="underline underline-offset-2 hover:decoration-wavy text-rose-700 hover:text-rose-500 cursor-pointer">Cancel</Link>
            </div>

            <p className="text-rose-800 text-sm mb-2 hidden" id="error-message">{error}</p>

        </div>

    )
};