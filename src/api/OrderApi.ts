import axios from "axios"
import { Order } from "../models/Order";
import { ResponseData1 } from "../models/Product";
export const api = axios.create({
    baseURL: "http://localhost:8081"
})


export const createOrder = async (order: Order): Promise<ResponseData1<Order>> => {
    try {
        const response = await api.post<ResponseData1<Order>>('/api/v1/orders', order);
        if (response.data.code !== 1000) throw new Error("Error");

        return response.data;
    } catch (error) {
        console.error(error);

        throw error;
    }
}
