import AddButton from "../atoms/ButtonAdd";

export default function FormIngredients({
    hiddenIngredientLabel = false, 
    ingredientPlaceholder = "e.g. Tomatoes",
    hiddenQuantityLabel = false,
    quantityPlaceholder = "e.g. 200g",
    onClick
}) 

{

    return (

        <div className="grid grid-cols-[40%_40%_20%] gap-2 mt-4 mb-2">
            <div className="flex items-center">
                <div className="flex flex-col">

                    <label htmlFor="ingredient" hidden={hiddenIngredientLabel}>
                        Ingredient
                    </label> 

                    <input 
                        type="text" name="ingredient" id="ingredient" 
                        placeholder={ingredientPlaceholder}          
                        className="bg-white 
                            rounded-md border-1 border-rose-100 
                            pl-2 py-1 
                            shadow-sm shadow-olive-300 
                            focus:outline focus:outline-rose-300 
                            field-sizing-fixed w-[100%]" 
                            />

                </div>
            </div>

            <div className="flex items-center">
                <div className="flex flex-col">

                    <label htmlFor="quantity" hidden={hiddenQuantityLabel}>
                        Quantity
                    </label>

                    <input 
                        type="text" name="quantity" id="quantity" 
                        placeholder={quantityPlaceholder}            
                        className="bg-white 
                            rounded-md border-1 border-rose-100 
                            pl-2 py-1 
                            shadow-sm shadow-olive-300 
                            focus:outline focus:outline-rose-300 
                            field-sizing-fixed w-[100%]" 
                        />
                </div>
            </div>

            <div className="flex items-end">
                <AddButton label="Add ingredient" onClick={onClick} />
            </div>
        </div>

    );
};