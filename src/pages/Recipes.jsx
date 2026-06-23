import H2 from "../atoms/H2";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function Recipes() {
    return (
        <div>
            <Header></Header>

            <section className="flex mb-6">
                <H2 text="Add new recipe"></H2>
                <Link to="/add" className="inline-flex items-center text-rose-500 font-semibold hover:text-rose-700 bg-rose-200 hover:bg-rose-300 px-2 mx-2 rounded-full pb-1">+</Link>
            </section>

            <section className="p-4 border-y-3 border-dashed border-emerald-300">
       
                

                <div className="grid grid-cols-2">
                    <div>
                        <H2 text="Recipe"></H2>
                        <p>Meal</p>
                    </div>
                    <div>
                        <H2 text="Last cooked"></H2>
                        <p>Date</p>
                    </div>
                </div>
        
                

                
            </section>
        </div>
    )
}