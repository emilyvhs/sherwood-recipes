import Calendar from "../components/Calendar";
import Nav from "../components/Nav";
import SiteTitle from "../components/SiteTitle";

export default function Home() {
    return (
        <div>
            <header>
                <SiteTitle></SiteTitle>
                <Nav></Nav>
            </header>            

            <section>
                <p className="text-center">Let's meal plan together!</p>
            </section>

            <section>
                <Calendar></Calendar>
            </section>
        </div>        
    )
}