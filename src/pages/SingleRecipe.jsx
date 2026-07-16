import { Link, useParams } from "react-router-dom";
import H2 from "../atoms/H2";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import H3 from "../atoms/H3";
import RemoveButton from "../atoms/ButtonRemove";
import AddButton from "../atoms/ButtonAdd";

export default function SingleRecipe() {
    
    const {_id} = useParams();

    const [recipe, setRecipe] = useState("");
    const [name, setName] = useState("");
    const [portions, setPortions] = useState(0);
    const [ingredients, setIngredients] = useState([]);
    const [chefOptions, setChefOptions] = useState([]);   
    const [chefNames, setChefNames] = useState([]);
    const [recipeLocation, setRecipeLocation] = useState("Unknown");
    const [lastCooked, setLastCooked] = useState();

    const [error, setError] = useState("");
    const [checked, setChecked] = useState();

    function getChefOptions() {
        fetch(`${process.env.HOST}/api/chefs`)
            .then(res => res.json())
            .then(chefs => {
                setChefOptions(chefs.data);
            });
    };

    function handleCheck() {
        chefOptions.map(chef => {
            if (chefNames.includes(chef.name)) {
                chef.checked = true
                setChecked([...chefOptions])
            } else {
                chef.checked = false
                setChecked([...chefOptions])
            }
        });
    };

    function getRecipe() {

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

    function addIngredient(e) {
        e.preventDefault();
        
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
            ])

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

        handleCheck();
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
    useEffect(getChefOptions, []);
    useEffect(handleCheck, [chefNames, chefOptions]);

    return (
        <div>
            <Header></Header>
        
            <div>
                <div className="flex justify-center gap-2 blocks-group" id="name-block">
                    <H2 text={name}></H2>
                    <button aria-label="Edit name" className="cursor-pointer" onClick={showEditor} value="name">✎</button>
                </div>
                <form className="flex justify-center gap-2 forms-group" id="name-form">                   
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
                <form className="flex justify-center gap-2 forms-group" id="portions-form">                    
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

                    <div className="mb-1">
                        <H3 text="Ingredients"></H3>
                    </div>

                    <div className="grid grid-cols-[40%_40%_20%] gap-2 mb-2">
                        <div className="flex items-center">
                            <label htmlFor="ingredient" className="hidden">Ingredient</label> 
                            <input type="text" name="ingredient" id="ingredient" placeholder="e.g. Tomatoes" className="bg-white rounded-md border-1 border-rose-100 pl-2 py-1 shadow-sm shadow-olive-300 focus:outline focus:outline-rose-300 field-sizing-fixed w-[100%]" />
                        </div>
                        <div className="flex items-center">
                            <label htmlFor="quantity" className="hidden">Quantity</label>
                            <input type="text" name="quantity" id="quantity" placeholder="e.g. 200g" className=" bg-white rounded-md border-1 border-rose-100 pl-2 py-1 shadow-sm shadow-olive-300 focus:outline focus:outline-rose-300 field-sizing-fixed w-[100%]" />
                        </div>
                        <div className="flex items-center">
                            <AddButton label="Add ingredient" onClick={addIngredient} />
                        </div>
                    </div>

                    <p className="text-right text-rose-800 text-sm hidden mt-2" id="ingredient-quantity-error">Please input an ingredient to add it to the recipe!</p>

                    <div className="flex gap-2 justify-end mb-2">
                        <button onClick={editRecipe} value="ingredients" className="underline underline-offset-2 hover:decoration-wavy text-rose-700 hover:text-rose-500 cursor-pointer">Update</button>
                        <button onClick={getRecipe} className="underline underline-offset-2 hover:decoration-wavy text-rose-700 hover:text-rose-500 cursor-pointer">Cancel</button> 
                    </div>

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

                </form>                
                <p id="ingredients-error-message" className="text-right text-rose-800 text-sm mb-2 hidden">{error}</p>
            </div>

            <div className="mb-4">
                <div className="flex gap-1 blocks-group" id="lastCooked-block">
                    <H3 text="Last cooked:"></H3>
                    <p>{lastCooked}</p>
                    <button aria-label="Edit last cooked date" className="cursor-pointer pl-1" onClick={showEditor} value="lastCooked">✎</button>
                </div>
                <form className="flex gap-2 forms-group" id="lastCooked-form">
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
                
                <form className="forms-group" id="chefNames-form">
                    <H3 text="Can be cooked by:"></H3>
                    
                    {checked?.map(chef => {
                        
                        return (
                            <div className="flex items-center" key={chef._id}>
                                <input onChange={addChefName} type="checkbox" name={chef._id} className="appearance-none w-4 h-4 bg-white rounded-sm border-1 border-rose-100 pl-2 py-1 shadow-sm shadow-olive-300 focus:outline focus:outline-rose-300 checked:bg-rose-300 mr-1" value={chef.name} defaultChecked={chef.checked} />
                                <label htmlFor={chef._id}>
                                    {chef.name}
                                </label>
                            </div>
                        )
                       
                    })}
                    <div className="flex gap-2 justify-end">
                        <button onClick={editRecipe} value="chefNames" className="underline underline-offset-2 hover:decoration-wavy text-rose-700 hover:text-rose-500 cursor-pointer">Update</button>
                        <button onClick={getRecipe} className="underline underline-offset-2 hover:decoration-wavy text-rose-700 hover:text-rose-500 cursor-pointer">Cancel</button> 
                    </div>
                </form>
                
                <p id="chefNames-error-message" className="text-right text-rose-800 text-sm mb-2 hidden">{error}</p>
            </div>            

            <div className="mb-4">
                <div className="flex gap-1 blocks-group" id="recipeLocation-block">
                    <H3 text="Recipe location:"></H3>
                    <p>{recipeLocation}</p>
                    <button aria-label="Edit recipe location" className="cursor-pointer pl-1" onClick={showEditor} value="recipeLocation">✎</button>
                </div>
                <form className="flex gap-2 forms-group" id="recipeLocation-form">
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