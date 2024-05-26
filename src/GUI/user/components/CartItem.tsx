import { useEffect, useState } from "react";
import UseFetch from "../../../api/UseFetch";
import { getProducts } from "../../../api/ProductApi";
import { Product } from '../../../models/Product';
import { useShoppingCart } from "../../../context/ShoppingCartContext";
import useCurrencyFormatter from "../../../hooks/useCurrencyFormatter";


type CartItemProps = {
    product: Product;
    quantity: number;
    updateDiscount?: (discount: number) => void;
    readonly?: boolean;
}

function CartItem(item: CartItemProps) {

    const [itemData, setItemData] = useState<Product>({} as Product);
    const [quantity, setQuantity] = useState<number>(1);

    const { increaseItemQuantity, decreaseItemQuantity, removeItemFromCart, coupon } = useShoppingCart();

    useEffect(() => {
        setItemData(item.product);
        setQuantity(item.quantity)
    }, [item]);
    // const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const newQuantity = parseInt(event.target.value, 10);
    //     if (!isNaN(newQuantity) && newQuantity >= 0) {
    //         setQuantity(newQuantity);
    //     }
    // };

    const handleDescreaseQuantity = (id: number) => {
        decreaseItemQuantity(itemData.id)
    }

    const handleIncreaseQuantity = (id: number) => {
        increaseItemQuantity(itemData.id)
    }

    const currentcyFormat = useCurrencyFormatter();

    return (
        <tr>
            <th scope="row">
                <div className="d-flex align-items-center">
                    <img src={itemData.image} className="img-fluid me-5 rounded-circle" style={{ width: '80px', height: '80px' }} alt="" />
                </div>
            </th>
            <td>
                <div className="mb-0 mt-4">{itemData.name}</div>
            </td>
            <td style={{ width: item.readonly ? "100px" : "auto" }}>
                <div className="mb-0 mt-4">{currentcyFormat(itemData.price)} </div>
            </td>
            <td >
                {!item.readonly && (
                    <div className="input-group quantity mt-4" style={{ width: '100px' }}>
                        <button className="btn btn-sm btn-minus rounded-circle bg-light border" onClick={() => handleDescreaseQuantity(itemData.id)}>
                            <i className="fa fa-minus"></i>
                        </button>
                        <input type="text" className="form-control form-control-sm text-center border-0" value={quantity} readOnly />
                        <button className="btn btn-sm btn-plus rounded-circle bg-light border" onClick={() => handleIncreaseQuantity(itemData.id)}>
                            <i className="fa fa-plus"></i>
                        </button>
                    </div>
                )}
                {item.readonly && (
                    <div className="mb-0 mt-4">{quantity}</div>
                )}
            </td>
            <td>
                <div className="mb-0 mt-4">{currentcyFormat(itemData.price * quantity)}</div>
            </td>
            <td>
                {!item.readonly && (
                    <button className="btn btn-md rounded-circle bg-light border mt-3" onClick={() => removeItemFromCart(itemData.id)}>
                        <i className="fa fa-times text-danger"></i>
                    </button>
                )}
            </td>
        </tr >
    )
}

export default CartItem