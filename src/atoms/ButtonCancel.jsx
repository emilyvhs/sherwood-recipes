export default function CancelButton({onClick}) {

    return (

        <button 
            onClick={onClick}   
            className="underline underline-offset-2 hover:decoration-wavy text-rose-700 hover:text-rose-500 cursor-pointer">
                Cancel
            </button>

    );
};