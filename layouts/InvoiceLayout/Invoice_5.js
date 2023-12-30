const listProductHtml5 = (data) =>
    data
        .map(
            (product, index) =>
                ` <tr>
            <td style="font-weight: 700">${index + 1}</td>
            <td style="font-weight: 700; padding-left: 30px;">${product.name}</td>
            <td style="text-align: center" ">${product.price}</td>
            <td style="padding-left: 30px;">${product.stock}</td>
            <td style="text-align: center">${product.price * product.stock}</td>
        
    </tr>`,
        )
        .join('');
export const html5 = (t, invoice, listProduct, company, customer, staff) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width; initial-scale=1.0" />
        <title>Document</title>
        <style>
            .container {
                display: flex;
                flex-direction: column;
                background-color: white;
                margin-left: 10;
                margin-right: 10;
            }
            .container_top {
                align-items: 'center';
                flex: 1;
                text-align: center;
                justify-content: 'center';
            }

            table,
            th,
            td {
                border-collapse: collapse;
            }
            p {
                margin: 3px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="container_top" style="margin-top: 40px">
                <div style="text-align: right;">
                    <p style="font-weight: 600;">${company.name}</p>
                </div>
                <div style="text-align: right">
                    <p>${company.address}</p>
                </div>
                <div style="text-align: right">
                    <p>${company.phone}</p>
                </div>
                <div style="text-align: right">
                    <p>${company.email}</p>
                </div>
                <div style="text-align: left; font-weight: 600">
                    <p>${t('common:invoice')}</p>
                </div>
            </div>
            <div class="container_center">
                <div style="display: flex; flex-direction: row">
                    <div style="display: flex; flex-direction: row; flex: 2">
                        <p style="margin-right: 20;font-weight: 600">${t('common:invoiceNo')}:</p>
                        <p>${invoice.key}</p>
                    </div>
                    
                    <div style="display: flex; flex-direction: row; flex: 1">
                        <p style="margin-right: 20;font-weight: 600">${t('common:date')}:</p>
                        <p>${invoice.createdAt}</p>
                    </div>
                </div>
                <div class="cashier" style="display: flex; flex-direction: row">
                    <p style="margin-right: 20;font-weight: 600">${t('common:billTo')}:</p>
                    <div style="flexDirection: 'column'">
                    <p>${customer.name}</p>
                    <p>${customer.address}</p>
                    </div>
                </div>
                
                <table style="width: 100%">
                    <tr style="border-bottom: 1px dashed black">
                        <th style="text-align: center">${t('common:item')}</th>
                        <th style="text-align: left">${t('common:description')}</th>
                        <th style="text-align: center">${t('common:price5')}</th>
                        <th style="text-align: center">${t('common:qty5')}</th>
                        <th style="text-align: center">${t('common:amount3')}</th>
                    </tr>
                    <tr>
                    ${listProductHtml5(listProduct)}

                    </tr>
                </table>
                <p style="border-bottom: 1px dashed black"></p>
            </div>
            <div class="container_bottom" style="justify-content: right">
                <div style="display: flex; flex-direction: row; justify-content: right">
                    <p style="justify-content: left; font-weight: bold">${t('common:totalAmount3')}:</p>
                    <p>${invoice.totalPrice}</p>
                </div>
                <div style="display: flex; flex-direction: row; justify-content: left">
                <p style="justify-content: left; font-weight: bold">${t('common:thankyou5')}</p>
            </div>
                <div style="display: flex; flex-direction: row; justify-content: left">
                    <p style="justify-content: left; font-weight: bold">${t('common:bankName')}:</p>
                    <p>${staff.name}</p>
                    </div>
                <div style="display: flex; flex-direction: row; justify-content: left">
                    <p style="justify-content: left; font-weight: bold">${t('common:bankAccount')}:</p>
                    <p>${customer.phone}</p>
                    </div>
                <p style="border-bottom: 1px dashed black"></p>
                <div style="display: flex; flex-direction: row; justify-content: right"></div>
                <div style="text-align: center ">
            <img src="${invoice.image}" style="width: 90px ; height: 90px" />
            </div>
            </div>
        </div>
    </body>
</html>  
`;
