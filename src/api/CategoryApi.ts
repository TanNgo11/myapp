import { CategoryRequest } from "../models/Category";
import { Category, ResponseData, ResponseData1 } from "../models/Product";
import privateApi from "./privateApi";





export const createNewCategory = async (category: CategoryRequest): Promise<ResponseData1<Category>> => {
    try {
        const response = await privateApi.post<ResponseData1<Category>>('/api/v1/categories', category);
        if (response.data.code !== 1000) throw new Error("Error");

        return response.data;
    } catch (error) {
        console.error(error);

        throw error;
    }
}


export const getAllCategories = async (): Promise<ResponseData<Category>> => {
    try {
        const response = await privateApi.get<ResponseData<Category>>('/api/v1/categories');
        if (response.data.code !== 1000) throw new Error("Error");

        return response.data;
    } catch (error) {
        console.error(error);

        throw error;
    }
}


export const countProductsInCategory = async (categoryName: string): Promise<ResponseData1<number>> => {
    try {
        const response = await privateApi.get<ResponseData1<number>>(`/api/v1/categories/${categoryName}/products/count`);
        if (response.data.code !== 1000) throw new Error("Error");

        return response.data;
    } catch (error) {
        console.error(error);

        throw error;
    }
}