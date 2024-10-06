// Components
import NavigationButton from "@/components/NavigationButton";

// Navbar
const Navbar = () => (
    <nav className="sticky bg-background bg-opacity-5 top-0 pr-[5rem] py-[1rem] row-container justify-end">
        <section className="w-[40%] row-container justify-between">
            <NavigationButton name="HOME" path="/"/>
            <NavigationButton name="REPORT" path="/report"/>
            <NavigationButton name="FORECAST" path="/forecast"/>
            <NavigationButton name="RESOURCES" path="/resources"/>
            <NavigationButton name="LIVE" path="/live"/>
        </section>
    </nav>
)

export default Navbar