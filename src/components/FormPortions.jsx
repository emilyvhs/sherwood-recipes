export default function FormPortions({onChange, label, hiddenLabel = false, placeholder, value}) {

    return (

        <>
            <label htmlFor="portions" hidden={hiddenLabel}>
                {label}
            </label>

            <input 
                onChange={onChange} 
                type="number" name="portions" id="portions"
                placeholder={placeholder}
                value={value} 
                className="bg-white 
                    rounded-md border-1 border-rose-100 
                    pl-2 py-1 mb-2
                    shadow-sm shadow-olive-300 
                    focus:outline focus:outline-rose-300" 
            />
        </>
    )
}

