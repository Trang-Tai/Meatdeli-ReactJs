import { Table } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from '../../../../redux/actions';
import ConfirmModal from "../../../ConfirmModal";

const customData = (arrList) => {
    const copyArr = arrList.length > 0 ? [...arrList] : [];
    if (copyArr.length > 0) {
        for (let i = 0; i < copyArr.length; i++) {
            if (copyArr[i].subType !== null) {
                for (let y = 0; y < copyArr.length; y++) {
                    if (copyArr[y].productTypeCode === copyArr[i].subType) {
                        if (!copyArr[y].children) {
                            copyArr[y] = { ...copyArr[y], children: [copyArr[i]] }
                        } else {
                            copyArr[y].children.push(copyArr[i]);
                        }
                        copyArr.splice(i, 1);
                        i--;
                        break;
                    }
                }
            }
        }
    }
    return copyArr;
}

function ListProductLine(props) {
    const dispatch = useDispatch();
    const listProductLines = useSelector(state => state.product.listProductLines);

    const [state, setState] = useState({
        title: '',
        isModalOpen: false,
        productLineData: '',
    })

    const columns = [
        {
            title: 'productTypeCode',
            dataIndex: 'productTypeCode',
            width: '30%',
        },
        {
            title: 'productTypeName',
            dataIndex: 'productTypeName',
            width: '40%',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '30%',
            render: (_, record) => (
                <>

                    <span className='delete-productline-btn'
                        onClick={() => {
                            let arrProductLineCode = [record.productTypeCode];
                            if (record.children) record.children.forEach((item) => arrProductLineCode.push(item.productTypeCode))
                            setState({
                                title: 'Are you sure you want to delete?',
                                isModalOpen: true,
                                productLineData: arrProductLineCode,
                            })
                        }}
                    >
                        Delete
                    </span>
                    <span className='update-productline-btn'
                        onClick={() => {
                            props.processUpdateFromParent(record);
                        }}
                    >
                        Update
                    </span>
                </>
            ),
        },
    ];

    const onCancelModal = () => {
        setState({
            title: '',
            isModalOpen: false,
            productLineData: '',
        })
    }

    const onConfirmModal = () => {
        dispatch(productActions.deleteProductLine(state.productLineData));
        onCancelModal();
    }

    return (
        <div className='table-list-container'>
            <Table
                rowKey={obj => obj.id}
                columns={columns}
                dataSource={customData(listProductLines)}
                pagination={{
                    pageSize: 7,
                }}
                onChange={(pagination, filters, sorter, extra) => {
                    console.log('params', pagination, filters, sorter, extra);
                }}
            />
            <ConfirmModal
                title={state.title}
                isOpen={state.isModalOpen}
                onCancel={onCancelModal}
                onConfirm={onConfirmModal}
            />
        </div>
    )
}

export default ListProductLine;