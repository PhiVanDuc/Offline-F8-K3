// Middleware

export const fetchTodo = () => {
    return async (dispatch, getState) => {
        // Xử lý logic --> Có dữ liệu --> dispatch lên reducer thông qua tham số dispatch
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        const data = await response.json();
        dispatch({
            type: "todo/fetch",
            payload: data,
        })
    }
}