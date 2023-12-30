const listProductHtml10 = (data) =>
    data
        .map(
            (product, index) =>
                ` <tr>
    <td class="row1">${product.name}</td>
    <td class="row2">${product.stock}</td>
    <td class="row2">${product.price}</td>
    <td class="row3">${product.price * product.stock}</td>
</tr>`,
        )
        .join('');
export const html10 = (t, invoice, listProduct, company, customer, staff) => `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <style>
            .container {
                display: flex;
                flex-direction: column;
                width: 100%;
            }
            p {
                margin: 0;
                line-height: 1.5;
            }
            table,
            th,
            td {
                border: 1px solid black;
            }
            table {
                border-collapse: collapse;
            }
            .top {
                margin-bottom: 10px;
            }
            .title_date {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
            }
            .title {
                padding-right: 10px;
            }
            .from_to {
                display: flex;
                flex-direction: row;
                margin-bottom: 15px;
            }
            .from {
                flex: 1;
                display: flex;
                flex-direction: row;
                align-items: center;
            }
            .flex_row {
                display: flex;
                flex-direction: row;
                margin-right: 20px;
            }
            .row1 {
                width: 65%;
                text-align: left;
            }
            .row2 {
                text-align: left;
                width: 15%;
            }
            .row3 {
                text-align: left;
                width: 20%;
            }
            .bottom {
                display: flex;
                margin-top: 5px;
                flex-direction: column;
            }
            .payment {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                margin: 20px 0 20px 60px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="top">
                <div class="title_date">
                    <h1 class="title">Invoice</h1>
                    <div class="date">
                        <p class="text">${t('common:date')}: ${invoice.createdAt}- 0</p>
                        <p class="text">${t('common:id6')} #: ${invoice.key}</p>
                    </div>
                </div>
                <div class="from_to">
                    <div class="from">
                        <b>${t('common:from')}: </b>
                        <p class="text">${company.name}</p>
                    </div>
                    <div class="from">
                        <b>${t('common:to')}: </b>
                        <p class="text">${customer.name}</p>
                    </div>
                </div>
            </div>
            <div class="center">
                <table class="table">
                    <tr>
                        <th class="row1">${t('common:description')}</th>
                        <th class="row2">${t('common:hours')}</th>
                        <th class="row2">${t('common:rateHouse')}</th>
                        <th class="row3">${t('common:totalAmount3')}</th>
                    </tr>
                   ${listProductHtml10(listProduct)}
                </table>
            </div>
            <div class="bottom">
                <div class="payment">
                    <div class="payment_left"></div>
                    <div class="payment_right">
                        <p>${t('common:subTotal')}: ${invoice.totalPrice}</p>
                        <p>${t('common:tax')}: ${invoice.tax}</p>
                        <b>${t('common:due')}: ${invoice.totalPrice}</b>
                    </div>
                </div>
                <div style="text-align: center; color: blue">
            <img src="${invoice.image}" style="width: 90px ; height: 90px" />
                    </div>
            </div>
        </div>
    </body>
</html>
`;
