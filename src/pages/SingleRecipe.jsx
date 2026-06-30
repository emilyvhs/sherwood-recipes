import { useParams } from "react-router-dom";
import H2 from "../atoms/H2";
import Header from "../components/Header";
import { useEffect, useState } from "react";

export default function SingleRecipe() {
    
    const {_id} = useParams();
    const [recipe, setRecipe] = useState("");

    function getRecipe() {
        fetch(`http://localhost:3000/api/recipes/${_id}`)
            .then(res => res.json())
            .then(recipe => {
                setRecipe(recipe.data);
            });
    };

    useEffect(getRecipe, []);

    return (
        <div>
            <Header></Header>

            <section>
                <H2 text={`${recipe.name}`}></H2>
            </section>
        </div>
    );
};