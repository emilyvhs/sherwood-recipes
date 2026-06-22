import Calendar from "../components/Calendar";
import Nav from "../components/Nav";
import SiteTitle from "../components/SiteTitle";

export default function Home() {
    return (
        <div>
            <SiteTitle></SiteTitle>
            <Nav></Nav>

            <section>
                <p className="text-center">Let's meal plan together!</p>
            </section>

            <Calendar></Calendar>
        </div>
        
    )
}