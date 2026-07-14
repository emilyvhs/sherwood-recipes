import { Link, useParams } from "react-router-dom";
import H2 from "../atoms/H2";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import H3 from "../atoms/H3";

export default function SingleRecipe() {
    
    const {_id} = useParams();
    const [recipe, setRecipe] = useState("");
    const [name, setName] = useState("");
    const [portions, setPortions] = useState(0);
    const [ingredients, setIngredients] = useState([]);
    const [chefNames, setChefNames] = useState([]);
    const [recipeLocation, setRecipeLocation] = useState("Unknown");
    const [lastCooked, setLastCooked] = useState();

    const [error, setError] = useState("");

    function getRecipe() {

        fetch(`${process.env.HOST}/api/recipes/${_id}`)
            .then(res => res.json())
            .then(recipe => {
                setRecipe(recipe.data);
                setName(recipe.data.name);
                setPortions(recipe.data.portions);
                setIngredients(recipe.data.ingredients);
                setChefNames(recipe.data.chefNames);
                setRecipeLocation(recipe.data.recipeLocation)
                setLastCooked(recipe.data.lastCooked.split('T')[0]);
            });

    };

    function showEditor(e) {

        let formsGroup = document.querySelectorAll(".forms-group");
        let blocksGroup = document.querySelectorAll(".blocks-group");

        formsGroup.forEach(form => {
            if (!form.classList.contains("hidden")) {
                form.classList.add("hidden");
            }
        });

        blocksGroup.forEach(block => {
            if (block.classList.contains("hidden")) {
                block.classList.remove("hidden");
            }
        });

        let form = document.getElementById(`${e.target.value}-form`);
        let block = document.getElementById(`${e.target.value}-block`);

        form.classList.toggle("hidden");
        block.classList.toggle("hidden");
        
    };  

    function editRecipe(e) {

        e.preventDefault();
        let field = e.target.value;

        let form = document.getElementById(`${field}-form`);
        let block = document.getElementById(`${field}-block`);
        let errorMessage = document.getElementById(`${field}-error-message`);

        const data = {
            "name": name,
            "portions": portions,
            "ingredients": ingredients,
            "recipeLocation": recipeLocation,
            "chefNames": chefNames,
            "lastCooked": lastCooked
        };

        const requestOptions = {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        };
        
        fetch(`${process.env.HOST}/api/recipes/update/${_id}`, requestOptions)
            .then(res => res.json())
            .then(data => {
                if (data.errors) {
                    errorMessage.classList.remove("hidden");              
                    setError(data.errors[field].message);
                } else {
                    if (!errorMessage.classList.contains("hidden")) {
                        errorMessage.classList.add("hidden");
                    };                       
                    form.classList.toggle("hidden");
                    block.classList.toggle("hidden");
                };               
            });
    };    

    useEffect(getRecipe, []);

    return (
        <div>
            <Header></Header>
        
            <div>
                <div className="flex justify-center gap-2 blocks-group" id="name-block">
                    <H2 text={name}></H2>
                    <button aria-label="Edit name" className="cursor-pointer" onClick={showEditor} value="name">✎</button>
                </div>
                <form className="flex justify-center gap-2 hidden forms-group" id="name-form">                   
                    <label htmlFor="name" className="hidden">Name of recipe</label>
                    <input onChange={(e) => setName(e.target.value)} 
                    type="text" name="name" id="name" placeholder={name} className="bg-white rounded-md border-1 border-rose-100 pl-2 py-1 shadow-sm shadow-olive-300 focus:outline focus:outline-rose-300" />
                    <button onClick={editRecipe} value="name" className="underline underline-offset-2 hover:decoration-wavy text-rose-700 hover:text-rose-500 cursor-pointer">Update</button>
                    <button onClick={getRecipe} className="underline underline-offset-2 hover:decoration-wavy text-rose-700 hover:text-rose-500 cursor-pointer">Cancel</button>
                </form>
                <p id="name-error-message" className="text-right text-rose-800 text-sm mb-2 hidden">{error}</p>                  
            </div>

            <div className="mb-4">                
                <div className="flex justify-center gap-2 blocks-group" id="portions-block">
                    <H3 text={`Serves ${portions}`}></H3>
                    <button aria-label="Edit portions" className="cursor-pointer" onClick={showEditor} value="portions">✎</button>
                </div>
                <form className="flex justify-center hidden gap-2 forms-group" id="portions-form">                    
                    <div className="inline-block self-center"><H3 text="Serves "></H3></div>
                    <label htmlFor="portions" className="hidden">Number of portions</label>
                    <input onChange={(e) => setPortions(e.target.value)} 
                    type="number" name="portions" id="portions" placeholder={portions} className="bg-white rounded-md border-1 border-rose-100 pl-2 py-1 shadow-sm shadow-olive-300 focus:outline focus:outline-rose-300" />
                    <button onClick={editRecipe} value="portions" className="underline underline-offset-2 hover:decoration-wavy text-rose-700 hover:text-rose-500 cursor-pointer">Update</button>
                    <button onClick={getRecipe} className="underline underline-offset-2 hover:decoration-wavy text-rose-700 hover:text-rose-500 cursor-pointer">Cancel</button>
                </form>  
                <p id="portions-error-message" className="text-right text-rose-800 text-sm mb-2 hidden">{error}</p>                 
            </div>
              
            <div className="mb-4">
                <div className="blocks-group" id="ingredients-block">
                    <div className="flex gap-2">
                        <H3 text="Ingredients"></H3>
                        <button aria-label="Edit ingredients" className="cursor-pointer" onClick={showEditor} value="ingredients">✎</button>
                    </div>
                    {ingredients.map(ingredient => {
                        return (
                            <div className="grid grid-cols-2" key={ingredient.ingredient}>
                                <p>{ingredient.ingredient}</p>
                                <p>{ingredient.quantity}</p>
                            </div>
                        )
                    })}
                </div>

                <form className="forms-group" id="ingredients-form">

                </form>
                <p id="ingredients-error-message" className="text-right text-rose-800 text-sm mb-2 hidden">{error}</p>
            </div>

            <div className="mb-4">
                <div className="flex gap-1 blocks-group" id="lastCooked-block">
                    <H3 text="Last cooked:"></H3>
                    <p>{lastCooked}</p>
                    <button aria-label="Edit last cooked date" className="cursor-pointer pl-1" onClick={showEditor} value="lastCooked">✎</button>
                </div>
                <form className="flex gap-2 forms-group hidden" id="lastCooked-form">
                    <div className="inline-block self-center"><H3 text="Last cooked: "></H3></div>
                    <label htmlFor="lastCooked" className="hidden">Last cooked</label>
                    <input onChange={(e) => setLastCooked(e.target.value)}
                    type="date" name="lastCooked" id="lastCooked" placeholder={lastCooked} className="bg-white rounded-md border-1 border-rose-100 pl-2 py-1 shadow-sm shadow-olive-300 focus:outline focus:outline-rose-300" />
                    <button onClick={editRecipe} value="lastCooked" className="underline underline-offset-2 hover:decoration-wavy text-rose-700 hover:text-rose-500 cursor-pointer">Update</button>
                    <button onClick={getRecipe} className="underline underline-offset-2 hover:decoration-wavy text-rose-700 hover:text-rose-500 cursor-pointer">Cancel</button> 
                </form>
                <p id="lastCooked-error-message" className="text-right text-rose-800 text-sm mb-2 hidden">{error}</p>
                
            </div>

            <div className="mb-4">
                <div className="flex gap-1 blocks-group" id="chefNames-block">
                   <H3 text="Can be cooked by:"></H3>
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
                    <button aria-label="Edit who can cook this recipe" className="cursor-pointer pl-1" onClick={showEditor} value="chefNames">✎</button>
                </div>
                

                
                <p id="chefNames-error-message" className="text-right text-rose-800 text-sm mb-2 hidden">{error}</p>
            </div>            

            <div className="mb-4">
                <div className="flex gap-1 blocks-group" id="recipeLocation-block">
                    <H3 text="Recipe location:"></H3>
                    <p>{recipeLocation}</p>
                    <button aria-label="Edit recipe location" className="cursor-pointer pl-1" onClick={showEditor} value="recipeLocation">✎</button>
                </div>
                <form className="flex gap-2 forms-group hidden" id="recipeLocation-form">
                    <div className="inline-block self-center"><H3 text="Recipe location: "></H3></div>
                    <label htmlFor="recipeLocation" className="hidden">Recipe location</label>
                    <input onChange={(e) => setRecipeLocation(e.target.value)}
                    type="text" name="recipeLocation" id="recipeLocation" placeholder={recipeLocation} className="bg-white rounded-md border-1 border-rose-100 pl-2 py-1 shadow-sm shadow-olive-300 focus:outline focus:outline-rose-300" /> 
                    <button onClick={editRecipe} value="recipeLocation" className="underline underline-offset-2 hover:decoration-wavy text-rose-700 hover:text-rose-500 cursor-pointer">Update</button>
                    <button onClick={getRecipe} className="underline underline-offset-2 hover:decoration-wavy text-rose-700 hover:text-rose-500 cursor-pointer">Cancel</button>
                </form>     
                <p id="recipeLocation-error-message" className="text-right text-rose-800 text-sm mb-2 hidden">{error}</p>          
            </div>

            <Link to={`/delete/${_id}`} className="underline underline-offset-2 hover:decoration-wavy text-rose-700 hover:text-rose-500 cursor-pointer">Delete this recipe</Link> 
           
        </div>
    );
};