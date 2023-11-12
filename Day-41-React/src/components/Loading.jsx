import React from 'react'
import BounceLoader from "react-spinners/BounceLoader";
import { useAuth0 } from '@auth0/auth0-react'

export default function Loading() {
    const override = {
        display: "block",
        margin: "0 auto",
      };

    return (
        <div className="loading">
            <BounceLoader
                color="#ff8b18"
                loading={true}
                cssOverride={override}
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}
