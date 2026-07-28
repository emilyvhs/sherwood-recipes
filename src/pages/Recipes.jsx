import H2 from "../atoms/H2";
import { Link } from "react-router-dom";
import AddButton from "../atoms/ButtonAdd";
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

        let arrowLastCooked = document.getElementById('last-cooked-arrow');      
        let arrowName = document.getElementById('name-arrow');

        if (arrowName.classList.contains('rotate-90')) {
            arrowName.classList.remove('rotate-90');
            arrowLastCooked.classList.add('rotate-90');
        };

        const sorted = [...recipesData].sort((a, b) => {
            return b.lastCooked.localeCompare(a.lastCooked)
        });        
        setRecipes(sorted);
    };

    function sortRecipesByName() {

        let arrowLastCooked = document.getElementById('last-cooked-arrow');      
        let arrowName = document.getElementById('name-arrow');

        if (arrowLastCooked.classList.contains('rotate-90')) {
            arrowLastCooked.classList.remove('rotate-90');
            arrowName.classList.add('rotate-90');
        };
        
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

            <section className="flex items-center gap-2 mb-6">
                <H2 text="Add new recipe"></H2>
                <AddButton link={true} linkTo="/add" label="Add new recipe" />
            </section>

            <section className="p-4 border-y-3 border-dashed border-emerald-300">  

                <div className="flex justify-between">             
                    <button onClick={sortRecipesByName} className="cursor-pointer flex items-center gap-2">
                        <H2 text="Recipe"></H2>
                        <div className="text-emerald-700 text-xl font-bold transition-transform duration-150 " id="name-arrow">▶</div>                           
                    </button>     
                    <button onClick={sortRecipesByLastCooked} className="cursor-pointer flex items-center gap-2">
                        <H2 text="Last cooked" ></H2>
                        <div className="text-emerald-700 text-xl font-bold transition-transform duration-150 rotate-90" id="last-cooked-arrow">▶</div>
                    </button>
                </div>
                                        
                {recipes.map(recipe => {
                    return (
                        <div key={recipe._id} className="flex justify-between">
                            <Link  to={`/recipes/${recipe._id}`} className="w-[50%] underline underline-offset-2 hover:decoration-wavy text-rose-700 hover:text-rose-500"><p>{recipe.name}</p></Link>
                            <p>{recipe.lastCooked.split('T')[0]}</p>
                        </div>
                    );
                })};
                
            </section>
        </div>
    );
};