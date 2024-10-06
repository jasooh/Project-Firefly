'use client'

import keys from '../../keys.json'
import {useFireContext} from "@/app/context/FireDataContext";

const FetchButton = () => {
    const FireData = useFireContext()
    const handleOnClick = () => {
        fetch(keys['status-endpoint'], {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                FireData.setFireCount(data['fires_spotted'])
                FireData.setXCoordinate(data['x_coordinate'])
                FireData.setYCoordinate(data['y_coordinate'])
                FireData.setTemp(data['temp'])
            })
            .catch(err => console.error(err))
    }

    return <button className="p-2 rounded-md border border-primary hover:bg-primary duration-200" onClick={handleOnClick}>Re-fetch Data</button>
}

export default FetchButton;