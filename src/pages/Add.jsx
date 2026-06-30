import Header from "../components/Header";

export default function Add() {
    return (
        <div>
            <Header></Header>

            <form className="flex flex-col">
                <label htmlFor="name">Name of recipe</label>
                <input type="text" name="name" id="name" placeholder="e.g. Bean's Beans" required
                className="bg-white rounded-md border-1 border-rose-100 pl-2 py-1 shadow-sm shadow-olive-300 focus:outline focus:outline-rose-300 mb-4" />

                <label htmlFor="portions">Portions</label>
                <input type="number" name="portions" id="portions"
                className="bg-white rounded-md border-1 border-rose-100 pl-2 py-1 shadow-sm shadow-olive-300 focus:outline focus:outline-rose-300 mb-4" />

                <div className="grid grid-cols-2 gap-4 mb-1">

                    <div className="flex flex-col">
                        <label htmlFor="ingredients[]">Ingredients</label>
                        <input type="text" name="ingredients[]" placeholder="e.g. Tin of chopped tomatoes" required
                        className="bg-white rounded-md border-1 border-rose-100 pl-2 py-1 shadow-sm shadow-olive-300 focus:outline focus:outline-rose-300 mb-1" />
                        <input type="text" name="ingredients[]" placeholder="e.g. Onion"
                        className="bg-white rounded-md border-1 border-rose-100 pl-2 py-1 shadow-sm shadow-olive-300 focus:outline focus:outline-rose-300 mb-1" />
                        <input type="text" name="ingredients[]" placeholder="e.g. Garlic"
                        className="bg-white rounded-md border-1 border-rose-100 pl-2 py-1 shadow-sm shadow-olive-300 focus:outline focus:outline-rose-300 mb-1" />
                        <input type="text" name="ingredients[]" placeholder="e.g. Paprika"
                        className="bg-white rounded-md border-1 border-rose-100 pl-2 py-1 shadow-sm shadow-olive-300 focus:outline focus:outline-rose-300 mb-1" />
                        <input type="text" name="ingredients[]" placeholder="e.g. Chilli flakes"
                        className="bg-white rounded-md border-1 border-rose-100 pl-2 py-1 shadow-sm shadow-olive-300 focus:outline focus:outline-rose-300 mb-1" />
                    </div>                

                    <div className="flex flex-col">
                        <label htmlFor="quantities[]">Quantities</label>
                        <input type="text" name="quantities[]" placeholder="e.g. x1" className="bg-white rounded-md border-1 border-rose-100 pl-2 py-1 shadow-sm shadow-olive-300 focus:outline focus:outline-rose-300 mb-1" />
                        <input type="text" name="quantities[]" placeholder="e.g. 200g" className="bg-white rounded-md border-1 border-rose-100 pl-2 py-1 shadow-sm shadow-olive-300 focus:outline focus:outline-rose-300 mb-1" />
                        <input type="text" name="quantities[]" placeholder="e.g. 1 teaspoon" className="bg-white rounded-md border-1 border-rose-100 pl-2 py-1 shadow-sm shadow-olive-300 focus:outline focus:outline-rose-300 mb-1" />
                        <input type="text" name="quantities[]" placeholder="e.g. 3 tablespoons" className="bg-white rounded-md border-1 border-rose-100 pl-2 py-1 shadow-sm shadow-olive-300 focus:outline focus:outline-rose-300 mb-1" />
                        <input type="text" name="quantities[]" placeholder="e.g. 1 pinch" className="bg-white rounded-md border-1 border-rose-100 pl-2 py-1 shadow-sm shadow-olive-300 focus:outline focus:outline-rose-300 mb-1" />
                    </div>

                </div>

                <div className="flex justify-end mb-4">
                    <p className="text-right">Add another ingredient</p>
                    <button className="inline-flex items-center self-center text-rose-500 font-semibold hover:text-rose-700 bg-rose-200 hover:bg-rose-300 px-2 mx-2 rounded-full pb-1 cursor-pointer h-[28px]">+</button>
                </div>

                <label htmlFor="chefNames[]">Who can cook this recipe?</label>
                <input type="text" name="chefNames[]" placeholder="e.g. Emily" required className="bg-white rounded-md border-1 border-rose-100 pl-2 py-1 shadow-sm shadow-olive-300 focus:outline focus:outline-rose-300 mb-1" />

                <div className="flex justify-end mb-4">
                    <p className="text-right">Add another person who can cook this recipe</p>
                    <button className="inline-flex items-center self-center text-rose-500 font-semibold hover:text-rose-700 bg-rose-200 hover:bg-rose-300 px-2 mx-2 rounded-full pb-1 cursor-pointer h-[28px]">+</button>
                </div>

                <label htmlFor="recipeLocation">Where can this recipe be found?</label>
                <input type="text" name="recipeLocation" id="recipeLocation" placeholder="e.g. a link to a website / the name of a cookbook" required className="bg-white rounded-md border-1 border-rose-100 pl-2 py-1 shadow-sm shadow-olive-300 focus:outline focus:outline-rose-300 mb-4" />

                <label htmlFor="lastCooked">When did you last cook this recipe?</label>
                <input type="date" name="lastCooked" id="lastCooked" required className="bg-white rounded-md border-1 border-rose-100 pl-2 py-1 shadow-sm shadow-olive-300 focus:outline focus:outline-rose-300 mb-4" />

                <input type="submit" value="Add new recipe" className="text-rose-500 font-semibold hover:text-rose-700 bg-rose-200 hover:bg-rose-300 px-2 mx-2 mt-4 rounded-full pb-1 cursor-pointer" />

            </form>
        </div>
    );
};