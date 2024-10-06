import Stream from "@/components/Stream";

export default function report() {
    return (
        <div className="app-container">
            <article>
                <header className="col-container justify-between fit-parent p-[5%]">
                        <h3>FIREFL.AI</h3>
                        <h1 className="text-primary">
                            <span className="text-white font-extralight">LIVE </span>PAGE
                        </h1>
                        <h3>Watch us in action.</h3>
                    <article>
                        <Stream/>
                    </article>
                </header>
            </article>
        </div>
    );
}
