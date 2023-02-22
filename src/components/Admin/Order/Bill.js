import { Document, Page, Text, View, Font, StyleSheet } from '@react-pdf/renderer';
import formatCurrency from '../../../utils/formatCurrency';
import moment from 'moment';

// Create styles
const styles = StyleSheet.create({
    page: {
        fontFamily: "Roboto",
        fontSize: '10px',
        padding: '5px',
    },
    section: {
    },
    orderInfo: {
        borderBottom: '1px solid #333',
    },
    grid: {
        width: '100%',
        display: 'block',
        padding: 0,
        overflow: 'clip',
    },
    wide: {
        maxWidth: '1200px',
        margin: '0 auto',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: '-5px',
        marginRight: '-5px',
    },
    col: {
        paddingLeft: '5px',
        paddingRight: '5px',
    },
    c2: {
        flex: '0 0 16.66667%',
        maxWidth: '16.66667%',
    },
    c3: {
        flex: '0 0 25%',
        maxWidth: '25%',
    },
    c7: {
        flex: '0 0 58.33333%',
        maxWidth: '58.33333%',
    },
    textCenter: {
        textAlign: 'center',
    }
});

Font.register({
    family: "Roboto",
    src:
        "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf"
});

// Create Document Component
const Bill = ({ orderInfo, ...props }) => (
    <Document>
        <Page size={'A6'} orientation="landscape" style={styles.page}>
            <View style={styles.section}>
                <View style={styles.orderInfo}>
                    <Text>Người nhận: {orderInfo.User && `${orderInfo.User.firstName} ${orderInfo.User.lastName}`}</Text>
                    <Text>{orderInfo.shippingAddressTo}</Text>
                </View>
                <View style={styles.orderInfo}>
                    <Text>Người gửi: MEATDELI</Text>
                    <Text>{orderInfo.shippingAddressFrom}</Text>
                </View>
                <View style={styles.orderInfo}>
                    <Text>Số đơn: {orderInfo.orderCode}</Text>
                    <Text>Ngày đặt: {moment(orderInfo.orderDate).format('DD/MM/YYYY HH:mm:ss')}</Text>
                </View>
                <View style={styles.orderInfo}>
                    <Text>
                        Tổng số lượng: 
                        {orderInfo.OrderDetails && orderInfo.OrderDetails.length > 0 && 
                            orderInfo.OrderDetails.reduce((accumulator, currentVal) => accumulator + currentVal.quantityOrdered, 0)}
                    </Text>
                    <Text>
                        Số tiền thu hộ: 
                        {
                            (orderInfo.paymentMethod !== 'PAY1' && orderInfo.paymentDate) ?
                            '0₫' :
                            formatCurrency({ number: orderInfo.totalCost, x: 3, s: ',' }) + '₫'
                        }
                    </Text>
                </View>
            </View>
            <View style={styles.section}>
                <View className='grid wide' style={{ ...styles.grid, ...styles.wide, ...styles.textCenter }}>
                    <View className='product-info-table-header row' style={styles.row}>
                        <Text className='col c-7' style={{ ...styles.col, ...styles.c7 }}>Tên sản phẩm</Text>
                        <Text className='col c-2' style={{ ...styles.col, ...styles.c2 }}>Số Lượng</Text>
                        <Text className='col c-3' style={{ ...styles.col, ...styles.c3 }}>Mã hàng</Text>
                    </View>
                    <View className='product-list'>
                        {
                            orderInfo.OrderDetails && orderInfo.OrderDetails.length > 0 &&
                            orderInfo.OrderDetails.map((item, index) => {
                                return (
                                    <View key={index} style={styles.row}>
                                        <Text style={{ ...styles.col, ...styles.c7 }}>{item.Product?.productName}</Text>
                                        <Text style={{ ...styles.col, ...styles.c2 }}>{item.quantityOrdered}</Text>
                                        <Text style={{ ...styles.col, ...styles.c3 }}>{item.Product?.productCode}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
            </View>
        </Page>
    </Document>
);

export default Bill;