import React, { useEffect, useMemo, useState } from 'react'
import '../styles/PayBtn.css'
import { useShoppingCart } from '../../../context/ShoppingCartContext';
import { Product } from '../../../models/Product';
import { getListProductByIds } from '../../../api/ProductApi';
import CartItem from '../components/CartItem';
import LocationSelector from '../../../util/LocationSelector';
import { Order } from '../../../models/Order';
import { createOrder } from '../../../api/OrderApi';
import useCustomToast from '../../../util/UseCustomToast';
import useCurrencyFormatter from '../../../hooks/useCurrencyFormatter';
const initialOrderDetail: Order = {
    customerName: '',
    email: '',
    phoneNumber: '',
    address: '',
    note: '',
    orderItems: []
};


const Checkout = () => {
    const currentcyFormat = useCurrencyFormatter();
    const [products, setProducts] = useState<Product[]>([]);
    const { cartItems } = useShoppingCart();
    const [address, setAddress] = useState('');
    const [orderDetail, setOrderDetail] = useState<Order>(initialOrderDetail);
    const showToast = useCustomToast();


    useEffect(() => {
        const ids = cartItems.map(item => item.id);
        if (ids.length === 0) {
            setProducts([]);
            return;
        }
        getListProductByIds(ids).then((data) => {
            setProducts(data.result);
        });



    }, [cartItems]);

    useEffect(() => {
        if (products.length > 0) {
            setOrderDetail(prev => ({
                ...prev,
                orderItems: cartItems.map(item => {
                    const productPrice = products.find(p => p.id === item.id)?.price || 0;
                    return {
                        productId: item.id,
                        quantity: item.quantity,
                        price: productPrice
                    };
                })
            }));
        }
    }, [products, cartItems]);

    const subtotal = useMemo(() => {

        return cartItems.reduce((total, item) => {
            const product = products.find(p => p.id === item.id);
            return total + (product ? product.price * item.quantity : 0);
        }, 0);
    }, [cartItems, products]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value, type } = e.target as HTMLInputElement | HTMLTextAreaElement;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : false;
        setOrderDetail(prev => ({
            ...prev!,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitting:', orderDetail);

        // async function submitOrder() {
        //     try {
        //         const response = await createOrder(orderDetail);
        //         console.log(response);
        //     } catch (error) {
        //         console.error(error);
        //     }
        // }
        // submitOrder();
        // resetDefaultAndShowMessage();


    };

    function resetForm() {
        setOrderDetail(initialOrderDetail);
    }

    function resetDefaultAndShowMessage() {
        resetForm();
        setProducts([]);
        localStorage.setItem('cartItems', JSON.stringify([]));
        showToast('Place Order successful!', 'success');

    }


    return (
        <div className="container-fluid py-5">
            <div className="container py-5">
                <h1 className="mb-4">Billing details</h1>
                <form action="#">
                    <div className="row g-5">
                        <div className="col-md-12 col-lg-6 col-xl-7">

                            <div className="form-item w-100">
                                <label className="form-label my-3">Customer Name<sup>*</sup></label>
                                <input
                                    value={orderDetail!.customerName}
                                    onChange={handleChange}
                                    name="customerName"
                                    type="text" className="form-control" />
                            </div>
                            <div className="form-item">
                                <label className="form-label my-3">Address <sup>*</sup></label>
                                <LocationSelector onAddressChange={setAddress} />
                                <input
                                    value={orderDetail!.address}
                                    name="address"
                                    onChange={
                                        handleChange
                                    } type="text" className="form-control" placeholder='Your Address' />
                            </div>

                            <div className="form-item">
                                <label className="form-label my-3">Mobile Phone<sup>*</sup></label>
                                <input
                                    name="phoneNumber"
                                    value={orderDetail!.phoneNumber}
                                    onChange={handleChange}
                                    type="tel" className="form-control" />
                            </div>
                            <div className="form-item">
                                <label className="form-label my-3">Email<sup>*</sup></label>
                                <input
                                    name="email"
                                    value={orderDetail!.email}
                                    onChange={handleChange}
                                    type="email" className="form-control" />
                            </div>
                            <div className="form-item">
                                <label className="form-label my-3">Notes</label>
                                <textarea
                                    name="note"
                                    value={orderDetail!.note}
                                    onChange={handleChange}
                                    className="form-control" spellCheck="false" cols={30} rows={11} placeholder="Order Notes (Optional)"></textarea>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-xl-5">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Products</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item) => {
                                            const product = products.find(product => product.id === item.id);
                                            if (!product) return null;
                                            return <CartItem key={item.id} product={product} quantity={item.quantity} readonly={true} />;
                                        })}



                                        {/* <tr>
                                            <th scope="row"></th>
                                            <td className="py-5"></td>
                                            <td className="py-5"></td>
                                            <td className="py-5">
                                                <p className="mb-0 text-dark py-3">Subtotal</p>
                                            </td>
                                            <td className="py-5">
                                                <div className="py-3 border-bottom border-top">
                                                    <p className="mb-0 text-dark">{currentcyFormat(subtotal)}</p>
                                                </div>
                                            </td>
                                        </tr> */}
                                        {/* <tr>
                                            <th scope="row"></th>
                                            <td className="py-5">
                                                <p className="mb-0 text-dark py-4">Shipping</p>
                                            </td>
                                            <td colSpan={3} className="py-5">
                                                <div className="form-check text-start">
                                                    <input type="checkbox" className="form-check-input bg-primary border-0" id="Shipping-1" name="Shipping" value="Shipping" />
                                                    <label className="form-check-label" htmlFor="Shipping-1">Free Shipping: $0.00</label>
                                                </div>
                                                <div className="form-check text-start">
                                                    <input type="checkbox" className="form-check-input bg-primary border-0" id="Shipping-2" name="Shipping" value="Shipping" />
                                                    <label className="form-check-label" htmlFor="Shipping-2">Local Pickup: $10.00</label>
                                                </div>
                                            </td>
                                        </tr> */}
                                        <tr>
                                            <th scope="row"></th>
                                            <td className="py-5"></td>
                                            <td className="py-5"></td>
                                            <td className="py-5">
                                                <p className="mb-0 text-dark py-4">Total</p>
                                            </td>
                                            <td className="py-5">
                                                <div className="py-4 border-bottom border-top">
                                                    <p className="mb-0 text-dark">${currentcyFormat(subtotal)}</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="form-check my-3">
                                <input className="form-check-input" type="radio" name="payment" id="payment-1" value="option1" />
                                <label className="form-check-label" htmlFor="payment-1">Direct Bank Transfer</label>
                            </div>
                            <div className="form-check my-3">
                                <input className="form-check-input" type="radio" name="payment" id="payment-2" value="option2" />
                                <label className="form-check-label" htmlFor="payment-2">Cheque Payment</label>
                            </div>
                            <div className="form-check my-3">
                                <input className="form-check-input" type="radio" name="payment" id="payment-3" value="option3" />
                                <label className="form-check-label" htmlFor="payment-3">PayPal</label>
                            </div>
                            <button onClick={handleSubmit} className="Btn">
                                Pay
                                <svg className="svgIcon" viewBox="0 0 576 512">
                                    <path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Checkout