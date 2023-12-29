const listProductHtml11 = (data) =>
    data
        .map(
            (product, index) =>
                `<tr >
        <td  style=" width: 10%; color: blue;  text-align: center; height: 30px; border-top: 2px solid blue; border-right: 2px solid blue; border-bottom: 2px solid blue; ">${
            index + 1
        }</td>
        <td  style="width: 30%; color: blue;text-align: center; border-bottom: 2px solid blue; border-top: 2px solid blue; border-right: 2px solid blue; " >${
            product.name
        }</td>
        <td  style="width: 10%; color: blue; text-align: center;border-top: 2px solid blue; border-right: 2px solid blue; border-bottom: 2px solid blue; " >${
            product.stock
        }</td>
        <td  style=" width: 10%; color: blue; text-align: center;height: 30px; border-top: 2px solid blue; border-right: 2px solid blue; border-bottom: 2px solid blue; ">${
            product.price
        }</td>
        <td style="color: blue;text-align: center; border-bottom: 2px solid blue; border-top: 2px solid blue;    ">${
            product.price * product.stock
        }</td>
    </tr>`,
        )
        .join('');
export const html11 = (invoice, listProduct, t, company, customer) => `<!DOCTYPE html>
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
                    width: 491px;
                    height: 800px;
                    font-family: Arial, Helvetica, sans-serif;
                }
                .container_top {
                    align-items: 'center';
                    text-align: center;
                    justify-content: 'center';
                }
                table,
                th,
                td {
                    padding: 0 !important;
                    border-collapse: collapse;
                }

                th,
                td {
                    padding: 10px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="container_top">
                    <div
                        style="
                            text-align: center;
                            margin-top: 90px;
                            font-weight: bold;
                            font-size: 30px;
                            color: blue;
                        "
                    >
                        <Text>${company.name}</Text>
                    </div>
                    <div style="text-align: center; font-size: 20px; font-weight: bold; color: blue">
                        <Text>${t('common:addressInvoice')} ${company.address}</Text>
                    </div>
                    <div style="text-align: center; font-size: 20px; font-weight: bold; color: blue">
                        <Text>${t('common:phoneInvoice2')} :${company.phone}</Text>
                    </div>
                    <hr size="2px" ; color="blue" />
                </div>

                <div style="display: flex; justify-content: space-between; color: blue">
                    <div style="margin-left: 10px">
                        <Text>${t('common:slNo2')}: ${invoice.key}</Text>
                    </div>
                    <div>
                        <Text><b>${t('common:nameInvoice')}</b></Text>
                    </div>
                    <div style="margin-right: 10px">
                        <Text>${t('common:date')}: ${invoice.createdAt} </Text>
                    </div>
                </div>
                <div style="color: rgb(0 0 215); margin-top: 10px; margin-left: 10px; margin-right: 10px">
                    <Text>${t('common:receive')}: ${customer.name}</Text>
                    <hr size="2px" ; color="blue" />
                </div>
                <div style="color: rgb(0 0 215); margin-top: 8px; margin-left: 14px; margin-right: 10px">
                    <hr size="2px" ; color="blue" />
                </div>
                <table style="width: 100%; height: 300px">
                    <tr>
                        <td
                            style="
                                color: rgb(0 0 215);
                                text-align: center;
                                width: 3%;
                                height: 5px;
                                border-top: 2px solid rgb(0 0 215);
                                border-right: 2px solid rgb(0 0 215);
                            "
                        >
                            <b>${t('common:slN2')}</b>
                        </td>
                        <td
                            style="
                                color: rgb(0 0 215);
                                text-align: center;
                                width: 58%;
                                height: 5px;

                                border-top: 2px solid rgb(0 0 215);
                                border-right: 2px solid blue;
                            "
                        >
                            <b>${t('common:particular')}</b>
                        </td>
                        <td
                            style="
                                color: blue;
                                text-align: center;
                                width: 10%;
                                height: 5px;

                                border-top: 2px solid blue;
                                border-right: 2px solid blue;
                            "
                        >
                            <b>${t('common:qty')}</b>
                        </td>
                        <td
                            style="
                                height: 5px;
                                color: blue;
                                text-align: center;
                                width: 18%;
                                border-top: 2px solid blue;
                            "
                        >
                            <b>${t('common:amount')} </b>

                            <b>Rs. </b>
                        </td>
                        <td
                            style="height: 5px; color: blue; text-align: center; border-top: 2px solid blue"
                        >
                            <b>Ps.</b>
                        </td>
                    </tr>
                    ${listProductHtml11(listProduct)}
                </table>
                <div style="text-align: end; color: blue">
                <text><b>${t('common:for')} ${company.name}</b></text>
                </div>
                <div style="text-align: center; color: blue">
                <img src="${invoice.image}" style="width: 90px ; height: 90px" />
                </div>
            </div>
        </body>
    </html>
    `;
