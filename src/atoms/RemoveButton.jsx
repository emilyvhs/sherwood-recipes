import { Link } from "react-router-dom";

export default function RemoveButton({link, linkTo, onClick, value}) {

    if (link === true) {

        return (
            <Link to={linkTo} 
            className="flex justify-center 
            text-rose-500 hover:text-rose-700 font-bold 
            bg-rose-200 hover:bg-rose-300 
            w-[35px] h-[35px] text-[20px] leading-[34px]
            rounded-full">
                -
            </Link>
        )

    } else {

        return (
            <button onClick={onClick} value={value} 
            className="flex justify-center 
            text-rose-500 hover:text-rose-700 font-bold 
            bg-rose-200 hover:bg-rose-300 
            w-[35px] h-[35px] text-[20px] leading-[34px]
            rounded-full cursor-pointer">
                -
            </button>
        )

    };
};