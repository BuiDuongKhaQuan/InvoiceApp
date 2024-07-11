import { Asset } from 'expo-asset';

const imageUri3 = require('../../assets/images/header_seven.png');
const imageUri4 = require('../../assets/images/bottom.png');

const imageAsset3 = Asset.fromModule(imageUri3);
const imageAsset4 = Asset.fromModule(imageUri4);

// Chuyển đổi tài nguyên hình ảnh thành URI
const uri3 = imageAsset3.localUri || imageAsset3.uri;
const uri4 = imageAsset4.localUri || imageAsset4.uri;
const listProductHtml8 = (data) =>
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
export const html8 = (t, invoice, listProduct, company, customer, staff) => `
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
                background-color: '#ffcc00';
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
                background-color: rgb(255, 255, 255);
                height: 100%;
            }
            .container_header_company_name {
                font-size: 20px;
                text-align: left;
                position: absolute;
                margin-top: 90px;
                margin-left: 10px;
                color: white;
            }
            .container_bottom_2 {
                background-color: rgb(255, 255, 255);
                height: 2%;

            }
            .container_bottom_name {
                margin-left: 65%;
                margin-right: 15%;
                background-color: rgb(0, 0, 0);
                color: white;
                height:2px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="container_top" style="margin-top: 40px">
                <div class="container_header">
                    <div class="container_header_company_name">
                        <p>${company.name}</p>
                    </div >
                    <div style="text-align: center; ">
                        <img src="${uri3}" width="100%" ; />
                    </div>
              </div>
            </div>

            <div class="container_center">
                <div style="display: flex; flex-direction: row">
                    <div style="display: flex; flex-direction: row; flex: 2">
                        <p style="margin-right: 20; font-weight: bold">${t('common:id6')}#: ${invoice.key}</p>
                    </div>
                    <div>
                        <div style="display: flex; flex-direction: row; flex: 1">
                            <p style="margin-right: 20; font-weight: bold">${t('common:invoiceTo')}:</p>
                            <p>${customer.name}</p>
                        </div>
                        <div class="cashier" style="display: flex; flex-direction: row">
                        <p style="margin-right: 20; font-weight: bold">${t('common:addressInvoice')}:</p>
                        <p>${customer.address}</p>
                    </div>
                    </div>
                </div>
                
                <div style="display: flex; flex-direction: row; flex: 1">
                <p style="margin-right: 20; font-weight: bold">${t('common:date')}:</p>
                <p> ${invoice.createdAt}</p>
            </div>
                <table class="table" style="width: 100%">
                    <tr style="background-color: rgb(255 87 87); color: aliceblue">
                        <div class="header_table">
                            <div class="header_table_1">
                                <th style="text-align: center">${t('common:item')}</th>
                                <th style="text-align: left">${t('common:description')}</th>
                            </div>
                            <th style="text-align: center">${t('common:price')}</th>
                            <th style="text-align: center">${t('common:qty5')}</th>
                            <th style="text-align: center">${t('common:totalAmount3')}</th>
                        </div>
                    </tr>
                    <tr style="text-align: center">
                    ${listProductHtml8(listProduct)}
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
                        <p style="justify-content: left; font-weight: bold; color: rgb(255 87 87)">${t(
                            'common:subTotal',
                        )}:</p>
                        <p>${invoice.totalPrice}</p>
                    </div>
                    <div style="display: flex; flex-direction: row; justify-content: space-between">
                        <p style="justify-content: left; font-weight: bold; color: rgb(255 87 87)">${t(
                            'common:tax',
                        )}:</p>
                        <p>${invoice.tax}%</p>
                    </div>
                    <div style="display: flex; flex-direction: row; justify-content: space-between;background-color: #b6b6b6;">
                        <p
                            style="
                            color: rgb(255 87 87);
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
            <div class="container_bottom_2">
                <div class="container_bottom_name"></div>
            </div>
            <div style="text-align: center; color: blue">
            <img src="${invoice.image}" style="width: 90px ; height: 90px" />
                    </div>
            <div ">
            <img style="position: fixed; bottom: 0; width: 100%" src="${uri4}" />
            </div>
        </div>
    </body>
</html>

`;
