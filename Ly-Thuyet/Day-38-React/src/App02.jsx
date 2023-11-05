// Props là một tham số của hàm trong component
// Props sẽ trả về 1 object
// Props dùng để truyền dữ liệu từ component cha xuống component con
// Không thể thay đổi 1 props trong 1 component (props chỉ đọc)

import React from 'react'
import Products from './component/Products'

export default function App02() {
    const attributes = {
        attrName: "Thuộc tính",
        attrValue: "Giá trị"
    };
    const handleGetData = (data) => {
        console.log(data);
    }

  return (
    <div>
        <Products name="Sản phẩm 1" price="12000" {...attributes} onGetData={handleGetData}></Products>
    </div>
  )
}
