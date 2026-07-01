import H2 from "../atoms/H2";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";

export default function Recipes() {

    const [recipes, setRecipes] = useState([]);

    function getRecipes() {
        fetch(`${process.env.HOST}/api/recipes`)
            .then(res => res.json())
            .then(recipes => {
                setRecipes(recipes.data);                
            });
    };

    useEffect(getRecipes, []);

    console.log(recipes);

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
                        <H2 text="Recipe"></H2>
                        {recipes.map(recipe => {
                            return (
                                <Link key={recipe._id} to={`/recipes/${recipe._id}`}><p>{recipe.name}</p></Link>
                            )
                        })}
                    </div>
                    <div>
                        <H2 text="Last cooked"></H2>
                        {recipes.map(recipe => {
                            return (
                                <p>{recipe.lastCooked.split('T')[0]}</p>
                            )
                        })}                       
                    </div>
                </div>
                
            </section>
        </div>
    );
};