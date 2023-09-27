import axios from 'axios';
import mime from 'mime';

const instance = axios.create({
    baseURL: 'http://bill-rest.ap-southeast-2.elasticbeanstalk.com/api',
});

// Auth
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

//reset password
export const resetPassword = async (email, password, retypePassword) => {
    try {
        const response = await instance.post('/v1/auth/resetPassword', {
            email,
            password,
            retypePassword,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
//change password
export const changePassword = async (email, password, retypePassword) => {
    try {
        const response = await instance.post('/v1/auth/changePassword', {
            email,
            password,
            retypePassword,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
// companies
export const companies = async (name, logo, status) => {
    try {
        const response = await instance.post('/v1/companies', {
            name,
            logo,
            status,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getCompaniesById = async (id) => {
    try {
        const response = await instance.get(`/v1/companies/id/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

//invoice
export const invoices = async (emailUser, emailGuest, note, isPaid, listOrders, method, companyName, key, qrImage) => {
    try {
        const response = await instance.post('v1/invoices', {
            emailUser,
            emailGuest,
            note,
            isPaid,
            listOrders,
            method,
            companyName,
            key,
            qrImage,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
//products
export const products = async (name, status, price, listImageFile, companyName, description, type) => {
    try {
        const response = await instance.post('v1/products', {
            name,
            status,
            price,
            listImageFile,
            companyName,
            description,
            type,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
// update avatar
export const updateAvatar = async (userId, image) => {
    try {
        const formData = new FormData();
        formData.append('id', userId);
        formData.append(
            'avatar',
            JSON.stringify({
                uri: image,
                type: mime.getType(image.uri),
                name: image.split('/').pop(),
            }),
        );

        const response = await axios.patch('v1/auth/users', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'cache-control': 'no-cache',
            },
            processData: false,
            contentType: false,
            mimeType: 'multipart/form-data',
        });

        if (response.status === 201) {
            console.log('Cập nhật thành công');
            return response.data; // Trả về dữ liệu sau khi cập nhật thành công (nếu có).
        } else {
            throw new Error('Cập nhật ảnh đại diện không thành công.');
        }
    } catch (error) {
        throw error; // Xử lý lỗi nếu có.
    }
};
