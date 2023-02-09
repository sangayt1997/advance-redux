import Cart from './components/cart/cart/cart';
import Layout from './components/layout/layout';
import Products from './components/shop/products/products';
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
    const showCart = useSelector(state => state.ui.isCartVisible);
    const cart = useSelector(state => state.cart);

    useEffect(() => {
        fetch('https://order-food-eb0b9-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json', {
            method: 'PUT',
            body: JSON.stringify(cart),
        });
    }, [cart])

    return (
        <Layout>
            {showCart && <Cart/>}
            <Products/>
        </Layout>
    );
}

export default App;
