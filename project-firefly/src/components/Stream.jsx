'use client'

import keys from '../../keys.json'
import {useState} from "react";

const Stream = () => {
    const [imageUrl, setImageUrl] = useState(keys['live-stream-endpoint'])
    const handleError = () => {
        // Set to a placeholder URL
        setImageUrl('/assets/placeholder-image.jpg')
    }

    return (
        <article className="mt-5 w-[720px] h-[480px] rounded-md shadow-md p-[5px]">
            <section className="row-container center-container left-5 top-5 w-fit">
                <span className="block m-3 h-[15px] w-[15px] rounded-full bg-red-600"/>
                <p>LIVE</p>
            </section>
            {/* TODO: this is a really bad way of streaming the data, but we are out of time :3 */}
            <img src={imageUrl} onError={handleError} alt="DRONE STREAM"/>
            <p className="font-extralight">DRONE - #1 VISION</p>
        </article>
    )
}

export default Stream;