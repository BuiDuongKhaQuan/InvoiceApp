export const subTotal = (data) =>
    data.reduce((total, product) => {
        return total + product.totalPrice;
    }, 0);
export const totalBillPrice = (tax, subTotal) => subTotal + (subTotal * tax) / 100;
