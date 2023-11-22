import React from 'react'
import BarLoader from "react-spinners/BarLoader";

const overrideCss = {
    display: "block",
    margin: "0px auto",
    borderColor: "#dc3545",
}

export default function Loading() {
  return (
    <div className='loading'>
        <BarLoader
            color={"#dc3545"}
            loading={true}
            size={150}
            overrideCss={overrideCss}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    </div>
  )
}
