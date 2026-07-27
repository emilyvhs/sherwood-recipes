export default function FormRecipeLocation({onChange, label, hiddenLabel = false, placeholder = "e.g. a website / a cookbook", value}) {

    return (

        <>
            <label htmlFor="recipeLocation" hidden={hiddenLabel} className="mt-4">
                {label}
            </label>

            <input 
                onChange={onChange}
                type="text" name="recipeLocation" id="recipeLocation" 
                placeholder={placeholder} 
                value={value}
                className="bg-white 
                    rounded-md border-1 border-rose-100 
                    pl-2 py-1 mb-2
                    shadow-sm shadow-olive-300 
                    focus:outline focus:outline-rose-300" 
            />
        </>

    );
};