import { ScrollView, StatusBar, StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
import { dateNow, houseNow } from '../../utilies/date';

export default function Invoice11() {
    const html = `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
            <style>
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
        <body>
            <div class="container">
                <div class="top">
                    <h1 class="title">Invoice</h1>
                    <div class="date">
                        <p class="text">Date: 28/09/2023</p>
                        <p class="text">Invoice #: 128931728748</p>
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
                        <tr>
                            <td class="row1">Rau</td>
                            <td class="row2">1</td>
                            <td class="row2">10000</td>
                            <td class="row3">10000</td>
                        </tr>
                    </table>
                </div>
                <div class="bottom">
                    <div class="flex_row">
                        <p class="text">Payment Terms:</p>
                        <p class="text">Pay</p>
                    </div>
                    <div class="flex_row">
                        <p class="text">Total Amout Due:</p>
                    </div>
                </div>
            </div>
        </body>
    </html>
    `;
    return (
        <ScrollView style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.title}>Invoice</Text>
                <View style={styles.date}>
                    <Text style={styles.text}>
                        Date: {dateNow} : {houseNow}
                    </Text>
                    <Text style={styles.text}>Invoice #:</Text>
                </View>
            </View>
            <View style={styles.center}>
                <View style={styles.row_table}>
                    <Text style={{ ...styles.row_item1, ...styles.border }}>Description</Text>
                    <Text style={{ ...styles.row_item2, ...styles.border }}>Quantity</Text>
                    <Text style={{ ...styles.row_item2, ...styles.border }}>Unit Price</Text>
                    <Text style={{ ...styles.row_item3, ...styles.border }}>Total</Text>
                </View>
                <View style={styles.row_table}>
                    <Text style={{ ...styles.row_item1, ...styles.border }}>Rau</Text>
                    <Text style={{ ...styles.row_item2, ...styles.border }}>1</Text>
                    <Text style={{ ...styles.row_item2, ...styles.border }}>10000</Text>
                    <Text style={{ ...styles.row_item3, ...styles.border }}>10000</Text>
                </View>
            </View>
            <View style={styles.bottom}>
                <View style={styles.flex_row}>
                    <Text style={styles.text}>Payment Terms:</Text>
                    <TextInput style={styles.input} />
                </View>
                <View style={styles.flex_row}>
                    <Text style={styles.text}>Total Amout Due:</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        marginTop: StatusBar.currentHeight || 20,
    },
    flex_row: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
    },
    top: {
        flex: 1,
        marginBottom: 20,
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'right',
        marginHorizontal: 20,
    },
    border: {
        borderWidth: 1,
        borderColor: 'gray',
    },
    row_table: {
        flex: 1,
        flexDirection: 'row',
    },
    row_item1: {
        flex: 2,
        paddingLeft: 5,
    },
    row_item2: {
        flex: 0.8,
        textAlign: 'center',
        paddingHorizontal: 5,
    },
    row_item3: {
        flex: 0.9,
        textAlign: 'right',
        paddingRight: 5,
    },
    date: {},
    center: {
        flex: 10,
        marginBottom: 10,
    },
    bottom: {
        flex: 1,
        flexDirection: 'row',
    },
    text: {},
    input: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        flex: 1,
        marginRight: 5,
    },
});
