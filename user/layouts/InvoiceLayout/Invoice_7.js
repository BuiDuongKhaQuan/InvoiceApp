import { Asset } from 'expo-asset';

const imageUri1 = require('../../assets/images/header.png');
const imageUri2 = require('../../assets/images/botter.png');

const imageAsset1 = Asset.fromModule(imageUri1);
const imageAsset2 = Asset.fromModule(imageUri2);

// Chuyển đổi tài nguyên hình ảnh thành URI
const uri1 = imageAsset1.localUri || imageAsset1.uri;
const uri2 = imageAsset2.localUri || imageAsset2.uri;

const listProductHtml7 = (data) =>
    data
        .map(
            (product, index) =>
                `<tr>
                    <td style="font-weight: 700">${index + 1}</td>
                    <td style="font-weight: 700; padding-left: 30px;">${product.name}</td>
                    <td style="text-align: center" ">${product.price}</td>
                    <td style="padding-left: 30px;">${product.stock}</td>
                    <td style="text-align: center">${product.price * product.stock}</td>
                    
                </tr>`,
        )
        .join('');
export const html7 = (t, invoice, listProduct, company, customer, staff) => `
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
                flex-direction: row;

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
            .container_bottom_name_2 {
                margin-left: 66%;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="container_top" >
                <div class="container_header">
                <div style=" font-size:40px;font-width:bold; position: absolute;margin-top: 45px;">
                <p>${company.name}</p>
                </div>
                    <div style="text-align: right">
                    <img src="${uri1}" width="70%" ; />

                    </div>
                </div>
            </div>

            <div class="container_center">
                <div style="display: flex; flex-direction: row">
                    <div style="display: flex; flex-direction: column; flex: 2">
                        <p style="margin-right: 20; font-weight: bold; font-size: 20px">${t('common:invoiceTo')}:</p>
                        <p>${customer.name}</p>

                    </div>
                    <div>
                        <div style="display: flex; flex-direction: row; flex: 1">
                            <p style="margin-right: 20; font-weight: bold">${t('common:id6')}#:</p>
                            <p>${invoice.key}</p>
                        </div>
                        <div style="display: flex; flex-direction: row; flex: 1">
                            <p style="margin-right: 20; font-weight: bold">${t('common:date')}:</p>
                            <p>${invoice.createdAt}</p>
                        </div>
                    </div>
                </div>
                <div class="cashier" style="display: flex; flex-direction: row">
                    <p style="margin-right: 20; font-weight: bold">${t('common:addressInvoice')}:</p>
                    <p>${customer.address}</p>
                </div>
                <table class="table" style="width: 100%">
                    <tr style="background-color: #595959; color: aliceblue">
                        <div class="header_table">
                            <div class="header_table_1">
                                <th style="text-align: center; background-color: #ffcc00; color: #595959">${t(
                                    'common:item',
                                )}</th>
                                <th style="text-align: left; background-color: #ffcc00; color: #595959">${t(
                                    'common:description',
                                )}</th>
                            </div>
                            <th style="text-align: center">${t('common:price')}</th>
                            <th style="text-align: center">${t('common:qty3')}</th>
                            <th style="text-align: center">${t('common:totalAmount3')}</th>
                        </div>
                    </tr>
                    <tr>
                    ${listProductHtml7(listProduct)}

                    </tr>
                </table>
            </div>
            <div class="container_contents">
                <div class="container_bottom" style="justify-content: right">
                    <div style="display: flex; flex-direction: row; justify-content: left">
                        <p style="justify-content: right; font-weight: bold">${t('common:thankyou4')}</p>
                    </div>
                    <div style="display: flex; flex-direction: column; justify-content: left">
                        <p style="justify-content: left; font-weight: bold">${t('common:term')}</p>
                        <p>${staff.name}</p>
                    </div>
                    <div style="display: flex; flex-direction: column; justify-content: left">
                        <p style="justify-content: left; font-weight: bold; font-size: 18px">${t('common:pay6')}:</p>
                        <p>${customer.phone}</p>
                    </div>
                    <div style="display: flex; flex-direction: row; justify-content: right"></div>
                </div>
                <div class="container_bottom" style="justify-content: right">
                <div style="display: flex; flex-direction: row; justify-content: space-between  ">
                    <p style="justify-content: left; font-weight: bold; ">${t('common:subTotal')}:</p>
                    <p>${invoice.totalPrice}</p>
                </div>
                <div style="display: flex; flex-direction: row; justify-content: space-between">
                    <p style="justify-content: left; font-weight: bold; ">${t('common:tax')}:</p>
                    <p>${invoice.tax}%</p>
                </div>
                <div style="display: flex; flex-direction: row; justify-content: space-between;background-color: #b6b6b6;">
                    <p
                        style="
                        
                            justify-content: right;
                            font-weight: bold;
                            
                        "
                    >
                    ${t('common:totalAmount3')}:
                    </p>
                    <p>${invoice.totalPrice}</p>
                </div>

                <div style="display: flex; flex-direction: row; justify-content: right"></div>
            </div>
        </div>
            <div class="container_bottom_2" >
            <div class="container_bottom_name">
            </div>
        </div>
        
    <div class="container_bottom_name_2">
    ${t('common:authorised')}</div>
    <div style="text-align: center; color: blue">
            <img src="${invoice.image}" style="width: 90px ; height: 90px" />
                    </div>
    </div>
        </div>
        <div style="display: flex; flex-direction: row; justify-content: right"></div>
        <img style="position: fixed; bottom: 0; width: 100%" src="${uri2}" />
        </div>
    </body>
</html>
`;
