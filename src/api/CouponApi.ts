import { Coupon } from "../models/Coupon";
import { ResponseData, ResponseData1 } from "../models/Product";
import privateApi from "./privateApi";


export const getAllCoupons = async (): Promise<ResponseData<Coupon>> => {
    try {
        const response = await privateApi.get<ResponseData<Coupon>>('/api/v1/coupons');
        if (response.data.code !== 1000) throw new Error("Error");

        return response.data;
    } catch (error) {
        console.error(error);

        throw error;
    }
}


export const getCouponByCode = async (code: string): Promise<ResponseData1<Coupon>> => {
    try {
        const response = await privateApi.get<ResponseData1<Coupon>>(`/api/v1/coupons/code/${code}`);
        if (response.data.code !== 1000) throw new Error("Error");

        return response.data;
    } catch (error) {
        console.error(error);

        throw error;
    }
}




