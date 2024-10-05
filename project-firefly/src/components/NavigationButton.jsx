'use client'

import { useRouter } from "next/navigation";

const NavigationButton = (props) => {
    // Next.js client router
    const router = useRouter();

    // Redirect users to page
    const handleRedirect = () => {
        router.push(props.path)
    }

    return (
        <button onClick={handleRedirect}>
            {props.name}
        </button>
    )
}

export default NavigationButton