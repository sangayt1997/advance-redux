import Cart from './components/cart/cart/cart';
import Layout from './components/layout/layout';
import Products from './components/shop/products/products';
import { useSelector } from "react-redux";

function App() {
    const showCart = useSelector(state => state.ui.isCartVisible);

    return (
        <Layout>
            {showCart && <Cart/>}
            <Products/>
        </Layout>
    );
}

export default App;
