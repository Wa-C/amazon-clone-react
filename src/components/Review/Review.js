import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart, setCart] = useState([]);

    const removeProduct = (productKey) => {
        console.log("remove");
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);

    }

    useEffect(() => {
        const savedCart = getDatabaseCart(); //databaseManager function
        const productKeys = Object.keys(savedCart); // object.key unknown method , its only taking the keys from the object.  
        // const productKeys = Object.values (savedCart); // object.key unknown method , its only taking the keys from the object.  
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key]; // its taking the quantity of the products.
            return product;
        }, []);
        setCart(cartProducts);

    })
    return (
        <div>
            <h3>Cart Items : {cart.length}</h3>

            {
                cart.map(pd => <ReviewItem removeProduct={removeProduct} key={pd.key} product={pd} />)
            }
        </div>
    );
};

export default Review;