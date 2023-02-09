import ProductItem from '../product-item/product-item';
import classes from './products.module.css';

const Products = (props) => {
    const DUMMY_PRODUCTS = [
        {
            id: 'p1',
            price: 6,
            title: 'My first book',
            description: 'The first book I ever wrote',
            total: 2
        },
        {
            id: 'p2',
            price: 8,
            title: 'My second book',
            description: 'The second book I ever wrote',
            total: 2
        },
    ];
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
          {
              DUMMY_PRODUCTS.map((item) => (
                  <ProductItem
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      price={item.price}
                      description={item.description}
                      total={item.total}
                  />
              ))
          }
      </ul>
    </section>
  );
};

export default Products;
