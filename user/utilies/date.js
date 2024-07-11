export const getDateNow = (currentDate) =>
    `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
export const getHouseNow = (currentDate) =>
    `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
