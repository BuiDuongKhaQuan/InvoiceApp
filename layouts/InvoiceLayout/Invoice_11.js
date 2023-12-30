const listProductHtml11 = (data) =>
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

export const html11 = (t, invoice, listProduct, company, customer, staff) => `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <style>
        body {
            }
            .container {
                display: flex;
                flex-direction: column;
            }
            p {
                margin: 0;
            }
            table,
            th,
            td {
                border: 1px solid black;
                width: 100%;
            }
            table {
                border-collapse: collapse;
            }
            .top {
                margin-bottom: 10px;
            }
            .title {
                text-align: right;
                padding-right: 10px;
            }
            .flex_row {
                display: flex;
                flex-direction: row;
                margin-right: 20px;
            }
            .row1 {
                width: 50%;
                text-align: left;
            }
            .row2 {
                text-align: center;
                width: 15%;
            }
            .row3 {
                text-align: right;
                width: 20%;
            }
            .bottom {
                display: flex;
                margin-top: 5px;
                flex-direction: row;
            }
        </style>
    </head>
    <body >
        <div class="container">
            <div class="top">
                <h1 class="title">${t('common:invoice')}</h1>
                <div class="date">
                    <p class="text">${t('common:date')}: ${invoice.createdAt}</p>
                    <p class="text">${t('common:id6')} #: ${invoice.key}</p>
                </div>
            </div>
            <div class="center">
                <table class="table">
                    <tr>
                        <th class="row1">${t('common:description')}</th>
                        <th class="row2">${t('common:qty5')}</th>
                        <th class="row2">${t('common:unitPrice')}</th>
                        <th class="row3">${t('common:totalAmount3')}</th>
                    </tr>
                    ${listProductHtml11(listProduct)}
                </table>
            </div>
            <div class="bottom">
                <div class="flex_row">
                    <p class="text">${t('common:payTerm')}: </p>
                    <p class="text">Pay</p>
                </div>
                <div class="flex_row">
                    <p class="text">${t('common:due')}:  ${invoice.totalPrice}</p>
                </div>
            </div>
            <div style="text-align: center; color: blue">
            <img src="${invoice.image}" style="width: 90px ; height: 90px" />
                    </div>
        </div>
    </body>
</html>
`;
