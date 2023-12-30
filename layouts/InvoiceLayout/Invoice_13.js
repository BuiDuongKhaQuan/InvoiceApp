const listProductHtml13 = (data) =>
    data
        .map(
            (product, index) =>
                `<tr >
        <td  style=" width: 10%; height: 30px; border-top: 2px solid black; border-right: 2px solid black; text-align: center;">${
            index + 1
        }</td>
        <td  style="width: 30%; border-bottom: 0px; border-top: 2px solid black; border-right: 2px solid black;text-align: center; " >${
            product.name
        }</td>
        <td  style="width: 10%; border-top: 2px solid black; border-right: 2px solid black; text-align: center; " >${
            product.stock
        }</td>
        <td  style=" width: 10%; height: 30px; border-top: 2px solid black; border-right: 2px solid black; text-align: center; ">${
            product.price
        }</td>
        <td style=" border-bottom: 2px solid black; border-top: 2px solid black;  text-align: center;  ">${
            product.price * product.stock
        }</td>
    </tr>`,
        )
        .join('');
export const html13 = (t, invoice, listProduct, company, customer) => `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width; initial-scale=1.0" />
        <title>Document</title>
        <style>
        .container {
            display: flex;
            flex-direction: column;
            background-color: rgb(236 ,208 ,106);
            margin-left: 10;
            margin-right: 10;
            border: 2px solid black;
            width: 617px;
            height: 754px;
            font-family: Verdana,  Tahoma, sans-serif;
        }
        .container_top {
            align-items: "center";
            flex: 1;
            text-align: center;
            justify-content: "center";
        }
        table, th, td {
            padding: 0!important;
            border-collapse: collapse;
        }

        th, td {
            padding: 10px;
        }

        </style>
    </head>
    <body>
    <div class="container">
        <div class="container_top_left">
        <div style="display: flex; justify-content: space-between;margin-left: 10px ; margin-top: 10px; ">
        <Text >${t('common:idInvoice')}: ${invoice.key}</Text>
        <div class="container_top_left">
        <div style=" display: flex; justify-content: space-between; margin-right: 10px; ">
        <Text >${t('common:date')}: ${invoice.createdAt}</Text>
        </div>
        </div>
        </div>
        </div>
        <div class="container_top">
            <div style="text-align: center ; font-weight:bold;
            font-size: 30px ; ">
            <Text >Tax Invoice Bill</Text>
            </div>
            <div style="text-align: center ;font-weight:bold;
            font-size: 40px; ;">
            <Text >${company.name}</Text>
            </div>
            <div style="text-align: center;font-size: 20px">
            <Text >${t('common:addressInvoice')} - ${company.address}</Text>
            </div>
            <div style="text-align: center;font-size: 20px">
                <Text >${t('common:phoneInvoice')}: ${company.phone}</Text>
            </div>
        </div>
        <div  style="margin-top: 50px;">
            <div class="center_row" style="margin-left: 10px;">
            <Text >${t('common:nameInvoice')}: ${customer.name}</Text>
            </div>
            <div class="center_row" style="margin-left: 10px;">
            <Text></Text>
            </div>
            <div class="center_row" style="display: flex; justify-content: space-between;margin-left: 10px">
            <Text  >${t('common:invoiceNo')}: ${invoice.key}</Text>

                <div style="margin-right: 50px;"><Text  >${t('common:date')}: ${invoice.createdAt}</Text></div>
            </div>
            <div class="center_row" style="display: flex; justify-content: space-between;margin-left: 10px">
                <Text >${t('common:mobile')}: ${customer.phone}</Text>

            <div style="margin-right: 60px;"> <Text  >Email: ${customer.email}</Text></div>

            </div>
                <table style="width: 100%;margin-top: 10px;">
                <tr>
                    <td style="text-align: center; width: 13%; height: 40px; border-top: 2px solid black; border-right: 2px solid black;border-bottom: 2px solid black; "><b>${t(
                        'common:slNo',
                    )}</b></td>
                    <td style="text-align: center; width: 30% ;border-top: 2px solid black; border-right: 2px solid black;border-bottom: 2px solid black; "><b>${t(
                        'common:particular',
                    )}</b></td>
                    <td style="text-align: center;width: 10%; border-top: 2px solid black; border-right: 2px solid black;border-bottom: 2px solid black; "><b>${t(
                        'common:qty',
                    )}</b></td>
                    <td style="text-align: center;width: 12%; border-top: 2px solid black; border-right: 2px solid black; "><b>${t(
                        'common:rate',
                    )}</b></td>
                    <td style="text-align: center;border-top: 2px solid black;   "><b>${t('common:amount')}</b></td>
                </tr>
                ${listProductHtml13(listProduct)}
                <tr>
                    <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black; border-right: 2px solid black; " rowspan="3"></td>
                    <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black; border-right: 2px solid black; " rowspan="3"></td>
                    <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black; border-right: 2px solid black;  " rowspan="3"></td>
                    <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black; border-top: 2px solid black;  border-right: 2px solid black;"><b>${t(
                        'common:subTotal',
                    )}</b></td>
                    <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black; border-top: 2px solid black;  ">0</td>

                </tr>
                <tr>
                <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black; border-right: 2px solid black;"><b>Tax</b></td>
                <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black; border-top: 2px solid black;">${
                    invoice.tax
                }</td>
            </tr>
            <tr>
                <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black;  border-right: 2px solid black; "><b>Total</b></td>
                <td style="text-align: center; width: 13%; height: 40px;  border-bottom: 2px solid black;  ">${
                    invoice.totalPrice
                }</td>
            </tr>

            </table>
            <div >
            <div  style="display: flex; margin-bottom: 20px; margin-left: 10px;">
                <br ><b>${t('common:inWords')}:</b> ${invoice.note}</Text>
                </div>
                <hr color="black"  />
            <div  style="display: flex; font-size: 20px; margin-left: 10px;">
                <br ><b>${t('common:thankyou1')}</b></Text>
            </div>
            <div style="text-align: end; font-size: 20px; margin-bottom: 15px;margin-right: 10px; ">
            <br ><b>${t('common:signature')}: _____________</b></Text>
            </div>
            </div>
        </div>
        </div>
    </body>
    </html>`;
