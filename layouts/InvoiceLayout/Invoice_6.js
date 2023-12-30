const listProductHtml6 = (data) =>
data
.map(
    (product , index) =>
        ` <tr>
                <td style="font-weight: 700">${index +1}</td>
                <td style="font-weight: 700; padding-left: 30px;">${product.name}</td>
                    <td style="text-align: center" ">${product.price}</td>
                    <td style="padding-left: 30px;">${product.stock}</td>
                    <td style="text-align: center">${product.price * product.stock}</td>
                
            </tr>`,
)
.join('');
export const html6 = (invoice, listProduct, t, company, customer) => `
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
            .header_table_1 {
                background-color: '##ffcc00';
            }
            .container_header_contents {
                background-color: rgb(251, 251, 251);
                width: 20%;
                margin-left: 60%;
                margin-right: 15%;
                font-size: 40px;
            }
            .container_ table,
            th,
            td {
                border-collapse: collapse;
            }
            p {
                margin: 3px;
            }
            .container_contents {
                display: flex;
                justify-content: space-between;

            }
            .container_header {
                background-color: rgb(255, 191, 0);
                height: 100%;
            }
            .container_header_name {
                margin-left: 65%;
                margin-right: 15%;
                background-color: white;
                font-weight: bold;
                font-size: 25px;
            }
            
            .container_bottom_2 {
                background-color: rgb(255, 191, 0);
            }
            .container_bottom_name {
                margin-top:5%;
                margin-left: 65%;
                margin-right: 15%;
                background-color: white;
                color: white;
                height:2px;
            }
            .container_bottom_name_2 {
                margin-left: 66%;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="container_top" style="margin-top: 40px">
                <div style="text-align: left">
                    <p>${company.name}</p>
                </div>
                
                </div>
                <div class="container_header">
                    <div class="container_header_name">Invoice</div>
                </div>
                
            </div>

            <div class="container_center">
                <div style="display: flex; flex-direction: row">
                    <div style="display: flex; flex-direction: column; flex: 2">
                        <p style="margin-right: 20; font-weight: bold">${t('common:invoiceTo')}:</p>
                        <p>${customer.name}</p>

                    </div>
                    <div>
                        <div style="display: flex; flex-direction: row; flex: 1">
                            <p style="margin-right: 20; font-weight: bold;text-transform:capitalize">${t(
                                'common:id6',
                            )}#:</p>
                            <p>${invoice.key}</p>
                        </div>
                        <div style="display: flex; flex-direction: row; flex: 1">
                            <p style="margin-right: 20; font-weight: bold">${t('common:date')}:</p>
                            <p>${invoice.createdAt}</p>
                        </div>
                    </div>
                </div>
                <div class="cashier" style="display: flex; flex-direction: row">
                    <p style="margin-right: 20; font-weight: bold">${t(
                        'common:addressInvoice',
                    )}:</p>
                    <p>${company.address}s</p>
                </div>
                <table class="table" style="width: 100%">
                    <tr style="background-color: #595959; color: aliceblue">
                        <div class="header_table">
                            <div class="header_table_1">
                                <th style="text-align: center">${t('common:item')}</th>
                                <th style="text-align: left">${t('common:description')}</th>
                            </div>
                            <th style="text-align: center">${t('common:price5')}</th>
                            <th style="text-align: center">${t('common:qty3')}</th>
                            <th style="text-align: center">${t('common:totalAmount3')}</th>
                        </div>
                    </tr>
                    <tr>
                    ${listProductHtml6(listProductsSelect)}
                    </tr>
                </table>
            </div>
            <div class="container_contents">
                <div class="container_bottom" style="justify-content: right">
                    <div style="display: flex; flex-direction: row; justify-content: left">
                        <p style="justify-content: right; font-weight: bold">${t(
                            'common:thankyou5',
                        )}!</p>
                    </div>
                    <div style="display: flex; flex-direction: row; justify-content: left">
                        <p style="justify-content: left; font-weight: bold">${t('common:term')}</p>
                        <p>trandz</p>
                    </div>
                    <div style="display: flex; flex-direction: row; justify-content: left">
                        <p style="justify-content: left; font-weight: bold; font-size:17>${t(
                            'common:pay6',
                        )}:</p>
                        <p>${customer.name}</p>
                    </div>
                    <div style="display: flex; flex-direction: row; justify-content: right"></div>
                </div>
                <div class="container_bottom" style="justify-content: right">
                    <div style="display: flex; flex-direction: row; justify-content: left">
                        <p style="justify-content: left; font-weight: bold">${t(
                            'common:subTotal',
                        )}:</p>
                        <p>${invoice.totalPrice}</p>
                    </div>
                    <div style="display: flex; 
                    flex-direction: row;                                 justify-content: space-between; 
                    justify-content: space-between; 
                    ">
                        <p style="justify-content: left; font-weight: bold; font-size: 18px">${t(
                            'common:tax',
                        )}:</p>
                        <p>${invoice.tax}%</p>
                    </div>
                    <div style="display: flex; 
                    flex-direction: row; 
                    justify-content: space-between; 
                    background-color: rgb(255, 191, 0);">
                      <p >${t('common:totalAmount3')}:</p>
                        <p >${invoice.totalPrice}</p>
                    </div>
                    <div style="display: flex; flex-direction: row; justify-content: right"></div>
                </div>
                
            </div>
            <div class="container_bottom_2" >
                <div class="container_bottom_name">
                </div>
            </div>
        </div>
        <div class="container_bottom_name_2">
        ${t('common:authorised')}</div>
    </div>
    <div style = "font-weight: bold;">
    ${customer.phone}  |  ${customer.address}  |  Website</div>
</div>
    </body>
</html>
`;