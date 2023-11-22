import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carts: localStorage.getItem("carts") ? JSON.parse(localStorage.getItem("carts")) : [],
}

export const cartsSlice = createSlice({
    name: "carts",
    initialState,
    reducers: {
        updateCarts: (state, action) => {
            if (state.carts.length > 0) {
                let check = false;
                state.carts.forEach(({ _id }, index) => {
                    if (_id === action.payload._id) {
                        check = true;
                        state.carts[index].quantity += 1;
                        localStorage.setItem("carts", JSON.stringify(state.carts));
                        return;
                    }
                })

                if (!check) {
                    state.carts = [
                        ...state.carts,
                        action.payload,
                    ]
                    localStorage.setItem("carts", JSON.stringify(state.carts));
                }
            }
            else {
                state.carts = [action.payload];
                localStorage.setItem("carts", JSON.stringify(state.carts));
            }
        },

        increaseCarts: (state, action) => {
            state.carts.forEach(({ _id }, index) => {
                if (_id === action.payload) {
                    state.carts[index].amount -= 1;
                    state.carts[index].quantity += 1;
                    localStorage.setItem("carts", JSON.stringify(state.carts));
                    return;
                }
            });
        },

        decreaseCarts: (state, action) => {
            state.carts.forEach(({ _id }, index) => {
                if (_id === action.payload) {
                    state.carts[index].amount += 1;
                    state.carts[index].quantity -= 1;
                    localStorage.setItem("carts", JSON.stringify(state.carts));
                    return;
                }
            });
        },

        deleteItemCarts: (state, action) => {
            state.carts.forEach(({ _id }, index) => {
                if (_id === action.payload) {
                    state.carts.splice(index, 1);
                    localStorage.setItem("carts", JSON.stringify(state.carts));
                    return;
                }
            });
        },

        clearCarts: (state) => {
            state.carts = [];
            localStorage.setItem("carts", JSON.stringify(state.carts));
        }
    }
});

// Middleware

export const fetchInfoProduct = (_id) => {
    return async (dispatch) => {
        const response = await fetch(`https://api-exercise-sopi.vercel.app/api/v1/products/${_id}`);
        const { data } = await response.json();
        const newData = {
            ...data,
            amount: data.quantity,
            quantity: 1,
        }
        dispatch(cartsSlice.actions.updateCarts(newData));
    }
}