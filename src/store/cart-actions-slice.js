import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";


export const fetchCartData = () => {
   return async (dispatch) => {
       const fetchData = async () => {
           const response = await fetch(
               'https://order-food-eb0b9-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json'
           );
           if (!response.ok) {
               throw new Error('Could not fetch cart data!');
           }
           return await response.json();
       }
       try {
           const cartDate = await fetchData();
           dispatch(cartActions.replaceCart({
               items: cartDate.items || [],
               totalQuantity: cartDate.totalQuantity,
           }));
       } catch (error) {
           dispatch(uiActions.showNotification({
               status: 'error',
               title: 'Error!',
               message: 'Fetching cart data failed!'
           }));
       }
   }
}

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
                    body: JSON.stringify({
                        items: cart.items,
                        totalQuantity: cart.totalQuantity
                    }),
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
