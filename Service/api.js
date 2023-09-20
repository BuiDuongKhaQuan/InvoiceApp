import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://ec2-3-27-112-252.ap-southeast-2.compute.amazonaws.com:8080/api/v1/', // Thay thế URL bằng URL của API thực tế
});

export const login = async (email, password) => {
    try {
        const response = await instance.post('auth/login', { email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const register = async (name, email, password, gender, phone, address, role = 'user', companyKey) => {
    try {
        const response = await instance.post('auth/register', {
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
        const response = await instance.post('auth/forgotPassword', {
            email,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const validateReset = async (email, otp) => {
    try {
        const response = await instance.post('auth/validateRegister', {
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
        const response = await instance.post('auth/validateRegister', {
            email,
            otp,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
