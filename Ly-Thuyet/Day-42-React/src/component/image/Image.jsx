import React, { forwardRef, memo, useImperativeHandle, useRef } from 'react'

function Image(props, ref) {
    const originalSize = useRef(1);

    const imageRef = useRef()
    useImperativeHandle(ref, () => {
        return {
            zoomIn: () => {
                imageRef.current.style.transform = `scale(${originalSize.current + 0.2})`;
                originalSize.current += 0.2;
            },
            zoomOut: () => {
                imageRef.current.style.transform = `scale(${originalSize.current - 0.2})`;
                originalSize.current -= 0.2;
            }
        }
    })

  return (
    <div style={{ overflow: "hidden", width: "500px", height: "500px", objectFit: "cover", objectPosition: "center" }}>
        <img ref={imageRef} src="https://fastly.picsum.photos/id/142/800/800.jpg?hmac=eXyt1-KM--iTld7JYyjxb_Yst-dSuAKJB8KeLZndh_U" alt="" />
    </div>
  )
}

export default memo(forwardRef(Image));