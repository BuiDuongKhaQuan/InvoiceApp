export const isValidateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+\s*$/.test(email) && email.lastIndexOf('.') !== email.length - 1;
};
export const isValidatePass = (pass) => pass.length >= 6 && pass.length <= 8;
export const isValidateRePass = (pass, repass) => pass === repass;
export const isValidateFullName = (name) => name.length > 0;
export const isValidatePhone = (number) => number.length == 10;
export const isValidateOTP = (number) => number.length == 6;
