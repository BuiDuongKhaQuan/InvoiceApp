import axios from 'axios';

export const instance = axios.create({
    // baseURL: 'http://bill-rest.ap-southeast-2.elasticbeanstalk.com/api',
    baseURL: 'http://192.168.1.106:8080/api',
    // 192.168.1.111 lấy ở click chuột phải vào wifi đang kết nối chọn properties
    // sau đó copy địa chỉ IPv4 address
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
        const response = await instance.post('/v1/auth/validateReset', {
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
//user
export const getUserByName = async (name) => {
    try {
        const response = await instance.get(`/v1/auth/users?name=${name}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getUserByCompanyName = async (companyName) => {
    try {
        const response = await instance.get(`/v1/auth/users?companyName=${companyName}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getUserByEmail = async (email) => {
    try {
        const response = await instance.get(`/v1/auth/users/${email}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const updateUser = async (formData) => {
    try {
        const response = await axios.patch(`/v1/auth/users`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
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
export const changePassword = async (email, oldPassword, password, retypePassword) => {
    try {
        const response = await instance.post('/v1/auth/changePassword', {
            email,
            oldPassword,
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
export const createInvoice = async (
    emailUser,
    phoneGuest,
    note,
    isPaid,
    listOrders,
    method,
    companyName,
    key,
    totalPrice,
    tax,
    address,
    image,
) => {
    let formData = new FormData();
    if (phoneGuest == '') phoneGuest = '0000000000';
    if (note == '') note = 'No note';
    if (method == '') method = 'cash';
    if (tax == '') tax = '0.0';
    if (totalPrice == '') totalPrice = '0';
    if (address == '') address = 'No address';

    formData.append('emailUser', emailUser);
    formData.append('phoneGuest', phoneGuest);
    formData.append('note', note);
    formData.append('isPaid', isPaid);
    formData.append('method', method);
    formData.append('companyName', companyName);
    formData.append('listOrders', listOrders);
    formData.append('key', key);
    formData.append('totalPrice', totalPrice);
    formData.append('tax', tax);
    formData.append('address', address);
    formData.append('image', image);
    console.log(formData);
    try {
        const response = await instance.post('/v1/invoices', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};
export const getInvoiceById = async (id) => {
    try {
        const response = await instance.get(`/v1/invoices/id/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getInvoiceByKey = async (key) => {
    try {
        const response = await instance.get(`/v1/invoices/${key}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getAllInvoice = async () => {
    try {
        const response = await instance.get('/v1/invoices');
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getInvoiceByCompany = async (companyName) => {
    try {
        const response = await instance.get(`/v1/invoices?companyName=${companyName}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
//products
export const products = async (name, status, price, listImageFile, companyName, description, type) => {
    try {
        const response = await instance.post('/v1/products', {
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
//product by id
export const getProductById = async (id) => {
    try {
        const response = await instance.get(`/v1/products/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getProductsByCompany = async (companyName) => {
    try {
        const response = await instance.get('/v1/products', { params: { companyName } });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const updateStatus = async (id, status) => {
    let formData = new FormData();
    formData.append('id', id);
    formData.append('status', status);
    try {
        const response = await instance.patch(`/v1/auth/users`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
// customer
export const getCustomerByCompany = async (companyName) => {
    try {
        const response = await instance.get('/v1/customers', { params: { companyName } });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const createCustomerByCompany = async (name, email, phone, companyName, status) => {
    try {
        const response = await instance.post('/v1/customers', {
            name,
            email,
            phone,
            companyName,
            status,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getNameCustomerByEmail = async (email) => {
    try {
        const response = await instance.get('/v1/customers', { params: { email } });
        return response.data;
    } catch (error) {
        throw error;
    }
};
