export const isValidateEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};
export const isValidatePass = (pass) => pass.length > 3;
export const isValidateFullName = (name) => name.length > 0;
export const isValidatePhone = (number) => number.length == 10;
export const isValidateCode = (number) => number.length == 4;
