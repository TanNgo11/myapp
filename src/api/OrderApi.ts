import axios from "axios"
import { Order, OrderRequest, ResultOrder, OrderStatus } from '../models/Order';
import { ResponseData, ResponseData1 } from "../models/Product";
import privateApi from "./privateApi";

export const createOrder = async (order: Order): Promise<ResponseData1<OrderRequest>> => {
    try {
        const response = await privateApi.post<ResponseData1<OrderRequest>>('/api/v1/orders', order);
        if (response.data.code !== 1000) throw new Error("Error");

        return response.data;
    } catch (error) {
        console.error(error);

        throw error;
    }
}

export const getAllOrders = async (): Promise<ResponseData1<ResultOrder>> => {
    try {
        const response = await privateApi.get<ResponseData1<ResultOrder>>('/api/v1/orders');
        if (response.data.code !== 1000) throw new Error("Error");

        return response.data;
    } catch (error) {
        console.error(error);

        throw error;
    }
}


export const getOrderById = async (id: number): Promise<ResponseData1<Order>> => {
    try {
        const response = await privateApi.get<ResponseData1<Order>>(`/api/v1/orders/${id}`);
        if (response.data.code !== 1000) throw new Error("Error");

        return response.data;
    } catch (error) {
        console.error(error);

        throw error;
    }
}


export const updateOrder = async (orderId: number, status: OrderStatus): Promise<ResponseData1<Order>> => {
    try {
        const response = await privateApi.put<ResponseData1<Order>>(
            `/api/v1/orders/${orderId}/status`,
            null,
            {
                params: {
                    orderId,
                    status,
                },
            }
        );

        if (response.data.code !== 1000) throw new Error("Error");

        return response.data;
    } catch (error) {
        console.error(error);

        throw error;
    }
}

