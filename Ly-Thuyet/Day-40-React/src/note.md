Functional Component
- Component được tạo bằng function
- Khi re-render -> Chạy lại cả Functional Component
- Không có sẵn các thành phần của React (state, lifecycle) => Khắc phục: Sử dụng hook


Hook
- Hook là một hàm đặc biệt do React build sẵn hoặc do các nhà phát triển tự xây dựng
- Bắt đầu bằng từ khóa use (useState, useContext, ...)
- Chỉ được gọi hook ở trong Functional Component (không thể gọi được ở Class Component, Event Handler, hoặc bất kì hàm con nào khác trong function)


I.
1. useState() : Làm việc với state trong functional
    + Trả về 1 mảng có 2 phần tử
    + Phần tử 1 giá trị của state
    + Phần tử 2 là function setState

2. useEffect() : Mô phỏng lại vòng đời component trong functional component
    + Cấu trúc: useEffect(callback, dependencies)


II.
1. Khi state thay đổi
2. UI Update
3. Clean up
3. useEffect chạy


III.
1. useReducer() : Quản lý state theo reducer
    + Đẩy phần logic vào trong hàm reducer
    + Event handler -> Dispatch lên reducer
    + Cấu trúc: 
```js
const reducer = (prevState, dispatch) = > {
    return newState
}
const initialState = {}
const [state, dispatch] = useReducer(reducer, initialState);
const eventHandler = () => {
    dispatch();
}
```