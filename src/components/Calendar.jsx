import H2 from "../atoms/H2";

export default function Calendar() {
    return (
        <div className="mt-6 p-4 border-y-3 border-dashed border-emerald-300">
            <H2 text="Meals coming up"></H2>

            <div className="grid grid-cols-2">

                <div>
                    <p>Monday</p>
                    <p>Tuesday</p>
                    <p>Wednesday</p>
                    <p>Thursday</p>
                    <p>Friday</p>
                    <p>Saturday</p>
                    <p>Sunday</p>
                </div>

                <div>
                    <p>Meal</p>
                    <p>Meal</p>
                    <p>Meal</p>
                    <p>Meal</p>
                    <p>Meal</p>
                    <p>Meal</p>
                    <p>Meal</p>
                </div>

            </div>

            
        </div>
    )
}