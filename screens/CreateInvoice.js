import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import Header from '../components/SettingItem/header';
import Button from '../components/Button';
import { fontSizeDefault } from '../constant/fontSize';
import { dateNow, houseNow } from '../utilies/date';
import * as Print from 'expo-print';
import { useUserContext } from './UserContext';
import { Asset } from 'expo-asset';
import { getAllInvoice, getProductById, getProductsByCompany } from '../Service/api';

export default function CreateInvoice({ route, navigation }) {
    const { state } = useUserContext();
    const currentDate = dateNow;
    const currentHour = houseNow;
    const [contactName, setContactName] = useState();
    const [contactPhone, setContactPhone] = useState();
    const [contactEmail, setContactEmail] = useState();
    const [contactAddress, setContactAddress] = useState();
    const [note, setNote] = useState();
    const [products, setProducts] = useState([]);
    const [tax, setTax] = useState();
    const [totalBillPrice, setTotalBillPrice] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [ck, setCk] = useState();
    const [customer, setCustomer] = useState('');
    const [phone, setPhone] = useState('');

    const imageUri = require('../assets/images/header_seven.png');
    const imageUri2 = require('../assets/images/bottom.png');
    const invoice = route.params?.data;
    const imageAsset = Asset.fromModule(imageUri);
    const imageAsset2 = Asset.fromModule(imageUri2);
    const uri = imageAsset.localUri || imageAsset.uri;
    const uri2 = imageAsset.localUri || imageAsset2.uri;
    const [contactCityCode, setContactCityCode] = useState();
    const [nameCompany, setNameCompany] = useState([]);

    const [selectedPrinter, setSelectedPrinter] = useState();
    const [newIDBill, setNewIDBill] = useState(''); // Sử dụng useState để lưu mã hóa đơn mới

    useEffect(() => {
        const handerId = async () => {
            try {
                const response = await getAllInvoice();
                let newIDBill;
                if (response.length > 0) {
                    // Tìm mã hóa đơn lớn nhất trong danh sách
                    const maxBill = response[response.length - 1];
                    if (!isNaN(maxBill.maHoaDon)) {
                        // Nếu là số hợp lệ, tạo mã hóa đơn mới bằng cách tăng nó lên 1
                        newIDBill = (parseInt(maxBill.id) + 1).toString();
                    }
                    // Tạo mã hóa đơn mới bằng cách tăng mã hóa đơn lớn nhất thêm 1
                    newIDBill = (parseInt(maxBill.id) + 1).toString();
                }

                setNewIDBill(`${currentDate}_${newIDBill}`);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách hóa đơn:', error);
            }
        };

        // Gọi hàm để tính toán và lưu mã hóa đơn mới vào state
        handerId();
    }, []);
    const print = async () => {
        if (html !== null) {
            await Print.printAsync({
                html,
                printerUrl: selectedPrinter?.url,
            });
        } else {
            Alert.alert('Error!!', 'Please provide complete information');
        }
    };

    const printToFile = async () => {
        if (html !== null) {
            const { uri } = await Print.printToFileAsync({ html });
            console.log('File has been saved to:', uri);
            await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
        } else {
            Alert.alert('Error!!', 'Please provide complete information');
        }
    };

    const selectPrinter = async () => {
        const printer = await Print.selectPrinterAsync();
        setSelectedPrinter(printer);
    };
    useEffect(() => {
        const getNameCompaniesById = async () => {
            try {
                const response = await getCompaniesById(state.company.id);
                setNameCompany(response);
                // console.log(nameCompany.name);
            } catch (error) {}
        };
        getNameCompaniesById();
    });
    function numberToVietnameseWords(number) {
        const units = ['', ' nghìn', 'trăm', 'triệu', 'tỷ', 'nghìn tỷ', 'triệu tỷ', 'tỷ tỷ'];
        const digits = ['', 'một ', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];

        const groupToWords = (group) => {
            const hundred = Math.floor(group / 100);
            const ten = Math.floor((group % 100) / 10);
            const one = group % 10;

            let result = '';

            if (hundred > 0) {
                result += digits[hundred] + ' trăm ';
            }

            if (ten > 1) {
                result += digits[ten] + ' mươi ';
                if (one > 0) {
                    result += digits[one];
                }
            } else if (ten === 1) {
                result += ' mười ';
                if (one > 0) {
                    result += digits[one];
                }
            } else {
                if (one > 0) {
                    result += digits[one];
                }
            }

            return result;
        };

        const numberString = String(number);

        let result = '';
        let groupIndex = 0;
        let group = '';

        for (let i = numberString.length - 1; i >= 0; i--) {
            group = numberString[i] + group;

            if (group.length === 3 || i === 0) {
                const groupNumber = parseInt(group);
                if (groupNumber > 0) {
                    result = groupToWords(groupNumber) + units[groupIndex] + ' ' + result;
                }

                group = '';
                groupIndex++;
            }
        }
        return result.trim();
    }
    const listProductHtml1 = () =>
        products
            .map(
                (product, index) =>
                    `<tr>
                <td
                    style="
                        width: 15%;
                        border-top: 1px solid black;
                        border-right: 1px solid black;
                        text-align: center;
                        border-left: 1px solid black;
                    "
                >
                ${index}
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

                <td style="width: 10%; border: 1px solid black; text-align: center">${product.quantity}</td>
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
                ${product.price}
                </td>
            </tr>
                <tr >
            <td  style=" width: 10%; height: 30px; border-top: 2px solid black; border-right: 2px solid black; text-align: center;">${index}</td>
            <td  style="width: 30%; border-bottom: 0px; border-top: 2px solid black; border-right: 2px solid black;text-align: center; " >${product.name}</td>
            <td  style="width: 10%; border-top: 2px solid black; border-right: 2px solid black; text-align: center; " >${product.quantity}</td>
            <td  style=" width: 10%; height: 30px; border-top: 2px solid black; border-right: 2px solid black; text-align: center; ">${product.price}</td>
            <td style=" border-bottom: 2px solid black; border-top: 2px solid black;  text-align: center;  ">${product.price}</td>
        </tr>`,
            )
            .join('');
    const html1 = `<!DOCTYPE html>
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
    <Text >GST No:</Text>
    <div class="container_top_left">
      <div style=" display: flex; justify-content: space-between; margin-right: 10px; ">
      <Text >Date: ${dateNow}</Text>
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
          <Text >Company Name Pvt.Ltd</Text>
        </div>
        <div style="text-align: center;font-size: 20px">
          <Text >Address - Street Name, City Name</Text>
        </div>
        <div style="text-align: center;font-size: 20px">
            <Text >Ph No: 99999 99999</Text>
          </div>      
      </div>
      <div  style="margin-top: 50px;">
        <div class="center_row" style="margin-left: 10px;">
          <Text >Name: ${contactName}</Text>
        </div>
        <div class="center_row" style="margin-left: 10px;">
          <Text></Text>
        </div>
        <div class="center_row" style="display: flex; justify-content: space-between;margin-left: 10px">
          <Text  >Invoice No:</Text>

              <div style="margin-right: 50px;"><Text  >Date: ${dateNow}</Text></div>
        </div>
        <div class="center_row" style="display: flex; justify-content: space-between;margin-left: 10px">
            <Text >Mobile: ${contactPhone}</Text>
            
           <div style="margin-right: 60px;"> <Text  >Email: ${contactEmail}</Text></div>

          </div>
            <table style="width: 100%;margin-top: 10px;">
              <tr>
                  <td style="text-align: center; width: 13%; height: 40px; border-top: 2px solid black; border-right: 2px solid black;border-bottom: 2px solid black; "><b>Sl.No.</b></td>
                  <td style="text-align: center; width: 30% ;border-top: 2px solid black; border-right: 2px solid black;border-bottom: 2px solid black; "><b>Particulars</b></td>
                  <td style="text-align: center;width: 10%; border-top: 2px solid black; border-right: 2px solid black;border-bottom: 2px solid black; "><b>Qty</b></td>
                  <td style="text-align: center;width: 12%; border-top: 2px solid black; border-right: 2px solid black; "><b>Rate</b></td>
                  <td style="text-align: center;border-top: 2px solid black;   "><b>Amount</b></td>
              </tr>
              ${listProductHtml1()}
              <tr>
                <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black; border-right: 2px solid black; " rowspan="3"></td>
                <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black; border-right: 2px solid black; " rowspan="3"></td>
                <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black; border-right: 2px solid black;  " rowspan="3"></td>
                <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black; border-top: 2px solid black;  border-right: 2px solid black;"><b>Sub Total</b></td>
                <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black; border-top: 2px solid black;  ">${subTotal}</td>

            </tr>
            <tr>
              <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black; border-right: 2px solid black;  "><b>Tax</b></td>
              <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black; border-top: 2px solid black;   ">${tax}</td>
          </tr>
          <tr>
            <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black;  border-right: 2px solid black; "><b>Total</b></td>
            <td style="text-align: center; width: 13%; height: 40px;  border-bottom: 2px solid black;  ">${totalBillPrice}</td>
        </tr>
         
            
          </table>
        <div >
          <div  style="display: flex; margin-bottom: 20px; margin-left: 10px;">
            <br ><b>In Words:</b> ${note}</Text>
          
              
            </div>
            <hr color="black"  />
          <div  style="display: flex; font-size: 20px; margin-left: 10px;">
            <br ><b>Thank You and Visit Again.</b></Text>
            
          </div>
        <div style="text-align: end; font-size: 20px; margin-bottom: 15px;margin-right: 10px; ">  
          <br ><b>Signature: _____________</b></Text>
        </div>

        </div>
       
      </div>
    </div>
  </body>
</html>`;

    const listProductHtml2 = () =>
        products
            .map(
                (product, index) =>
                    `<tr >
        <td  style=" width: 10%; color: blue;  text-align: center; height: 30px; border-top: 2px solid blue; border-right: 2px solid blue; border-bottom: 2px solid blue; ">${index}</td>
        <td  style="width: 30%; color: blue;text-align: center; border-bottom: 2px solid blue; border-top: 2px solid blue; border-right: 2px solid blue; " >${product.name}</td>
        <td  style="width: 10%; color: blue; text-align: center;border-top: 2px solid blue; border-right: 2px solid blue; border-bottom: 2px solid blue; " >${product.quantity}</td>
        <td  style=" width: 10%; color: blue; text-align: center;height: 30px; border-top: 2px solid blue; border-right: 2px solid blue; border-bottom: 2px solid blue; ">${product.price}</td>
        <td style="color: blue;text-align: center; border-bottom: 2px solid blue; border-top: 2px solid blue;    ">${product.totalPrice}</td>
    </tr>`,
            )
            .join('');

    const html2 = `<!DOCTYPE html>
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
                <Text>YOUR COMPANY NAME</Text>
            </div>
            <div style="text-align: center; font-size: 20px; font-weight: bold; color: blue">
                <Text>Address .....................................................</Text>
            </div>
            <div style="text-align: center; font-size: 20px; font-weight: bold; color: blue">
                <Text>Ph :00000000000000</Text>
            </div>
            <hr size="2px" ; color="blue" />
        </div>

        <div style="display: flex; justify-content: space-between; color: blue">
            <div style="margin-left: 10px">
                <Text>Sl.No.</Text>
            </div>
            <div>
                <Text><b>CASH BILL</b></Text>
            </div>
            <div style="margin-right: 10px">
                <Text>Date: ${dateNow} </Text>
            </div>
        </div>
        <div style="color: rgb(0 0 215); margin-top: 10px; margin-left: 10px; margin-right: 10px">
            <Text>To.M/s ${contactName}</Text>
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
                    <b>S.No.</b>
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
                    <b>Particulars</b>
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
                    <b>Qty</b>
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
                    <b>Amount </b>

                    <b>Rs. </b>
                </td>
                <td
                    style="height: 5px; color: blue; text-align: center; border-top: 2px solid blue"
                >
                    <b>Ps.</b>
                </td>
            </tr>
            ${listProductHtml2()}

            
        </table>
        <div style="text-align: end; color: blue">
            <text><b>For You Company Name</b></text>
        </div>
    </div>
</body>
</html>

`;

    const listProductHtml3 = () =>
        products
            .map(
                (product) =>
                    ` <tr>
            <td style="font-weight: 700">${product.id}</td>
            <td style="font-weight: 700; padding-left: 30px;">${product.name}</td>
            <tr>
                <td></td>
                <td style="padding-left: 30px;">${product.quantity}</td>
                <td>${product.price}</td>
                <td style="padding-left: 6px">${product.ck}</td>
                <td></td>
                <td>${product.totalPrice}</td>
            </tr>
        </tr>`,
            )
            .join('');
    const html3 = `
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
  <p>${nameCompany.name}</p>
</div>
<div style="text-align: center">
<p>${nameCompany.address}</p>
</div>
<div style="text-align: center">
<p>${nameCompany.phone}</p>
</div>
<div style="text-align: center">
  <p>hong@gmail.com</p>
</div>
<div style="text-align: center; font-weight: 600">
<p>${nameCompany.email}</p>
</div>
<div style="text-align: center; ">
  <img src="https://vienthonglaw.vn/wp-content/uploads/2021/12/Ma-Vach-1.jpg" alt="" style="height: 30; width: 50%;"/>
</div>

</div>
<div class="container_center">
<div style="display: flex; flex-direction: row">
  <p style="flex: 1">Ngày: ${currentDate}</p>
  <p style="flex: 1">${currentHour}</p>
</div>
<div class="cashier" style="display: flex; flex-direction: row">
  <p style="margin-right: 20">Thu ngân: </p>
  ${route != null ? <p></p> : <p>${state.user.name}</p>}
</div>
<div class="customer" style="display: flex; flex-direction: row">
  <p style="margin-right: 20">Khách hàng:</p>
  <p>${customer}</p>
</div>
<div style="display: flex; flex-direction: row">
  <div style="display: flex; flex-direction: row; flex: 2">
    <p style="margin-right: 20">Điện thoại:</p>
    <p>${phone}</p>
  </div>
  <div style="display: flex; flex-direction: row; flex: 1">
    <p style="margin-right: 20">Điểm:</p>
    <p>0.0</p>
  </div>
</div>
<table style="width:100%">
  <tr style="border-bottom: 1px dashed  black;">
    <th>#</th>
    <th>Tên hàng</th> 
    <th>SL</th>
    <th>D.G</th>
    <th>CK</th>
    <th>T.Tiền</th>
  </tr>

  ${listProductHtml3()}
  
</table>
<p style="border-bottom: 1px dashed  black;"></p>
</div>
<div class="container_bottom" style="justify-content: right; ;">
<div style="display: flex; flex-direction: row; justify-content: right;">
  <p style="justify-content: right; margin-right: 35%; font-weight: bold;">Tổng tiền theo giá bán:</p>
  <p>${totalBillPrice}</p>
</div>
<div style="display: flex; flex-direction: row; justify-content: right;">
<p style="justify-content: right; margin-right: 42%; font-weight: bold;">Tổng chiếc khấu:</p>
  <p>${ck}</p>
</div>
<div style="display: flex; flex-direction: row; justify-content: right;">
  <p style="justify-content: right; margin-right: 35%; font-weight: bold; font-size: 18px;">Tổng thanh toán:</p>
  <p>${totalBillPrice}</p>
</div>
<p style="text-align: center;">${numberToVietnameseWords(totalBillPrice)}</p>
<p style="border-bottom: 1px dashed  black;"></p>
<div style="display: flex; flex-direction: row; justify-content: right;">
  <p style="justify-content: right; margin-right: 40%; font-weight: bold; ">Kiểu T.Toán:</p>
  <p>TM</p>
</div>
<div style="display: flex; flex-direction: row; justify-content: right;">
  <p style="justify-content: right; margin-right: 35%; font-weight: bold; ">Nhận tiền của khách:</p>
  <p>${totalBillPrice}</p>
</div>
<div style="display: flex; flex-direction: row; justify-content: right;">
  <p style="justify-content: right; margin-right: 47%; font-weight: bold; ">Trả lại: </p>

  <p>0</p>
</div>
<p style="border-bottom: 1px dashed  black;"></p>
<p style="text-align: center;">Design by....</p>
</div>
</div>
</body>
</html>

`;
    const listProductHtml4 = () =>
        products
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
            ${index}
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

            <td style="width: 10%; border: 1px solid black; text-align: center">${product.quantity}</td>
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
            ${product.totalPrice}
            </td>
        </tr>
            `,
            )
            .join('');

    const html4 = `<!DOCTYPE html>
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
                    <Text><b>Your Company Name</b></Text>
                </div>
                <div style="color: hsl(0deg 0% 75.69%); font-size: 30px">
                    <Text>INVOICE</Text>
                </div>
            </div>
            <div style="text-align: left; font-style: italic; margin-bottom: 30px">
                <Text>Your Company Slogan</Text>
            </div>

            <div style="display: flex; justify-content: space-between">
                <Text style="margin-top: 2px; margin-bottom: 2px">Street Address</Text>
                <Text style="margin-top: 2px; margin-bottom: 2px"><b>DATE:</b></Text>
                <Text style="margin-top: 2px; margin-bottom: 2px">${dateNow}</Text>
            </div>
            <div style="display: flex; justify-content: space-between">
                <Text style="margin-top: 2px; margin-bottom: 2px">City, ST ZIP Code ${contactPhone}</Text>
                <Text style="margin-top: 2px; margin-bottom: 2px"><b>INVOICE#</b></Text>
                <Text style="margin-top: 2px; margin-bottom: 2px">100</Text>
            </div>
            <div style="display: flex; justify-content: space-between">
                <Text style="margin-top: 2px; margin-bottom: 2px">Phone [number] Fax [number] ${contactPhone}</Text>
                <Text style="margin-top: 2px; margin-bottom: 2px"><b>FOR:</b></Text>
                <Text style="margin-top: 2px; margin-bottom: 2px; font-style: italic"> Project or service</Text>
            </div>
            <div style="display: flex; justify-content: end">
                <Text style="font-style: italic"> description </Text>
            </div>
        </div>

        <div style="margin-top: 5px; margin-bottom: 5px">
            <Text><b>Bill To:</b></Text>
        </div>
        <div style="margin-top: 5px; margin-bottom: 5px">
            <Text>Name ${contactName}</Text>
        </div>
        <div style="margin-top: 5px; margin-bottom: 5px">
            <Text>Company Name</Text>
        </div>
        <div style="margin-top: 5px; margin-bottom: 5px">
            <Text>Street Address</Text>
        </div>
        <div style="margin-top: 5px; margin-bottom: 5px">
            <Text>City, ST ZIP Code ${contactCityCode}</Text>
        </div>
        <div style="margin-top: 5px; margin-bottom: 5px">
            <Text>Phone ${contactPhone}</Text>
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
                    <b>DESCRIPTION</b>
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
                    <b>AMOUNT</b>
                </td>
            </tr>
            ${listProductHtml4()}

            <tr>
                <td colspan="4" style="width: 100px; height: 30px; text-align: center; border-right: 1px solid">
                    <b> TOTAL</b>
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
                    ${subTotal}
                </td>
            </tr>
        </table>
        <div style="margin-top: 10px; font-size: 13px">
            <text>Make all checks payable to Your Company Name </text>
        </div>
        <div style="margin-top: 20px; font-size: 13px; margin-bottom: 20px">
            <text> If you have any questions concerning this invoice, Contact Name, Phone Numer, E-mail </text>
        </div>
        <div style="text-align: center; font-size: 13px">
            <text><b>THANK YOU FOR YOUR BUSINESS! </b></text>
        </div>
    </div>
</body>
</html>
`;
    const listProductHtml5 = () =>
        products
            .map(
                (product) =>
                    ` <tr>
            <td style="font-weight: 700">${product.id}</td>
            <td style="font-weight: 700; padding-left: 30px;">${product.name}</td>
                <td style="text-align: center" ">${product.price}</td>
                <td style="padding-left: 30px;">${product.quantity}</td>
                <td style="text-align: center">${product.totalPrice}</td>
            
        </tr>`,
            )
            .join('');
    const html5 = `
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
                        <p style="font-weight: 600;">${nameCompany.name}</p>
                    </div>
                    <div style="text-align: right">
                        <p>${nameCompany.address}</p>
                    </div>
                    <div style="text-align: right">
                        <p>${nameCompany.phone}</p>
                    </div>
                    <div style="text-align: right">
                        <p>${nameCompany.email}</p>
                    </div>
                    <div style="text-align: left; font-weight: 600">
                        <p>HÓA ĐƠN THANH TOÁN</p>
                    </div>
                </div>
                <div class="container_center">
                    <div style="display: flex; flex-direction: row">
                        <div style="display: flex; flex-direction: row; flex: 2">
                            <p style="margin-right: 20;font-weight: 600">Invoice No:</p>
                            <p>1412</p>
                        </div>
                        
                        <div style="display: flex; flex-direction: row; flex: 1">
                            <p style="margin-right: 20;font-weight: 600">Date:</p>
                            <p>${currentDate}</p>
                        </div>
                    </div>
                    <div class="cashier" style="display: flex; flex-direction: row">
                        <p style="margin-right: 20;font-weight: 600">Bill to:</p>
                        <div style="flexDirection: 'column'">
                        <p>${state.user.name}</p>
                        <p>${nameCompany.address}</p>
                        </div>
                    </div>
                    
                    <table style="width: 100%">
                        <tr style="border-bottom: 1px dashed black">
                            <th style="text-align: center">Item</th>
                            <th style="text-align: left">Description</th>
                            <th style="text-align: center">Price</th>
                            <th style="text-align: center">total</th>
                        </tr>
                        <tr>
                        ${listProductHtml5()}

                        </tr>
                    </table>
                    <p style="border-bottom: 1px dashed black"></p>
                </div>
                <div class="container_bottom" style="justify-content: right">
                    <div style="display: flex; flex-direction: row; justify-content: right">
                        <p style="justify-content: left; font-weight: bold">Total:</p>
                        <p>${subTotal}</p>
                    </div>
                    <div style="display: flex; flex-direction: row; justify-content: left">
                    <p style="justify-content: left; font-weight: bold">Thank you</p>
                </div>
                    <div style="display: flex; flex-direction: row; justify-content: left">
                        <p style="justify-content: left; font-weight: bold">Bank name:</p>
                        <p>${customer}</p>
                        </div>
                    <div style="display: flex; flex-direction: row; justify-content: left">
                        <p style="justify-content: left; font-weight: bold; font-size: 18px">Bank acount:</p>
                        <p>${phone}</p>
                        </div>
                    <p style="border-bottom: 1px dashed black"></p>
                    <div style="display: flex; flex-direction: row; justify-content: right"></div>
                </div>
            </div>
        </body>
    </html>
    
    
    `;
    const listProductHtml6 = () =>
        products
            .map(
                (product) =>
                    ` <tr>
                <td style="font-weight: 700">${product.id}</td>
                <td style="font-weight: 700; padding-left: 30px;">${product.name}</td>
                    <td style="text-align: center" ">${product.price}</td>
                    <td style="padding-left: 30px;">${product.quantity}</td>
                    <td style="text-align: center">${product.totalPrice}</td>
                
            </tr>`,
            )
            .join('');
    const html6 = `
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
                            <p>${nameCompany.name}</p>
                        </div>
                        
                        </div>
                        <div class="container_header">
                            <div class="container_header_name">Invoice</div>
                        </div>
                        
                    </div>
        
                    <div class="container_center">
                        <div style="display: flex; flex-direction: row">
                            <div style="display: flex; flex-direction: column; flex: 2">
                                <p style="margin-right: 20; font-weight: bold">Invoice To:</p>
                                <p>${state.user.name}</p>

                            </div>
                            <div>
                                <div style="display: flex; flex-direction: row; flex: 1">
                                    <p style="margin-right: 20; font-weight: bold">Invoice#:</p>
                                    <p>12024</p>
                                </div>
                                <div style="display: flex; flex-direction: row; flex: 1">
                                    <p style="margin-right: 20; font-weight: bold">Date:</p>
                                    <p>${currentDate}</p>
                                </div>
                            </div>
                        </div>
                        <div class="cashier" style="display: flex; flex-direction: row">
                            <p style="margin-right: 20; font-weight: bold">Address:</p>
                            <p>${nameCompany.address}s</p>
                        </div>
                        <table class="table" style="width: 100%">
                            <tr style="background-color: #595959; color: aliceblue">
                                <div class="header_table">
                                    <div class="header_table_1">
                                        <th style="text-align: center">Item</th>
                                        <th style="text-align: left">Description</th>
                                    </div>
                                    <th style="text-align: center">Price</th>
                                    <th style="text-align: center">Sl</th>
                                    <th style="text-align: center">total</th>
                                </div>
                            </tr>
                            <tr>
                            ${listProductHtml6()}
                            </tr>
                        </table>
                    </div>
                    <div class="container_contents">
                        <div class="container_bottom" style="justify-content: right">
                            <div style="display: flex; flex-direction: row; justify-content: left">
                                <p style="justify-content: right; font-weight: bold">Thank you</p>
                            </div>
                            <div style="display: flex; flex-direction: row; justify-content: left">
                                <p style="justify-content: left; font-weight: bold">Terms and conditions</p>
                                <p>trandz</p>
                            </div>
                            <div style="display: flex; flex-direction: row; justify-content: left">
                                <p style="justify-content: left; font-weight: bold; font-size: 18px">Payment Infor:</p>
                                <p>0826037777</p>
                            </div>
                            <div style="display: flex; flex-direction: row; justify-content: right"></div>
                        </div>
                        <div class="container_bottom" style="justify-content: right">
                            <div style="display: flex; flex-direction: row; justify-content: left">
                                <p style="justify-content: left; font-weight: bold">Sub total:</p>
                                <p>${subTotal}</p>
                            </div>
                            <div style="display: flex; 
                            flex-direction: row;                                 justify-content: space-between; 
                            justify-content: space-between; 
                            ">
                                <p style="justify-content: left; font-weight: bold; font-size: 18px">Tax:</p>
                                <p>${tax}%</p>
                            </div>
                            <div style="display: flex; 
                            flex-direction: row; 
                            justify-content: space-between; 
                            background-color: rgb(255, 191, 0);">
                              <p >Total:</p>
                                <p >${totalBillPrice}</p>
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
                Authorised Sign</div>
            </div>
            <div style = "font-weight: bold;">
            ${nameCompany.phone}  |  ${nameCompany.address}  |  Website</div>
        </div>
            </body>
        </html>
        
        
        `;
    const listProductHtml7 = () =>
        products
            .map(
                (product) =>
                    ` <tr>
                    <td style="font-weight: 700">${product.id}</td>
                    <td style="font-weight: 700; padding-left: 30px;">${product.name}</td>
                        <td style="text-align: center" ">${product.price}</td>
                        <td style="padding-left: 30px;">${product.quantity}</td>
                        <td style="text-align: center">${product.totalPrice}</td>
                    
                </tr>`,
            )
            .join('');
    const html7 = `
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
                            <p>${nameCompany.name}</p>
                            </div>
                                <div style="text-align: right">
                                <img src="${uri}" width="70%" ; />
            
                                </div>
                            </div>
                        </div>
            
                        <div class="container_center">
                            <div style="display: flex; flex-direction: row">
                                <div style="display: flex; flex-direction: column; flex: 2">
                                    <p style="margin-right: 20; font-weight: bold; font-size: 20px">Invoice To:</p>
                                    <p>${state.user.name}</p>

                                </div>
                                <div>
                                    <div style="display: flex; flex-direction: row; flex: 1">
                                        <p style="margin-right: 20; font-weight: bold">Invoice#:</p>
                                        <p>12024</p>
                                    </div>
                                    <div style="display: flex; flex-direction: row; flex: 1">
                                        <p style="margin-right: 20; font-weight: bold">Date:</p>
                                        <p>${currentDate}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="cashier" style="display: flex; flex-direction: row">
                                <p style="margin-right: 20; font-weight: bold">Trandz:</p>
                                <p>${nameCompany.address}</p>
                            </div>
                            <table class="table" style="width: 100%">
                                <tr style="background-color: #595959; color: aliceblue">
                                    <div class="header_table">
                                        <div class="header_table_1">
                                            <th style="text-align: center; background-color: #ffcc00; color: #595959">Item</th>
                                            <th style="text-align: left; background-color: #ffcc00; color: #595959">Description</th>
                                        </div>
                                        <th style="text-align: center">Price</th>
                                        <th style="text-align: center">Sl</th>
                                        <th style="text-align: center">total</th>
                                    </div>
                                </tr>
                                <tr>
                                ${listProductHtml7()}

                                </tr>
                            </table>
                        </div>
                        <div class="container_contents">
                            <div class="container_bottom" style="justify-content: right">
                                <div style="display: flex; flex-direction: row; justify-content: left">
                                    <p style="justify-content: right; font-weight: bold">Thank you for your business</p>
                                </div>
                                <div style="display: flex; flex-direction: column; justify-content: left">
                                    <p style="justify-content: left; font-weight: bold">Terms and conditions</p>
                                    <p>${customer}</p>
                                </div>
                                <div style="display: flex; flex-direction: column; justify-content: left">
                                    <p style="justify-content: left; font-weight: bold; font-size: 18px">Payment Infor:</p>
                                    <p>${phone}</p>
                                </div>
                                <div style="display: flex; flex-direction: row; justify-content: right"></div>
                            </div>
                            <div class="container_bottom" style="justify-content: right">
                            <div style="display: flex; flex-direction: row; justify-content: space-between  ">
                                <p style="justify-content: left; font-weight: bold; ">Sub total:</p>
                                <p>${subTotal}</p>
                            </div>
                            <div style="display: flex; flex-direction: row; justify-content: space-between">
                                <p style="justify-content: left; font-weight: bold; ">Tax:</p>
                                <p>${tax}%</p>
                            </div>
                            <div style="display: flex; flex-direction: row; justify-content: space-between;background-color: #b6b6b6;">
                                <p
                                    style="
                                    
                                        justify-content: right;
                                        font-weight: bold;
                                        
                                    "
                                >
                                    Total:
                                </p>
                                <p>${totalBillPrice}</p>
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
                Authorised Sign</div>
                    </div>
                    <div style="display: flex; flex-direction: row; justify-content: right"></div>
                    <img style="position: fixed; bottom: 0; width: 100%" src="${uri2}" />
                    </div>
                </body>
            </html>
            `;
    const listProductHtml8 = () =>
        products
            .map(
                (product) =>
                    ` <tr>
                        <td style="font-weight: 700">${product.id}</td>
                        <td style="font-weight: 700; padding-left: 30px;">${product.name}</td>
                            <td style="text-align: center" ">${product.price}</td>
                            <td style="padding-left: 30px;">${product.quantity}</td>
                            <td style="text-align: center">${product.totalPrice}</td>
                        
                    </tr>`,
            )
            .join('');
    const html8 = `
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
                                <p>${nameCompany.name}</p>
                            </div >
                            <div style="text-align: center; ">
                                <img src="${uri}" width="100%" ; />
                            </div>
                      </div>
                    </div>
        
                    <div class="container_center">
                        <div style="display: flex; flex-direction: row">
                            <div style="display: flex; flex-direction: row; flex: 2">
                                <p style="margin-right: 20; font-weight: bold">Invoice#:</p>
                            </div>
                            <div>
                                <div style="display: flex; flex-direction: row; flex: 1">
                                    <p style="margin-right: 20; font-weight: bold">Invoice To:</p>
                                    <p>${state.user.name}</p>
                                </div>
                                <div class="cashier" style="display: flex; flex-direction: row">
                                <p style="margin-right: 20; font-weight: bold">Addrss:</p>
                                <p>${nameCompany.address}</p>
                            </div>
                            </div>
                        </div>
                        
                        <div style="display: flex; flex-direction: row; flex: 1">
                        <p style="margin-right: 20; font-weight: bold">Date:</p>
                        <p> ${currentDate}</p>
                    </div>
                        <table class="table" style="width: 100%">
                            <tr style="background-color: rgb(255 87 87); color: aliceblue">
                                <div class="header_table">
                                    <div class="header_table_1">
                                        <th style="text-align: center">Item</th>
                                        <th style="text-align: left">Description</th>
                                    </div>
                                    <th style="text-align: center">Price</th>
                                    <th style="text-align: center">Quantity</th>
                                    <th style="text-align: center">total</th>
                                </div>
                            </tr>
                            <tr style="text-align: center">
                            ${listProductHtml8()}
                            </tr>
                        </table>
                    </div>
                    <div class="container_contents">
                        <div class="container_bottom" style="justify-content: right">
                            <div style="display: flex; flex-direction: row; justify-content: left">
                                <p style="justify-content: right; font-weight: bold">Thank you for your business</p>
                            </div>
                            <div style="display: flex; flex-direction: column; justify-content: left">
                                <p style="justify-content: left; font-weight: bold">Terms and conditions</p>
                                <p>${customer}</p>
                            </div>
                            <div style="display: flex; flex-direction: column; justify-content: left">
                                <p style="justify-content: left; font-weight: bold; font-size: 18px">Payment Infor:</p>
                                <p>${phone}</p>
                            </div>
                            <div style="display: flex; flex-direction: row; justify-content: right"></div>
                        </div>
                        <div class="container_bottom" style="justify-content: right">
                            <div style="display: flex; flex-direction: row; justify-content: space-between  ">
                                <p style="justify-content: left; font-weight: bold; color: rgb(255 87 87)">Sub total:</p>
                                <p>${subTotal}</p>
                            </div>
                            <div style="display: flex; flex-direction: row; justify-content: space-between">
                                <p style="justify-content: left; font-weight: bold; color: rgb(255 87 87)">Tax:</p>
                                <p>${tax}%</p>
                            </div>
                            <div style="display: flex; flex-direction: row; justify-content: space-between;background-color: #b6b6b6;">
                                <p
                                    style="
                                    color: rgb(255 87 87);
                                        justify-content: right;
                                        font-weight: bold;
                                        
                                    "
                                >
                                    Total:
                                </p>
                                <p>${totalBillPrice}</p>
                            </div>
        
                            <div style="display: flex; flex-direction: row; justify-content: right"></div>
                        </div>
                    </div>
                    <div class="container_bottom_2">
                        <div class="container_bottom_name"></div>
                    </div>
                    <div ">
                    <img style="position: fixed; bottom: 0; width: 100%" src="${uri2}" />
                    </div>
                </div>
            </body>
        </html>
    
    `;
    const listProductHtml9 = () =>
        products
            .map(
                (product, index) =>
                    `<tr >
            <td  style=" width: 10%; height: 30px; text-align: center; ">${index}</td>
            <td  style="width: 30%;  text-align: center; " >${product.name}</td>
            <td  style="width: 10%;text-align: center;   " >${product.quantity}</td>
            <td  style=" width: 10%; height: 30px; text-align: center;  ">${product.price}</td>
            <td style=" text-align: center;  ">${product.totalPrice}</td>
        </tr>`,
            )
            .join('');

    const html9 = `<!DOCTYPE html>
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
                    <Text><b>CỬA HÀNG LỘC PHÁT </b></Text>
                </div>
                <hr />
            </div>
            <div style="margin-top: 50px; margin-left: 50px">
                <div class="center_row">
                    <Text>${contactName}</Text>
                </div>
                <div class="center_row">
                    <Text>${contactAddress}</Text>
                </div>
                <hr />

                <table style="width: 100%; margin-top: 10px">
                    <tr>
                        ${listProductHtml9()}
                    </tr>
                </table>
                <hr />

                <div>
                    <div style="display: flex">
                        <Text style="margin-left: 160px">TOTAL AMOUNT</Text>
                        <Text style="margin-right: 160px; text-align: right; flex: 1">${subTotal}</Text>
                    </div>
                    <hr />
                </div>
                <div style="width: 100%; text-align: center">
                    <img
                        id="barcode"
                        style="height: 50px"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO0AAABkAQMAAABQPCXcAAAABlBMVEX///8AAABVwtN+AAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAEJJREFUSIlj+FPA8KDA/vEHC/kP9vKN/5n7D/xvPM7Af5z5A/ufwh8Mo9Kj0qPSo9Kj0qPSo9Kj0qPSo9Kj0iNDGgD7rye/sbJ7jgAAAABJRU5ErkJggg=="
                        alt="Mã vạch"
                    />
                </div>
            </div>
        </div>
    </body>
</html>
`;
    const listProductHtml10 = () =>
        products
            .map(
                (product) =>
                    ` <tr>
        <td class="row1">${product.name}</td>
        <td class="row2">${product.quantity}</td>
        <td class="row2">${product.price}</td>
        <td class="row3">${product.totalPrice}</td>
    </tr>`,
            )
            .join('');

    const html10 = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
        .container {
            display: flex;
            flex-direction: column;
            width: 400px;
        }
        p {
            margin: 0;
            line-height: 1.5;
        }
        table,
        th,
        td {
            border: 1px solid black;
        }
        table {
            border-collapse: collapse;
        }
        .top {
            margin-bottom: 10px;
        }
        .title_date {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
        .title {
            padding-right: 10px;
        }
        .from_to {
            display: flex;
            flex-direction: row;
            margin-bottom: 15px;
        }
        .from {
            flex: 1;
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        .flex_row {
            display: flex;
            flex-direction: row;
            margin-right: 20px;
        }
        .row1 {
            width: 65%;
            text-align: left;
        }
        .row2 {
            text-align: left;
            width: 15%;
        }
        .row3 {
            text-align: left;
            width: 20%;
        }
        .bottom {
            display: flex;
            margin-top: 5px;
            flex-direction: column;
        }
        .payment {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin: 20px 0 20px 60px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="top">
            <div class="title_date">
                <h1 class="title">Invoice</h1>
                <div class="date">
                    <p class="text">Date: ${dateNow}-${houseNow}</p>
                    <p class="text">Invoice #: 128931728748</p>
                </div>
            </div>
            <div class="from_to">
                <div class="from">
                    <b>From: </b>
                    <p class="text">${state.company.name}</p>
                </div>
                <div class="from">
                    <b>To: </b>
                    <p class="text">${customer}</p>
                </div>
            </div>
        </div>
        <div class="center">
            <table class="table">
                <tr>
                    <th class="row1">Description</th>
                    <th class="row2">Hours</th>
                    <th class="row2">Rate/hours</th>
                    <th class="row3">Total</th>
                </tr>
               ${listProductHtml10()}
            </table>
        </div>
        <div class="bottom">
            <div class="payment">
                <div class="payment_left"></div>
                <div class="payment_right">
                    <p>Subtotal: ${subTotal}</p>
                    <p>Tax: ${tax}</p>
                    <b>Total Amount Due: ${totalBillPrice}</b>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
`;
    const listProductHtml11 = () =>
        products
            .map(
                (product) =>
                    ` <tr>
<td class="row1">${product.name}</td>
<td class="row2">${product.quantity}</td>
<td class="row2">${product.price}</td>
<td class="row3">${product.totalPrice}</td>
</tr>`,
            )
            .join('');

    const html11 = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
    body {
        
        max-width: 400px;
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
            <h1 class="title">Invoice</h1>
            <div class="date">
                <p class="text">Date: ${dateNow}</p>
                <p class="text">Invoice #: </p>
            </div>
        </div>
        <div class="center">
            <table class="table">
                <tr>
                    <th class="row1">Description</th>
                    <th class="row2">Quantity</th>
                    <th class="row2">Unit Price</th>
                    <th class="row3">Total</th>
                </tr>
                ${listProductHtml11()}
            </table>
        </div>
        <div class="bottom">
            <div class="flex_row">
                <p class="text">Payment Terms:</p>
                <p class="text">Pay</p>
            </div>
            <div class="flex_row">
                <p class="text">Total Amout Due:  ${subTotal}</p>
            </div>
        </div>
    </div>
</body>
</html>
`;
    const listProductHtml12 = () =>
        products
            .map(
                (product) =>
                    `<tr>
        <td style="word-break: break-word;">${product.name}</td>
        <td style="text-align: right;">${product.price}</td>
        <td style="text-align: right;">${product.quantity}</td>
        <td style="text-align: right;">${product.totalPrice}</td>
    </tr>`,
            )
            .join('');

    const html12 = `<!DOCTYPE html>
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
    padding: 0!important;
    border-bottom: 1px solid black;   
    border-collapse: collapse; 
    text-align: justify;
}  
th, td {  
padding: 10px;  
}  
</style>
</head>
<body>
<div class="container">
  <div class="container_top">
    <div style="text-align: center">
      <Text >${state.company.name}</Text>
    </div>
    <div style="text-align: center">
      <Text >ĐC: ${state.company.address}</Text>
    </div>
    <div style="text-align: center">
      <Text >SĐT: ${state.company.phone}</Text>
    </div>

    <Text >-------------------------------</Text>
    <div style="text-align: center">
      <Text >HÓA ĐƠN THANH TOÁN</Text>
    </div>
    <div style="text-align: center">
    <Text >sỐ HÓA ĐƠN: ${newIDBill}</Text>
    </div>
    <div style="text-align: center">
    <Text >NGÀY: ${dateNow}</Text>     
    </div>
  </div>

  <div  style="margin-top: 50px;">
    <div class="center_row">
      <Text ><b>Giờ vào:</b></Text>
      <Text >17/09/3023 12:01</Text>
    </div>
    <div class="center_row">
      <Text ><b>Khách hàng:</b></Text>
      <Text >${customer}</Text>
    </div>
    <div class="center_row">
      <Text ><b>Thu ngân:</b></Text>
     ${route != null ? <Text></Text> : <Text>${state.user.name}</Text>}
    </div>
    <table style="width: 100%;margin-top: 10px;">  
        
        <tr>
            <th>Tên hàng</th>
            <th style="text-align: right;">Đơn giá</th>
            <th style="text-align: right;">Số lượng</th>
            <th style="text-align: right;">TT</th>
        </tr>  
        ${listProductHtml12()}
        </table>
    <div >
      <div  style="display: flex;">
        <br ><b>Tổng thành tiền</b></Text>
        <Text  style ="
            text-align: right;
            flex: 1;"><b>${totalBillPrice}</b></Text>
        </div>
      <div  style="display: flex;">
        <br ><b>Tổng cộng</b></Text>
        <Text  style ="
            text-align: right;
            flex: 1;"><b>${totalBillPrice}</b></Text>
      </div>
    
    </div>
    <div style="text-align: center;">
        <Text>-------------------------------</Text>         
         <div >
        <Text >Xin cảm ơn hẹn gặp lại quý khách!</Text>
      </div>
    </div>
  </div>
</div>
</body>
</html>`;

    const [showProductList, setShowProductList] = useState(false);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [product, setProduct] = useState([]); // Danh sách sản phẩm
    const [selectedProducts, setSelectedProducts] = useState([]); // Sản phẩm đã chọn

    const toggleProductList = () => {
        setShowProductList(!showProductList);
        setShowAddProduct(false);
    };
    const toggleAddProduct = async () => {
        setShowAddProduct(!showAddProduct);

        if (showAddProduct) {
            // Gọi hàm để lấy danh sách sản phẩm khi người dùng nhấn "Thêm sản phẩm"
            await getProductCompany(state.company.name); // Thay 'Tên Công Ty' bằng tên công ty thực tế
        }
    };

    const selectProduct = (product) => {
        setSelectedProducts([...selectedProducts, product]);
    };

    const getProductCompany = async (nameCompany) => {
        try {
            const response = await getProductsByCompany(nameCompany);

            setProduct(response);
            // console.log(response);
        } catch (error) {
            console.log(error);
        }
    };
    const [isProductModalVisible, setProductModalVisible] = useState(false);

    const openProductModal = () => {
        // setShowProductList(false); // Close the product list when opening the modal
        setProductModalVisible(true);
        getProductCompany(state.company.name); // Load products when opening the modal
    };

    const closeProductModal = () => {
        setProductModalVisible(false);
    };
    const renderProductItem = ({ item }) => (
        <View style={styles.productItemContainer}>
            <View style={styles.productInfoContainer}>
                <Text style={styles.productInfo}>{`ID: ${item.id} - Name: ${item.name} - Price: $${item.price}`}</Text>
            </View>
            <Button
                customStylesBtn={styles.selectButton}
                customStylesText={styles.selectButtonText}
                text="Chọn"
                onPress={() => selectProduct(item)}
            />
        </View>
    );
    return (
        <View style={styles.container}>
            <Header title={'Hóa đơn'} />

            <View>
                <View style={styles.invoicedate}>
                    <Text style={styles.code}>NO: {newIDBill}</Text>
                    <Text style={styles.code}>Date: {currentDate}</Text>
                </View>
                <View style={styles.center_row1}>
                    <TextInput
                        style={styles.text_line}
                        onChangeText={(text) => setContactName(text)}
                        value={contactName}
                        placeholder="Name"
                    />
                </View>
                <View style={styles.center_row1}>
                    <TextInput
                        style={styles.text_line}
                        onChangeText={(text) => setContactAddress(text)}
                        value={contactAddress}
                        placeholder="Address"
                    />
                </View>
                <View style={styles.center_row1}>
                    <TextInput
                        style={styles.text_line}
                        onChangeText={(text) => setContactPhone(text)}
                        value={contactPhone}
                        placeholder="Phone"
                    />
                </View>

                <View style={styles.center_row1}>
                    <TextInput
                        style={styles.text_line}
                        onChangeText={(text) => setContactEmail(text)}
                        value={contactEmail}
                        placeholder="Email"
                    />
                </View>

                <Button
                    customStylesBtn={styles.btn}
                    customStylesText={{ ...styles.text, color: 'black' }}
                    text="Mặt hàng/Dịch vụ"
                    iconRight={<AntDesign name={showProductList ? 'up' : 'down'} size={24} color="#32db64" />}
                    onPress={toggleProductList}
                />
                {showProductList && (
                    <>
                        {showAddProduct && (
                            <View>
                                {product.map((product1) => (
                                    <TouchableOpacity key={product1.id} onPress={() => selectProduct(product1)}>
                                        <Text>{product1.id}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                        <Button
                            customStylesBtn={styles.btn}
                            customStylesText={{ ...styles.text, color: 'gray' }}
                            text="Thêm sản phẩm"
                            iconRight={<AntDesign name="pluscircleo" size={24} color="#32db64" />}
                            onPress={openProductModal}
                        />
                    </>
                )}
                <View style={styles.center_row1}>
                    <TextInput
                        style={styles.text_line}
                        onChangeText={(text) => setTax(text)}
                        value={tax}
                        placeholder="Tax"
                    />
                </View>
                <View style={styles.center_row1}>
                    <TextInput
                        style={styles.text_line}
                        onChangeText={(text) => setNote(text)}
                        value={note}
                        placeholder="In Word"
                    />
                </View>
                {/* <Button
                    customStylesBtn={styles.btn}
                    customStylesText={{ ...styles.text, color: 'black' }}
                    text="Thêm các trường"
                    iconRight={<AntDesign name="pluscircleo" size={24} color="#32db64" />}
                /> */}
            </View>
            <Button
                customStylesBtn={{ ...styles.btn, backgroundColor: '#32db64' }}
                customStylesText={{ ...styles.text1, color: 'black' }}
                text="Print"
                onPress={print}
            />
            <Button
                customStylesBtn={{ ...styles.btn, backgroundColor: '#32db64' }}
                customStylesText={{ ...styles.text1, color: 'black' }}
                text="Save to PDF"
                onPress={printToFile}
            />
            <Modal animationType="slide" transparent={false} visible={isProductModalVisible}>
                <View style={styles.container}>
                    <Text style={styles.titleTable}>Danh sách sản phẩm</Text>
                    <FlatList
                        data={product}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderProductItem}
                    />

                    <Button
                        customStylesBtn={styles.btn}
                        customStylesText={{ ...styles.text, color: 'gray' }}
                        text="Đóng"
                        onPress={closeProductModal}
                    />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    headerleft: {},

    center_row1: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        marginVertical: 1,
        paddingHorizontal: 10,
        textAlign: 'center',
        justifyContent: 'center',
        color: 'black',
    },
    text_line: { fontWeight: 'bold', color: 'black' },
    btn: {
        paddingHorizontal: 10,
        width: '100%',
        borderWidth: 0,
        backgroundColor: 'white',
        borderRadius: 0,
        marginVertical: 1,
    },
    invoicedate: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        backgroundColor: '#32db64',
        height: 50,
    },
    text: {
        textAlign: 'left',
        fontSize: 15,
    },
    code: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    bottom_item: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    text1: {
        fontWeight: 'bold',
        fontSize: fontSizeDefault,
    },
    name: {
        height: 50,
        width: '100%',
        paddingHorizontal: 10,

        lineHeight: 50,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'gray',
        backgroundColor: 'white',
    },
    container_input: {
        height: '50%',
        paddingHorizontal: 10,
        marginBottom: 0,
        elevation: 0,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'gray',
    },
    dropdown: {
        marginHorizontal: 10,
    },
    dropdown_btn: {
        height: '70%',
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    productItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    productInfoContainer: {
        flex: 1,
    },
    titleTable: {
        fontSize: 28,
        alignItems: 'center',
        textAlign: 'center',
        padding: 10,
    },
    productItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    productInfo: {
        flex: 1,
        fontSize: 16,
        color: 'black',
    },
    selectButton: {
        backgroundColor: '#32db64',
        height: 40,
        width: 60,
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    selectButtonText: {
        color: 'white',
        fontSize: 14,
    },
});
