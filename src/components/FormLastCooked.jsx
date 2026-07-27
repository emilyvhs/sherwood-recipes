export default function FormLastCooked({onChange, label, hiddenLabel = false, value}) {

    return (
        <>
            <label htmlFor="lastCooked" hidden={hiddenLabel} className="mt-4">
                {label}
            </label>

            <input
                onChange={onChange}
                type="date" name="lastCooked" id="lastCooked"
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