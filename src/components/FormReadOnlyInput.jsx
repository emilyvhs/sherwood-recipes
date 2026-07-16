export default function FormReadOnlyInput({value}) {
    return (
        <input 
            value={value} 
            disabled readOnly 
            type="text" 
            className="bg-olive-200 
                border-1 border-olive-300 rounded-md 
                pl-2 py-1 mb-1" 
        />
    )
}