import { Image, Table, Input, Row, Col, Select, Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../../redux/actions";
import NoImage from '../../../assets/No-image-found.jpg'
import './ListProduct.scss'
import { ACTIONS, TYPE } from "../../../utils/constant";
import buildOptions from "../../../utils/buildOptions";
import ConfirmModal from "../../ConfirmModal";
import { searchProductByName } from "../../../utils/searchProduct";
const { Search } = Input;
const optionSelects = [
    {
        value: '',
        label: '',
    },
    {
        value: ACTIONS.PERMANENT_DELETE,
        label: ACTIONS.PERMANENT_DELETE,
    },
]

function ListProduct(props) {
    const dispatch = useDispatch();
    const listProducts = useSelector(state => state.product.listProducts);
    const listProductLines = useSelector(state => state.product.listProductLines);

    const [modal, setModal] = useState({
        title: '',
        isOpen: false,
        arrProductInfo: [],
        action: '',
    })

    const [productLine, setProductLine] = useState('');
    const [textSearch, setTextSearch] = useState('');

    useEffect(() => {
        dispatch(productActions.getProduct({ productType: productLine }));
    }, [productLine])

    const handleDeleteProduct = (arrRecord) => {
        if (arrRecord.length > 0) {
            arrRecord = arrRecord.map(item => item.id)
        }
        dispatch(productActions.deleteProduct(arrRecord));
    }

    const resetModal = () => {
        setModal({
            title: '',
            isOpen: false,
            arrProductInfo: [],
            action: '',
        })
    }

    const onCancelModal = () => {
        resetModal();
    }

    const onConfirmModal = () => {
        if (modal.action === ACTIONS.PERMANENT_DELETE) handleDeleteProduct(modal.arrProductInfo);
        resetModal();
    }

    const columns = [
        {
            title: 'Product Image',
            dataIndex: 'productImageData',
            render: (productImageData) => (
                <Image.PreviewGroup>
                    {productImageData.length > 0 &&
                        productImageData.map((item, index) => {
                            return (
                                <Image key={index}
                                    width={30}
                                    height={30}
                                    src={item.image}
                                    hidden={index !== 0}
                                />
                            )
                        })
                        ||
                        <Image
                            width={30}
                            height={30}
                            src={NoImage}
                        />
                    }
                </Image.PreviewGroup>
            )
        },
        {
            title: 'Product Code',
            dataIndex: 'productCode',
        },
        {
            title: 'Product Name',
            dataIndex: 'productName',
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'Sale Price',
            dataIndex: 'salePrice',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantityInStock',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => (
                <>

                    <span className='delete-productline-btn'
                        onClick={() => setModal({
                            title: `Are you sure you want to delete ${record.productName}?`,
                            isOpen: true,
                            arrProductInfo: [record],
                            action: ACTIONS.PERMANENT_DELETE,
                        })}
                    >
                        <i className="fas fa-trash"></i>
                    </span>
                    <span className='update-productline-btn'
                        onClick={() => props.handleEditFromParent(record)}
                    >
                        <i className="fas fa-edit"></i>
                    </span>
                </>
            ),
        },
    ];

    return (
        <div className='table-product-container'>
            <h2 className="table-product-title">List of Product</h2>
            <div className="table-product-filter">
                <Row>
                    <Col span={8}>
                        <div className="product-table-actions">
                            <div className="select-handle-actions">
                                <Select
                                    size="large"
                                    style={{
                                        width: '100%',
                                    }}
                                    options={optionSelects}
                                    onChange={(value) => setModal((prev) => ({
                                        ...prev,
                                        action: value,
                                    }))}
                                    value={optionSelects.filter(item => item.value === modal.action)}
                                />
                            </div>
                            <div className="handle-action-btn">
                                <Button type="primary" size='large' style={{ width: '100%' }}
                                    disabled={!modal.action || modal.arrProductInfo.length <= 0}
                                    onClick={() => setModal((prev) => ({
                                        ...prev,
                                        title: 'Are you sure you want to delete list product',
                                        isOpen: true,
                                    }))}
                                >
                                    Handle
                                </Button>
                            </div>
                        </div>
                    </Col>
                    <Col span={16}>
                        <div className="product-filter-container">
                            <div className="select-type-product">
                                <Select
                                    size="large"
                                    style={{
                                        width: '100%',
                                    }}
                                    options={buildOptions(listProductLines, TYPE.PRODUCT_LINE)}
                                    onChange={(value) => setProductLine(value)}
                                />
                            </div>
                            <div className="search-text-product">
                                <Search
                                    placeholder="search text"
                                    className=''
                                    allowClear
                                    // enterButton="Search"
                                    enterButton
                                    size="large"
                                    onSearch={(value) => setTextSearch(value)}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <Table
                rowKey={obj => obj.id}
                rowSelection={{
                    type: 'checkbox',
                    onChange: (selectedRowKeys, selectedRows) => {
                        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                        setModal((prev) => ({
                            ...prev,
                            arrProductInfo: selectedRows,
                        }))
                    },
                }}
                columns={columns}
                dataSource={searchProductByName(listProducts, textSearch)}
                pagination={{
                    pageSize: 7,
                }}
                onChange={(pagination, filters, sorter, extra) => {
                    console.log('params', pagination, filters, sorter, extra);
                }}
            />
            <ConfirmModal
                title={modal.title}
                isOpen={modal.isOpen}
                onCancel={onCancelModal}
                onConfirm={onConfirmModal}
            />
        </div>
    )
}

export default ListProduct;