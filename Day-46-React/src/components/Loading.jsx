import React from 'react'
import BarLoader from "react-spinners/BarLoader";

export default function Loading() {
  const cssOverride = {
    backgroundColor: "rgb(252 222 205)",
  }

  return (
    <div className='loading'>
        <BarLoader
          color={"rgb(255, 120, 43)"}
          loading={true}
          width={"200px"}
          height={"5px"}
          cssOverride={cssOverride}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
    </div>
  )
}
