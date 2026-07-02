import { useEffect, useState } from "react";
import Header from "../components/Header";



export default function Add() {

    const [name, setName] = useState("");
    const [portions, setPortions] = useState(0);
    const [ingredients, setIngredients] = useState([]);
    const [person, setPerson] = useState("");
    const [chefOptions, setChefOptions] = useState([]);      
    const [chefNames, setChefNames] = useState([]);
    const [recipeLocation, setRecipeLocation] = useState("");
    const [lastCooked, setLastCooked] = useState();

    function getChefOptions() {
        fetch(`${process.env.HOST}/api/chefs`)
            .then(res => res.json())
            .then(chefs => {
                setChefOptions(chefs.data);
            });
    };

    function addIngredient(e) {
        e.preventDefault();
        
        let ingredientValue = document.getElementById('ingredient').value.trim();
        let quantityValue = document.getElementById('quantity').value.trim();
        let error = document.getElementById('ingredient-quantity-error');

        if(!error.classList.contains("hidden")) {
            error.classList.add("hidden");
        };

        if(!ingredientValue || !quantityValue || ingredientValue === "" || quantityValue === "") {
            error.classList.remove("hidden");
        } else {
            setIngredients([
                ...ingredients,
                { ingredient: ingredientValue, quantity: quantityValue }
            ]);            

            document.getElementById('ingredient').value = "";
            document.getElementById('quantity').value = "";
        };
    };    

    function addChefName(e) {
        
        if(e.target.checked) {
             setChefNames([...chefNames, e.target.value]);            
        } else {
            chefNames.map(name => { 
                setChefNames(chefNames.filter(a =>
                    a !== e.target.value
                ));
            });
        };
    };

    function addRecipe() {

        const data = {
            "name": name,
            "portions": portions,
            "ingredients": ingredients,
            "recipeLocation": recipeLocation,
            "chefNames": chefNames,
            "lastCooked": lastCooked
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

        fetch(`${process.env.HOST}/api/recipes/add`, requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data.message);
            });
    };

    useEffect(getChefOptions, []);

    console.log(chefNames)

    return (
        <div>
            <Header></Header>

            <form className="flex flex-col" onSubmit={addRecipe}>
                <label htmlFor="name">Name of recipe</label>
                <input onChange={(e) => {setName(e.target.value)}} 
                type="text" name="name" id="name" placeholder="e.g. Bean's Beans" required
                className="bg-white rounded-md border-1 border-rose-100 pl-2 py-1 shadow-sm shadow-olive-300 focus:outline focus:outline-rose-300 mb-4" />

                <label htmlFor="portions">Portions</label>
                <input onChange={(e) => {setPortions(e.target.value)}} 
                type="number" name="portions" id="portions"
                className="bg-white rounded-md border-1 border-rose-100 pl-2 py-1 shadow-sm shadow-olive-300 focus:outline focus:outline-rose-300 mb-4" />

                <div className="grid grid-cols-2 gap-4 mb-1">

                    <div className="flex flex-col">
                        <label htmlFor="ingredient">Ingredient</label> 
                        <input type="text" name="ingredient" id="ingredient" placeholder="e.g. Tomatoes"
                        className="bg-white rounded-md border-1 border-rose-100 pl-2 py-1 shadow-sm shadow-olive-300 focus:outline focus:outline-rose-300 mb-1" />
                    </div>                

                    <div className="flex flex-col">
                        <label htmlFor="quantity">Quantity</label>
                        <input type="text" name="quantity" id="quantity" placeholder="e.g. 200g" className="bg-white rounded-md border-1 border-rose-100 pl-2 py-1 shadow-sm shadow-olive-300 focus:outline focus:outline-rose-300 mb-1" />
                    </div>

                </div>

                <div className="flex justify-end mb-4">
                    <p className="text-right">Add ingredient</p>
                    <button onClick={addIngredient} className="inline-flex items-center self-center text-rose-500 font-semibold hover:text-rose-700 bg-rose-200 hover:bg-rose-300 px-2 mx-2 rounded-full pb-1 cursor-pointer h-[28px]">+</button>
                </div>
                <p className="text-right text-rose-800 text-sm hidden mb-2" id="ingredient-quantity-error">Please input both an ingredient and a quantity to add it to the recipe!</p>

                <div className="grid grid-cols-[3fr_3fr_1fr] gap-4 mb-1">
                    <div className="flex flex-col">                        
                        {ingredients.map(ingredient => {
                            return (
                                <p className="bg-olive-200 rounded-md border-1 border-olive-300 pl-2 text-sm py-1 mb-1">{ingredient.ingredient}</p>
                            )
                        })}
                    </div>  
                    <div className="flex flex-col">
                        {ingredients.map(ingredient => {                
                            return (
                                <p className="bg-olive-200 rounded-md border-1 border-olive-300 pl-2 text-sm py-1 mb-1">{ingredient.quantity}</p>
                            )     
                        })}
                    </div>
                    <div className="flex flex-col">
                        {ingredients.map(ingredient => {
                            return (
                                <button onClick={() => {
                                    setIngredients(
                                        ingredients.filter(a => 
                                            a.ingredient !== ingredient.ingredient
                                        )
                                    )
                                }} key={ingredient.ingredient} id={ingredient.ingredient} className="pl-2 text-left py-1 font-bold text-rose-800 text-sm cursor-pointer">Remove</button>
                            )
                        })}
                    </div>
                </div>

                <p className="mb-4">Who can cook this recipe?</p>            
                {chefOptions.map(chef => {
                    return (
                        <div>                            
                            <input onChange={addChefName} type="checkbox" name={chef._id} id={chef._id} className="chefNames" value={chef.name} />
                            <label htmlFor={chef._id} key={chef._id}>{chef.name}
                            </label>
                        </div>
                    )
                })}              

                <label htmlFor="recipeLocation">Where can this recipe be found?</label>
                <input onChange={(e) => {setRecipeLocation(e.target.value)}}
                type="text" name="recipeLocation" id="recipeLocation" placeholder="e.g. a link to a website / the name of a cookbook" required className="bg-white rounded-md border-1 border-rose-100 pl-2 py-1 shadow-sm shadow-olive-300 focus:outline focus:outline-rose-300 mb-4" />

                <label htmlFor="lastCooked">When did you last cook this recipe?</label>
                <input onChange={(e) => {setLastCooked(e.target.value)}} 
                type="date" name="lastCooked" id="lastCooked" required className="bg-white rounded-md border-1 border-rose-100 pl-2 py-1 shadow-sm shadow-olive-300 focus:outline focus:outline-rose-300 mb-4" />

                <input type="submit" value="Add new recipe" className="text-rose-500 font-semibold hover:text-rose-700 bg-rose-200 hover:bg-rose-300 px-2 mx-2 mt-4 rounded-full pb-1 cursor-pointer" />

            </form>
        </div>
    );
};