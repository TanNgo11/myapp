import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useShoppingCart } from '../../../context/ShoppingCartContext'
import CartItem from '../components/CartItem';
import { getListProductByIds } from '../../../api/ProductApi';
import UseFetch from '../../../api/UseFetch';
import { Product } from '../../../models/Product';
import { UseLocalStorage } from '../../../context/UseLocalStorage';
import { useNavigate } from 'react-router-dom';
import useCurrencyFormatter from '../../../hooks/useCurrencyFormatter';

function Cart() {
    const [products, setProducts] = useState<Product[]>([]);
    const { cartItems } = useShoppingCart();

    const navigate = useNavigate();


    useEffect(() => {
        const ids = cartItems.map(item => item.id);
        if (ids.length === 0) {
            setProducts([]);
            return;
        }
        getListProductByIds(ids).then((data) => {
            setProducts(data.result);
        });
    }, [cartItems, setProducts]);


    const subtotal = useMemo(() => {

        return cartItems.reduce((total, item) => {
            const product = products.find(p => p.id === item.id);
            return total + (product ? product.price * item.quantity : 0);
        }, 0);
    }, [cartItems, products]);


    const handleProcessToCheckout = () => {
        navigate('/checkout');
    }
    const currentcyFormat = useCurrencyFormatter();

    return (
        <div className="container-fluid py-5">
            <div className="container py-5">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Products</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => {
                                const product = products.find(product => product.id === item.id);
                                if (!product) return null;
                                return <CartItem key={item.id} product={product} quantity={item.quantity} readonly={false} />;
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="mt-5">
                    <input type="text" className="border-0 border-bottom rounded me-5 py-3 mb-4" placeholder="Coupon Code" />
                    <button className="btn border-secondary rounded-pill px-4 py-3 text-primary" type="button">Apply Coupon</button>
                </div>
                <div className="row g-4 justify-content-end">
                    <div className="col-8"></div>
                    <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                        <div className="bg-light rounded">
                            <div className="p-4">
                                <h1 className="display-6 mb-4">Cart <span className="fw-normal">Total</span></h1>
                                <div className="d-flex justify-content-between mb-4">
                                    <h5 className="mb-0 me-4">Subtotal:</h5>
                                    <div className="mb-0">{currentcyFormat(subtotal)}</div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <h5 className="mb-0 me-4">Shipping:</h5>
                                    <div className="mb-0">$0.00</div>
                                </div>
                                <div className="d-flex justify-content-between mb-4">
                                    <h5 className="mb-0 me-4">Total:</h5>
                                    <div className="mb-0">{currentcyFormat(subtotal)}</div>
                                </div>
                                <button onClick={handleProcessToCheckout} className="btn btn-primary w-100 py-3">Proceed to checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Cart