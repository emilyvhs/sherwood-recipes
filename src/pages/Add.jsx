import { useEffect, useState } from "react";
import Header from "../components/Header";
import AddButton from "../atoms/ButtonAdd";
import RemoveButton from "../atoms/ButtonRemove";
import { useNavigate } from "react-router-dom";
import FormName from "../components/FormName";
import Error from "../atoms/Error";

export default function Add() {

    const [name, setName] = useState("");
    const [portions, setPortions] = useState(0);
    const [ingredients, setIngredients] = useState([]);
    const [chefOptions, setChefOptions] = useState([]);      
    const [chefNames, setChefNames] = useState([]);
    const [recipeLocation, setRecipeLocation] = useState("");
    const [lastCooked, setLastCooked] = useState();

    const [error, setError] = useState("");
    const [nameError, setNameError] = useState("");
    const [ingredientsError, setIngredientsError] = useState("");
    const [chefNamesError, setChefNamesError] = useState("");
    const [lastCookedError, setLastCookedError] = useState("");

    let navigate = useNavigate();
  
    function getChefOptions() {
        fetch(`${process.env.HOST}/api/chefs`)
            .then(res => res.json())
            .then(chefs => {
                setChefOptions(chefs.data);
            });
    };

    function addIngredient(e) {

        e.preventDefault();

        setNameError("");
        setIngredientsError("");
        setChefNamesError("");
        setLastCookedError("");
        
        let ingredientValue = document.getElementById('ingredient').value.trim();
        let quantityValue = document.getElementById('quantity').value.trim();
        let error = document.getElementById('ingredient-quantity-error');

        if(!error.classList.contains("hidden")) {
            error.classList.add("hidden");
        };

        if(!ingredientValue || ingredientValue === "") {
            error.classList.remove("hidden");
        } else if (!quantityValue || quantityValue === "") {
            setIngredients([                
                { ingredient: ingredientValue, quantity: "n/a" },
                ...ingredients
            ]);
            
            document.getElementById('ingredient').value = "";
        } else {
            setIngredients([                
                { ingredient: ingredientValue, quantity: quantityValue },
                ...ingredients
            ]);            

            document.getElementById('ingredient').value = "";
            document.getElementById('quantity').value = "";
        };

    };    

    function removeIngredient(e) {
        e.preventDefault();

        ingredients.map(ingredient => {
            setIngredients(ingredients.filter(a => 
                a.ingredient !== e.target.value
            ));
        });
    };

    function addChefName(e) {
        
        if(e.target.checked) {
             setChefNames([...chefNames, e.target.value]);            
        } else {
            chefNames.map(() => { 
                setChefNames(chefNames.filter(a =>
                    a !== e.target.value
                ));
            });
        };

    };

    function addRecipe(e) {

        e.preventDefault();

        setNameError("");
        setIngredientsError("");
        setChefNamesError("");
        setLastCookedError("");

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
                if (data.errors && data.success === false) {    
                    setNameError(data.errors.name.message ? data.errors.name.message : "");
                    setIngredientsError(data.errors.ingredients.message ? data.errors.ingredients.message : "");
                    setChefNamesError(data.errors.chefNames.message ? data.errors.chefNames.message : "");
                    setLastCookedError(data.errors.lastCooked.message ? data.errors.lastCooked.message : "");
                } else if (data.success === false) {
                    setError(data.message ? data.message : "");
                } else {
                    navigate("/recipes");
                };         
            });
    };

    useEffect(getChefOptions, []);

    return (
        <div>
            <Header></Header>

            <form className="flex flex-col" onSubmit={addRecipe}>

                <FormName label="Name of recipe" value={name} onChange={(e) => {setName(e.target.value)}} />

                <Error id="name-error-message" text={nameError} />

                <label htmlFor="portions">Portions</label>
                <input onChange={(e) => {setPortions(e.target.value)}} 
                type="number" name="portions" id="portions" className="bg-white rounded-md border-1 border-rose-100 pl-2 py-1 shadow-sm shadow-olive-300 focus:outline focus:outline-rose-300 mb-4" />

                <div className="grid grid-cols-[40%_40%_20%] gap-2 mt-4 mb-2">
                    <div className="flex items-center">
                        <div className="flex flex-col">
                            <label htmlFor="ingredient">Ingredient</label> 
                            <input type="text" name="ingredient" id="ingredient" placeholder="e.g. Tomatoes" className="bg-white rounded-md border-1 border-rose-100 pl-2 py-1 shadow-sm shadow-olive-300 focus:outline focus:outline-rose-300 field-sizing-fixed w-[100%]" />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="flex flex-col">
                            <label htmlFor="quantity">Quantity</label>
                            <input type="text" name="quantity" id="quantity" placeholder="e.g. 200g" className=" bg-white rounded-md border-1 border-rose-100 pl-2 py-1 shadow-sm shadow-olive-300 focus:outline focus:outline-rose-300 field-sizing-fixed w-[100%]" />
                        </div>
                    </div>
                    <div className="flex items-end">
                        <AddButton label="Add ingredient" onClick={addIngredient} />
                    </div>
                </div>
                <p className="text-right text-rose-800 text-sm hidden mt-2" id="ingredient-quantity-error">Please input an ingredient to add it to the recipe!</p>

                {ingredients.map(ingredient => {
                    return (
                        <div className="grid grid-cols-[40%_40%_20%] gap-2" key={ingredient.ingredient} >
                            <input value={ingredient.ingredient} disabled type="text" readOnly 
                            className="bg-olive-200 border-1 border-olive-300 rounded-md pl-2 py-1 mb-1" />
                            <input value={ingredient.quantity} disabled type="text" readOnly 
                            className="bg-olive-200 border-1 border-olive-300 rounded-md pl-2 py-1 mb-1" />
                            <RemoveButton label="Remove ingredient" onClick={removeIngredient} value={ingredient.ingredient} />        
                        </div>
                    )
                })}
                <p className="text-rose-800 text-sm mb-2">{ingredientsError}</p>

                <p>Who can cook this recipe?</p>            
                {chefOptions.map(chef => {
                    return (
                        <div className="flex items-center" key={chef._id}>
                            <input onChange={addChefName} type="checkbox" name={chef._id} className="appearance-none w-4 h-4 bg-white rounded-sm border-1 border-rose-100 pl-2 py-1 shadow-sm shadow-olive-300 focus:outline focus:outline-rose-300 checked:bg-rose-300 mr-1" value={chef.name} />
                            <label htmlFor={chef._id}>
                                {chef.name}
                            </label>
                        </div>
                    )
                })} 
                <p className="text-rose-800 text-sm mb-2">{chefNamesError}</p>             

                <label htmlFor="recipeLocation" className="mt-4">Where can this recipe be found?</label>
                <input onChange={(e) => {setRecipeLocation(e.target.value)}}
                type="text" name="recipeLocation" id="recipeLocation" placeholder="e.g. a website / a cookbook" className="bg-white rounded-md border-1 border-rose-100 pl-2 py-1 shadow-sm shadow-olive-300 focus:outline focus:outline-rose-300 mb-4" />

                <label htmlFor="lastCooked">When did you last cook this recipe?</label>
                <input onChange={(e) => {setLastCooked(e.target.value)}} 
                type="date" name="lastCooked" id="lastCooked" className="bg-white rounded-md border-1 border-rose-100 pl-2 py-1 shadow-sm shadow-olive-300 focus:outline focus:outline-rose-300 mb-4" />
                <p className="text-rose-800 text-sm mb-2">{lastCookedError}</p>

                <input type="submit" value="Add new recipe" className="text-rose-500 font-semibold hover:text-rose-700 bg-rose-200 hover:bg-rose-300 px-2 mx-2 mt-4 rounded-full pb-1 cursor-pointer" />
                <p className="text-rose-800 text-sm mb-2">{error}</p>

            </form>
        </div>
    );
};