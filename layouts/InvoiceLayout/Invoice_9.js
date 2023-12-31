const listProductHtml9 = (data) =>
    data
        .map(
            (product, index) =>
                `<tr >
    <td  style=" width: 10%; height: 30px; text-align: center; ">${index + 1}</td>
    <td  style="width: 30%;  text-align: center; " >${product.name}</td>
    <td  style="width: 10%;text-align: center;   " >${product.stock}</td>
    <td  style=" width: 10%; height: 30px; text-align: center;  ">${product.price}</td>
    <td style=" text-align: center;  ">${product.price * product.stock}</td>
</tr>`,
        )
        .join('');
export const html9 = (t, invoice, listProduct, company, customer, staff) => `<!DOCTYPE html>
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
                height: 500px;
                width: 1000px;
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
                padding: 0 !important;
                border-top: 0px dashed;
                border-bottom: 0px dashed;
                border-collapse: collapse;
                text-align: justify;
            }
            th,
            td {
                padding: 10px;
            }
            hr {
                border-style: dashed;
                border-width: 0.5px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="container_top">
                <hr />
                <div style="text-align: center">
                    <Text><b>${company.name}</b></Text>
                </div>
                <hr />
                <div style="text-align: center">
                    <Text><b>${invoice.key}</b></Text>
                </div>s
                <hr />
            </div>
            <div style="margin-top: 50px; margin-left: 50px">
                <div class="center_row">
                    <Text>${customer.name}</Text>
                </div>
                <div class="center_row">
                    <Text>${customer.address}</Text>
                </div>
                <hr />

                <table style="width: 100%; margin-top: 10px">
                    <tr>
                        ${listProductHtml9(listProduct)}
                    </tr>
                </table>
                <hr />

                <div>
                    <div style="display: flex">
                        <Text style="margin-left: 160px">${t('common:totalAmount9')}</Text>
                        <Text style="margin-right: 160px; text-align: right; flex: 1">${invoice.totalPrice}</Text>
                    </div>
                    <hr />
                </div>
                <div style="width: 100%; text-align: center">
                    <img
                        id="barcode"
                        style="height: 90px"
                        src="${invoice.image}"                             
                        alt="Mã vạch"
                    />
                </div>
            </div>
        </div>
    </body>
</html>
`;
