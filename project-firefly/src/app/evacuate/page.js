'use client';

import FetchButton from "@/components/FetchButton";
import {useFireContext} from "@/app/context/FireDataContext";

export default function Report() {
    const FireData = useFireContext()

    return (
        <div className="app-container">
            <article>
                <header className="fit-parent p-[5%]">
                    <h3>Welcome to the</h3>
                    <h1 className="text-primary">
                        <span className="text-white font-extralight">WARNING </span>PAGE
                    </h1>
                    <h3>Your way of knowing to survive.</h3>
                    {/* Actions */}
                    <article className="mt-10 row-container gap-5">
                        <section className="row-container">
                            <div
                                className="w-fit p-10 bg-accent border-accent border rounded-md col-container gap-7">
                                <h2>CURRENT FIRE STATUS:</h2>
                                <h3 className="text-primary">No fires detected in your area.</h3>
                                <div className="col-container justify-between">
                                    <p>Fires spotted by drones: {FireData.fireCount}</p>
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
