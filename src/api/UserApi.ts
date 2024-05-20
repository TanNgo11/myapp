import axios, { AxiosError } from "axios";
import { User, UserRequest } from "../models/User";
import { ResponseData1 } from "../models/Product";
import privateApi from './privateApi';
import { Auth } from "../models/Auth";
import publicApi from "./publicApi";



interface BackendError {
    code: number;
    message: string;
}

export const createNewUser = async (user: UserRequest): Promise<ResponseData1<User>> => {
    try {
        const response = await privateApi.post<ResponseData1<User>>('/api/v1/users', user);

        return response.data;

    } catch (error) {
        const axiosError = error as AxiosError<BackendError>;
        if (axiosError.response && axiosError.response.data) {
            const backendError = axiosError.response.data;
            console.error(`Error Code: ${backendError.code}, Message: ${backendError.message}`);

            throw new Error(backendError.message);
        } else {
            console.error('An unexpected error occurred:', error);
            throw new Error('An unexpected error occurred, please try again later.');
        }
    }
}

export const authenticate = async (username: string, password: string): Promise<ResponseData1<Auth>> => {
    try {
        const response = await publicApi.post('/api/v1/auth/token', { username, password });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<BackendError>;
        if (axiosError.response && axiosError.response.data) {
            const backendError = axiosError.response.data;
            console.error(`Error Code: ${backendError.code}, Message: ${backendError.message}`);
            throw new Error(backendError.message);
        } else {
            console.error('An unexpected error occurred:', error);
            throw new Error('An unexpected error occurred, please try again later.');
        }
    }
}


export const fetchUserInfo = async (accessToken: string) => {

    try {
        const response = await publicApi.get('/api/v1/users/myInfo', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw error;
    }


};


