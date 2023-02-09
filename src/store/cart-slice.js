import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
    },
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            console.log(action.payload)
            const existingItem = state.items.find(item => item.id === newItem.id);
            console.log(state.items.find(item => item.id === newItem.id));
            state.totalQuantity++;
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.totalPrice,
                    name: newItem.title
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.price * existingItem.quantity;
            }
        },
        removeItemFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity--;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price
            }
        }
    }
});

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                status: 'pending',
                title: 'Sending...',
                message: 'Sending cart data!'
            })
        );
        const sendRequest = async () => {
            const response = await fetch(
                'https://order-food-eb0b9-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',
                {
                    method: 'PUT',
                    body: JSON.stringify(cart),
                });
            if (!response.ok) {
                throw new Error('Sending cart data failed!');
            }
        };

        try {
            await sendRequest();
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Sent cart data Successfully!'
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Sent cart data failed!'
            }));
        }
    }
}

export const cartActions = cartSlice.actions;
export default cartSlice;
