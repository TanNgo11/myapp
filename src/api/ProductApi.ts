import axios from "axios"
import { Category, Product, ProductSearchString, ProductType, ResponseData, ResponseData1 } from '../models/Product';
import qs from 'qs';
import publicApi from '../api/publicApi';
import privateApi from "./privateApi";


export const getProducts = async (): Promise<ResponseData<Product>> => {
    try {
        const response = await publicApi.get<ResponseData<Product>>('/api/v1/products');
        if (response.data.code !== 1000) throw new Error("Error");

        return response.data;
    } catch (error) {
        console.error(error);

        throw error;
    }
}

export const getProductsById = async (id: number): Promise<ResponseData1<Product>> => {
    try {
        const response = await publicApi.get<ResponseData1<Product>>(`/api/v1/products/${id}`);
        if (response.data.code !== 1000) throw new Error("Error");

        return response.data;
    } catch (error) {
        console.error(error);

        throw error;
    }
}



export const getProductsByCategory = async (category: string): Promise<ResponseData<Product>> => {
    try {
        const response = await publicApi.get<ResponseData<Product>>(`/api/v1/products/category/${category}`);
        if (response.data.code !== 1000) throw new Error("Error");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);

        throw error;
    }
}

export const get5ProductsByCategory = async (category: string): Promise<ResponseData<Product>> => {
    try {
        const response = await publicApi.get<ResponseData<Product>>(`/api/v1/products/category/${category}?limit=5`);
        if (response.data.code !== 1000) throw new Error("Error");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);

        throw error;
    }
}


export const getProductsBySlug = async (slug: string): Promise<ResponseData1<Product>> => {
    try {
        const response = await publicApi.get<ResponseData1<Product>>(`/api/v1/products/detail/${slug}`);
        if (response.data.code !== 1000) throw new Error("Error");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);

        throw error;
    }
}

export const getCategories = async (): Promise<ResponseData<Category>> => {
    try {
        const response = await publicApi.get<ResponseData<Category>>('/api/v1/categories');
        if (response.data.code !== 1000) throw new Error("Error");

        return response.data;
    } catch (error) {
        console.error(error);

        throw error;
    }
}

export const addProduct = async (formData: FormData): Promise<ResponseData1<Product>> => {
    try {

        const response = await publicApi.post<ResponseData1<Product>>('/api/v1/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.data.code !== 1000) throw new Error("Error");

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export const updateProduct = async (formData: FormData): Promise<ResponseData1<Product>> => {
    try {

        const response = await privateApi.put<ResponseData1<Product>>('/api/v1/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.data.code !== 1000) throw new Error("Error");

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getListProductByIds = async (ids: number[]): Promise<ResponseData<Product>> => {

    try {
        const response = await publicApi.get<ResponseData<Product>>('/api/v1/products/list', { params: { ids: ids.join(',') } });
        if (response.data.code !== 1000) {
            throw new Error("Error");
        }

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export const getAllProductsBySearchQuery = async (query: string): Promise<ResponseData<ProductSearchString>> => {
    try {
        const response = await publicApi.get<ResponseData<ProductSearchString>>(`/api/v1/products/search?q=${query}`);
        if (response.data.code !== 1000) throw new Error("Error");

        return response.data;
    } catch (error) {
        console.error(error);

        throw error;
    }
}



export const deleteProducts = async (ids: number[]): Promise<ResponseData1<String>> => {
    try {
        const response = await publicApi.delete<ResponseData1<String>>(`/api/v1/products`, {
            params: { ids },
            paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
        });
        if (response.data.code !== 1000) throw new Error("Error: " + response.data.message);

        return response.data.message ? response.data : { code: 1000, result: "Success" };
    } catch (error) {
        console.error(error);
        throw error;
    }
}




