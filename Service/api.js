import axios from 'axios';
import { Alert } from 'react-native';

const instance = axios.create({
    baseURL: 'http://bill-rest.ap-southeast-2.elasticbeanstalk.com/api',
});

export const login = async (email, password) => {
    try {
        const response = await instance.post('/v1/auth/login', { email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const register = async (name, email, password, gender, phone, address, role, companyKey) => {
    try {
        const response = await instance.post('/v1/auth/register', {
            name,
            email,
            password,
            gender,
            phone,
            address,
            role,
            companyKey,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const forgotPassword = async (email) => {
    try {
        const response = await instance.post('/v1/auth/forgotPassword', {
            email,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const validateReset = async (email, otp) => {
    try {
        const response = await instance.post('/v1/auth/validateRegister', {
            email,
            otp,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const validateRegister = async (email, otp) => {
    try {
        const response = await instance.post('/v1/auth/validateRegister', {
            email,
            otp,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
