'use client';

import FetchButton from "@/components/FetchButton";
import {useFireContext} from "@/app/context/FireDataContext";

const get_warning_message = (fire_count) => {
    if (fire_count <= 100) {
        return "Little or no fires detected in your area."
    } else if (fire_count > 100 && fire_count <= 200) {
        return "Some fires detected in your area - check the app to verify."
    } else if (fire_count > 200) {
        return "ATTENTION: Multiple fires detected in your area. Please evacuate immediately."
    }
}

export default function Report() {
    const FireData = useFireContext()

    return (
        <div className="app-container">
            <article>
                <header className="fit-parent p-[5%]">
                    <h3>FIREFL.AI</h3>
                    <h1 className="text-primary">
                        <span className="text-white font-extralight">WARNING </span>PAGE
                    </h1>
                    {/* Actions */}
                    <article className="mt-10 row-container gap-5">
                        <section className="row-container">
                            <div className="w-fit p-10 bg-accent border-accent border rounded-md col-container gap-7">
                                <h2>CURRENT FIRE STATUS:</h2>
                                <h3 className="text-primary leading-6">{get_warning_message(FireData.fireCount)}</h3>
                                <div className="col-container justify-between">
                                </div>
                            </div>
                        </section>
                        {/* Location */}
                        <section className="row-container">
                            <div
                                className="w-fit p-10 bg-accent border-accent border rounded-md col-container gap-7">
                                <h2>LAST LOCATION STATUS:</h2>
                                <h3 className="text-primary">No last location reported.</h3>
                                <div className="col-container justify-between">
                                    <p>Last location spotted: ({FireData.xCoordinate},{FireData.yCoordinate})</p>
                                </div>
                            </div>
                        </section>
                        {/* Temperature */}
                        <section className="row-container">
                            <div
                                className=" p-10 bg-accent border-accent border rounded-md col-container gap-7">
                                <h2>TEMPERATURE STATUS:</h2>
                                <h3 className="text-primary">No last location reported.</h3>
                                <div className="col-container justify-between">
                                    <p>Last temperature recorded: {FireData.temp}°C</p>
                                </div>
                            </div>
                        </section>
                        <FetchButton/>
                    </article>
                </header>
            </article>
        </div>
    );
}
