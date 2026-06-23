import Calendar from "../components/Calendar";
import Header from "../components/Header";

export default function Home() {
    return (
        <div>
            <Header></Header>            

            <section>
                <p className="text-center">Let's meal plan together!</p>
            </section>

            <section>
                <Calendar></Calendar>
            </section>
        </div>        
    )
}