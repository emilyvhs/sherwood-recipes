import H2 from "../atoms/H2";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";

export default function Recipes() {

    const [recipesData, setRecipesData] = useState([]);
    const [recipes, setRecipes] = useState([]);

    function getRecipes() {
        fetch(`${process.env.HOST}/api/recipes`)
            .then(res => res.json())
            .then(recipes => {   
                setRecipesData(recipes.data);
            });
    };

    function sortRecipesByLastCooked() {
        const sorted = [...recipesData].sort((a, b) => {
            return b.lastCooked.localeCompare(a.lastCooked)
        });
        setRecipes(sorted);
    };

    function sortRecipesByName() {
        const sorted = [...recipesData].sort((a, b) => {
            return a.name.localeCompare(b.name)
        });
        setRecipes(sorted);
    };

    useEffect(getRecipes, []);
    useEffect(sortRecipesByLastCooked, [recipesData]);

    return (
        <div>
            <Header></Header>

            <section className="flex mb-6">
                <H2 text="Add new recipe"></H2>
                <Link to="/add" className="inline-flex items-center text-rose-500 font-semibold hover:text-rose-700 bg-rose-200 hover:bg-rose-300 px-2 mx-2 rounded-full pb-1">+</Link>
            </section>

            <section className="p-4 border-y-3 border-dashed border-emerald-300">  

                <div className="grid grid-cols-2">
                    <div>
                        <button onClick={sortRecipesByName}>
                            <H2 text="Recipe"></H2>
                        </button>                        
                        {recipes.map(recipe => {
                            return (
                                <Link key={recipe._id} to={`/recipes/${recipe._id}`} className="underline underline-offset-2 hover:decoration-wavy text-rose-700 hover:text-rose-500"><p>{recipe.name}</p></Link>
                            )
                        })}
                    </div>
                    <div>
                        <button onClick={sortRecipesByLastCooked}>
                            <H2 text="Last cooked" ></H2>
                        </button>
                        {recipes.map(recipe => {
                            return (
                                <p key={recipe._id}>{recipe.lastCooked.split('T')[0]}</p>
                            )
                        })}                       
                    </div>
                </div>
                
            </section>
        </div>
    );
};