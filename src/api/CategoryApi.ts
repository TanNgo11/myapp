import { CategoryRequest } from "../models/Category";
import { Category, ResponseData1 } from "../models/Product";
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