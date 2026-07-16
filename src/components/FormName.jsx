export default function FormName({onChange, label, hiddenLabel = false, placeholder = "e.g. Bean's Beans", value}) {

    return (

        <>
            <label htmlFor="name" hidden={hiddenLabel}>
                {label}
            </label>

            <input 
                onChange={onChange} 
                type="text" name="name" id="name" 
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