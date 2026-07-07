import { useParams } from "react-router-dom";
import H2 from "../atoms/H2";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import H3 from "../atoms/H3";

export default function SingleRecipe() {
    
    const {_id} = useParams();
    const [recipe, setRecipe] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [chefNames, setChefNames] = useState([]);
    const [lastCooked, setLastCooked] = useState("");

    function getRecipe() {
        fetch(`${process.env.HOST}/api/recipes/${_id}`)
            .then(res => res.json())
            .then(recipe => {
                setRecipe(recipe.data);
                setIngredients(recipe.data.ingredients);
                setChefNames(recipe.data.chefNames);
                setLastCooked(recipe.data.lastCooked);

            });
    };

    useEffect(getRecipe, []);

    return (
        <div>
            <Header></Header>
        
            <div className="text-center">
                <H2 text={`${recipe.name}`}></H2>
            </div>      

            <div className="text-center">
                <H3 text={`Serves ${recipe.portions}`}></H3>
            </div>      

            
            
            

            <H3 text='Ingredients'></H3>

            {ingredients.map(ingredient => {
                return (
                    <div className="grid grid-cols-2" key={ingredient.ingredient}>
                        <p>{ingredient.ingredient}</p>
                        <p>{ingredient.quantity}</p>
                    </div>
                )
            })}

            <div className="flex gap-1">
                <H3 text='Last cooked:'></H3>
                <p>{lastCooked.split('T')[0]}</p>
            </div>

            <div className="flex gap-1">
                <H3 text='Can be cooked by:'></H3>

                {chefNames.map(name => {
                    if (name !== chefNames[chefNames.length - 1]) {
                        return (
                            <p key={name}>{name}, </p>
                        )
                    } else {
                        return (
                            <p key={name}>{name}</p>
                        )
                    }                    
                })}
            </div>
            

            <H3 text='Recipe location'></H3>
            <p>{recipe.recipeLocation}</p>
   
           
        </div>
    );
};