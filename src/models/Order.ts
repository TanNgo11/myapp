export interface Order {
    customerName: string;
    email: string;
    phoneNumber: string;
    address: string;
    note: string;
    orderItems: OrderItem[];
}

export interface OrderItem {
    productId: number;
    quantity: number;
    price: number;
}