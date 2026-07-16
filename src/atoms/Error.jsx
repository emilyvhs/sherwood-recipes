export default function Error({id, text}) {

    return (

        <p className="text-right text-rose-800 text-sm mb-2" id={id}>
            {text}
        </p>
        
    );
};