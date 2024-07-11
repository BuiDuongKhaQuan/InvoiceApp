const listProductHtml4 = (data) =>
    data
        .map(
            (product, index) =>
                ` <tr>
            <td
                style="
                    width: 15%;
                    border-top: 1px solid black;
                    border-right: 1px solid black;
                    text-align: center;
                    border-left: 1px solid black;
                "
            >
            ${index + 1}
            </td>
            <td
                style="
                    width: 15%;
                    border-bottom: 0px;
                    border-top: 1px solid black;
                    border-right: 1px solid black;
                    text-align: center;
                "
            >
            ${product.name}
            </td>

            <td style="width: 10%; border: 1px solid black; text-align: center">${product.stock}</td>
            <td
                style="
                    width: 10%;
                    height: 30px;
                    border: 1px solid black;

                    text-align: center;
                "
            >
            ${product.price}
            </td>
            <td
                style="
                    border-bottom: 1px solid black;
                    border-right: 1px solid black;
                    border-top: 1px solid black;
                    text-align: center;
                "
            >
            ${product.price * product.stock}
            </td>
        </tr>
            `,
        )
        .join('');
export const html4 = (t, invoice, listProduct, company, customer) => `<!DOCTYPE html>
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
                margin-left: 100px;
                font-family: Arial, Helvetica, sans-serif;
                width: 580px;
                height: 754px;
            }
            .container_top {
                align-items: 'center';
                text-align: center;
                justify-content: 'center';
            }

            table,
            th,
            td {
                border-top: 1px solid;
            }
            table {
                border-collapse: collapse;
            }
            table tr:nth-child(odd) {
            }
            table tr:nth-child(even) {
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="container_top">
                <div style="display: flex; justify-content: space-between">
                    <div style="font-size: 20px">
                        <Text><b>${company.name}</b></Text>
                    </div>
                    <div style="color: hsl(0deg 0% 75.69%); font-size: 30px">
                        <Text>INVOICE</Text>
                    </div>
                </div>
            
                <div style="display: flex; justify-content: space-between">
                    <Text style="margin-top: 2px; margin-bottom: 2px">${t('common:streetAddress')}: ${
    company.address
}</Text>
                    <Text style="margin-top: 2px; margin-bottom: 2px";text-transform: uppercase><b>${t(
                        'common:date',
                    )}:</b></Text>
                    <Text style="margin-top: 2px; margin-bottom: 2px">${invoice.createdAt}</Text>
                </div>
                <div style="display: flex; justify-content: space-between">
                    <Text style="margin-top: 2px; margin-bottom: 2px">${t('common:cityzip')} 0</Text>
                    <Text style="margin-top: 2px; margin-bottom: 2px"><b>${t('common:id4')}</b></Text>
                    <Text style="margin-top: 2px; margin-bottom: 2px">${invoice.key}</Text>
                </div>
                <div style="display: flex; justify-content: space-between">
                    <Text style="margin-top: 2px; margin-bottom: 2px">${t('common:phonefax')} ${company.phone}</Text>
                    <Text style="margin-top: 2px; margin-bottom: 2px"><b>${t('common:for')}:</b></Text>
                    <Text style="margin-top: 2px; margin-bottom: 2px; font-style: italic">${company.name}</Text>
                </div>
               
            </div>

            <div style="margin-top: 5px; margin-bottom: 5px">
                <Text><b>${t('common:billTo')}:</b></Text>
            </div>
            <div style="margin-top: 5px; margin-bottom: 5px">
                <Text>${t('common:name')}: ${customer.name}</Text>
            </div>
            <div style="margin-top: 5px; margin-bottom: 5px">
                <Text>${t('common:companyName')}:</Text>
            </div>
            <div style="margin-top: 5px; margin-bottom: 5px">
                <Text>${t('common:streetAddress')}: ${customer.address}</Text>
            </div>
            <div style="margin-top: 5px; margin-bottom: 5px">
                <Text>${t('common:cityzip')}</Text>
            </div>
            <div style="margin-top: 5px; margin-bottom: 5px">
                <Text>Phone: ${customer.phone}</Text>
            </div>
            <table>
                <tr>
                    <td
                        colspan="3"
                        style="
                            text-align: center;
                            width: 50%;
                            height: 30px;
                            background-color: hsl(0deg 0% 94.9%);
                            border-left: 1px solid;
                            border-right: 1px solid;
                        "
                    >
                        <b style="text-transform: uppercase">${t('common:description')}</b>
                    </td>
                    <td
                        colspan="2"
                        style="
                            border-right: 1px solid;
                            text-align: center;
                            width: 40%;
                            height: 30px;
                            background-color: hsl(0deg 0% 94.9%);
                        "
                    >
                        <b style="text-transform: uppercase">${t('common:amount')}</b>
                    </td>
                </tr>
                ${listProductHtml4(listProduct)}

                <tr>
                    <td colspan="4" style="width: 100px; height: 30px; text-align: center; border-right: 1px solid";>
                        <b style="text-transform: uppercase"> ${t('common:totalAmount3')}</b>
                    </td>
                    <td
                        style="
                            width: 100px;
                            height: 30px;
                            background-color: hsl(0deg 0% 94.9%);
                            border-right: 1px solid;
                            border-bottom: 1px solid;
                            text-align: center;
                        "
                    >
                        ${invoice.totalPrice}
                    </td>
                </tr>
            </table>
            <div style="text-align: center; color: blue">
            <img src="${invoice.image}" style="width: 90px ; height: 90px" />
                    </div>
            <div style="margin-top: 10px; font-size: 13px">
                <text>${t('common:makePayable')} ${company.name} </text>
            </div>
            <div style="margin-top: 20px; font-size: 13px; margin-bottom: 20px">
                <text> ${t('common:question')} ${customer.name}, ${customer.phone}, ${customer.email} </text>
            </div>
            <div style="text-align: center; font-size: 13px">
                <text><b>${t('common:thankyou4')} </b></text>
            </div>
        </div>
    </body>
</html>
`;
