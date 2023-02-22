// DÙNG ĐỂ TEST, KO CÓ CHỨC NĂNG JI TRONG APP
import { Document, Page, Text, View, Font, StyleSheet, PDFDownloadLink, } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import formatCurrency from '../utils/formatCurrency';

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
const MyDocument = () => (
    <Document>
        <Page size={'A6'} orientation="landscape" style={styles.page}>
            <View style={styles.section}>
                <View style={styles.orderInfo}>
                    <Text>Người nhận: Trang Tài</Text>
                    <Text>125 Nguyễn Trãi phường 10 quận 5 125 Nguyễn Trãi phường 10 quận 5 125 Nguyễn Trãi phường 10 quận 5</Text>
                </View>
                <View style={styles.orderInfo}>
                    <Text>Người gửi: MEATDELI</Text>
                    <Text>125 Nguyễn Trãi phường 10 quận 5 125 Nguyễn Trãi phường 10 quận 5 125 Nguyễn Trãi phường 10 quận 5</Text>
                </View>
                <View style={styles.orderInfo}>
                    <Text>Số đơn: 2365745635635</Text>
                    <Text>Ngày đặt: 12/12/1133 45:32:43</Text>
                </View>
                <View style={styles.orderInfo}>
                    <Text>Tổng số lượng: {2}</Text>
                    <Text>Số tiền thu hộ: {formatCurrency({ number: 23000, x: 3, s: ',' })}</Text>
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
                        <View className='product-item row' style={styles.row}>
                            <Text className='col c-7' style={{ ...styles.col, ...styles.c7 }}>Xúc xích thanh trùng Hanns hảo hạng xông khói bịch x 10cây x 50gr</Text>
                            <Text className='col c-2' style={{ ...styles.col, ...styles.c2 }}>3</Text>
                            <Text className='col c-3' style={{ ...styles.col, ...styles.c3 }}>MEATPRE0003</Text>
                        </View>
                        <View className='product-item row' style={styles.row}>
                            <Text className='col c-7' style={{ ...styles.col, ...styles.c7 }}>Xúc xích thanh trùng Hanns hảo hạng xông khói bịch x 10cây x 50gr</Text>
                            <Text className='col c-2' style={{ ...styles.col, ...styles.c2 }}>3</Text>
                            <Text className='col c-3' style={{ ...styles.col, ...styles.c3 }}>MEATPRE0003</Text>
                        </View>
                        <View className='product-item row' style={styles.row}>
                            <Text className='col c-7' style={{ ...styles.col, ...styles.c7 }}>Xúc xích thanh trùng Hanns hảo hạng xông khói bịch x 10cây x 50gr</Text>
                            <Text className='col c-2' style={{ ...styles.col, ...styles.c2 }}>3</Text>
                            <Text className='col c-3' style={{ ...styles.col, ...styles.c3 }}>MEATPRE0003</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Page>
    </Document>
);


function Test() {

    return (
        <>
            <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf" className='custom-btn' style={{ display: 'inline-block' }}>
                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
            </PDFDownloadLink>
            <PDFViewer>
                <MyDocument />
            </PDFViewer>
        </>
    )
}

export default Test;