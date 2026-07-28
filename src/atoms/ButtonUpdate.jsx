export default function UpdateButton({onClick, value}) {

    return (

        <button 
            onClick={onClick} 
            value={value}
            className="underline underline-offset-2 hover:decoration-wavy text-rose-700 hover:text-rose-500 cursor-pointer">
                Update
            </button>

    );
};