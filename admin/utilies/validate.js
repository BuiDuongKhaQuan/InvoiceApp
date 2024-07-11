export const isValidateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+\s*$/.test(email) && email.lastIndexOf('.') !== email.length - 1;
};
export const isValidatePass = (pass) => pass.length > 3;
export const isValidateFullName = (name) => name.length > 0;
export const isValidatePhone = (number) => number.length == 10;
export const isValidateCode = (number) => number.length == 4;
export const isValidateOTP = (number) => number.length == 6;
