import React, { useEffect, useRef } from 'react'
import Image from './Image'

export default function Control() {
    const imageRef = useRef();

    const handleZoomIn = () => {
        imageRef.current.zoomIn();
    }

    const handleZoomOut = () => {
        imageRef.current.zoomOut();
    }

    return (
        <div>
            <Image ref={imageRef} />
            <button onClick={handleZoomIn}>Zoom in</button>
            <button onClick={handleZoomOut}>Zoom out</button>
        </div>
    )
}

// Xây dựng ref chỉ cho phép component sử dụng các phương thức và thuộc tính 