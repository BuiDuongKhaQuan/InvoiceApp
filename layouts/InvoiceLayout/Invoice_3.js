const listProductHtml3 = (data) =>
data
    .map(
        (product, index) =>
            ` <tr>
            <td style="font-weight: 700">${index + 1}</td>
            <td style="font-weight: 700; padding-left: 30px;">${product.name}</td>
            <tr>
                <td></td>
                <td style="padding-left: 30px;">${product.stock}</td>
                <td>${product.price}</td>
                <td style="padding-left: 6px">0.0</td>
                <td></td>
                <td>${product.price * product.stock}</td>
            </tr>
        </tr>`,
    )
    .join('');
export const html3 = (invoice, listProduct, t, company, customer) => `
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
        align-items: "center";
        flex: 1;
        text-align: center;
        justify-content: "center";
    }
    
    table, th, td {
    border-collapse: collapse;
    }

    p {
        margin: 3px;
    }
    </style>
</head>
<body>
    <div class="container">
    <div class="container_top" style="margin-top: 40px;">
        <div style="text-align: center">
        <p>${company.name}</p>
        </div>
        <div style="text-align: center">
        <p>${company.address}</p>
        </div>
        <div style="text-align: center">
        <p>${company.phone}</p>
        </div>
        <div style="text-align: center">
        <p>hong@gmail.com</p>
        </div>
        <div style="text-align: center; font-weight: 600">
        <p>${company.email}</p>
        </div>
        <div style="text-align: center; ">
        <img src="https://vienthonglaw.vn/wp-content/uploads/2021/12/Ma-Vach-1.jpg" alt="" style="height: 30; width: 50%;"/>
        </div>
        
    </div>
    <div class="container_center">
        <div style="display: flex; flex-direction: row">
        <p style="flex: 1">${t('common:date')}: ${invoice.createdAt}</p>
        <p style="flex: 1"></p>
        </div>
        <div class="cashier" style="display: flex; flex-direction: row">
        <p style="margin-right: 20">${t('common:cashier')}: </p>
        </p>${staff.name}<p>
        </div>
        <div class="customer" style="display: flex; flex-direction: row">
        <p style="margin-right: 20">${t('common:custommer')}:</p>
        <p>${customer.name}</p>
        </div>
        <div style="display: flex; flex-direction: row">
        <div style="display: flex; flex-direction: row; flex: 2">
            <p style="margin-right: 20">${t('common:mobile')}:</p>
            <p>${customer.phone}</p>
        </div>
        <div style="display: flex; flex-direction: row; flex: 1">
            <p style="margin-right: 20">${t('common:scores')}:</p>
            <p>0.0</p>
        </div>
        </div>
        <table style="width:100%">
        <tr style="border-bottom: 1px dashed  black;">
            <th>#</th>
            <th>${t('common:product')}</th> 
            <th>${t('common:qty3')}</th>
            <th>${t('common:price')}</th>
            <th>${t('common:discount')}</th>
            <th>${t('common:amount3')}</th>
        </tr>
        
        ${listProductHtml3(listProduct)}
        
        </table>
        <p style="border-bottom: 1px dashed  black;"></p>
    </div>
    <div class="container_bottom" style="justify-content: right; ;">
        <div style="display: flex; flex-direction: row; justify-content: right;">
        <p style="justify-content: right; margin-right: 35%; font-weight: bold;">${t(
            'common:totalPriceSell',
        )}:</p>
        <p>0</p>
        </div>
        <div style="display: flex; flex-direction: row; justify-content: right;">
        <p style="justify-content: right; margin-right: 42%; font-weight: bold;">${t(
            'common:totalDiscount',
        )}:</p>
        <p>${invoice.tax}</p>
        </div>
        <div style="display: flex; flex-direction: row; justify-content: right;">
        <p style="justify-content: right; margin-right: 35%; font-weight: bold; font-size: 18px;">${t(
            'common:totalAmount3',
        )}:</p>
        <p>${invoice.totalPrice}</p>
        </div>
        <p style="text-align: center;"></p>
        <p style="border-bottom: 1px dashed  black;"></p>
        <div style="display: flex; flex-direction: row; justify-content: right;">
        <p style="justify-content: right; margin-right: 40%; font-weight: bold; ">${t('common:typePay')}:</p>
        <p>${t('common:cash')}</p>
        </div>
        <div style="display: flex; flex-direction: row; justify-content: right;">
        <p style="justify-content: right; margin-right: 35%; font-weight: bold; ">${t(
            'common:receiveMoney',
        )}:</p>
        <p>${invoice.totalPrice}</p>
        </div>
        <div style="display: flex; flex-direction: row; justify-content: right;">
        <p style="justify-content: right; margin-right: 47%; font-weight: bold; ">${t('common:giveBack')}: </p>
        <p>0</p>
        </div>
        <p style="border-bottom: 1px dashed  black;"></p>
        <p style="text-align: center;">${t('common:designed')} ${company.name}</p>
    </div>
    </div>
</body>
</html>
`