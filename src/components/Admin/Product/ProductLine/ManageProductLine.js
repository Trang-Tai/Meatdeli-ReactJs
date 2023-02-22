import { Button, Col, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import usePrevious from "../../../../customHook/usePrevious";
import * as productActions from '../../../../redux/actions/productActions';
import buildOptions from "../../../../utils/buildOptions";
import { TYPE } from "../../../../utils/constant";
import ListProductLine from "./ListProductLine";
import './ManageProductLine.scss'

function ManageProductLine() {
    const dispatch = useDispatch();
    const listProductLines = useSelector(state => state.product.listProductLines);
    const [productLineOptions, setProductLineOptions] = useState([]);

    const [state, setState] = useState({
        productTypeCode: '',
        productTypeName: '',
        subType: '',
        isUpdate: false,
    });

    useEffect(() => {
        if (!listProductLines || listProductLines.length === 0) {
            dispatch(productActions.getAllProductLine());
        }
        let customList = listProductLines.filter((item, index) => {
            return !item.subType;
        })
        let options = buildOptions(customList, TYPE.PRODUCT_LINE);
        setProductLineOptions(options);
    }, [])

    const handleOnChangeInput = (e, type) => {
        setState(prevState => ({
            ...state,
            [type]: e.target.value,
        }))
        console.log(state);
    }

    const handleOnChangeSelect = (selectedValue, type) => {
        setState((prevState) => ({
            ...prevState,
            [type]: selectedValue,
        }));
    }

    const handleSubmit = () => {
        let data = {
            productTypeCode: state.productTypeCode,
            productTypeName: state.productTypeName,
            subType: state.subType?.value || null,
        }
        setState({
            productTypeCode: '',
            productTypeName: '',
            subType: '',
            isUpdate: false,
        })
        dispatch(productActions.upsertProductLine(data));
    }

    const processUpdateFromParent = (record) => {
        setState({
            isUpdate: true,
            productTypeCode: record.productTypeCode,
            productTypeName: record.productTypeName,
            subType: { label: listProductLines.filter(x => x.productTypeCode === record.subType)[0]?.productTypeName, value: record.subType }
        })
    }

    return (
        <div className="productline-container">
            <div className="productline-content">
                <Row>
                    <Col span={18} offset={3}>
                        <h1>{state.isUpdate && 'UPDATE PRODUCTLINE' || 'CREATE PRODUCTLINE'}</h1>
                        <div className="productline-item">
                            <span>Product Line Code: </span>
                            <Input className='productline-input-custom' size='large'
                                status='' placeholder="Product Type Code"
                                value={state.productTypeCode}
                                onChange={(e) => handleOnChangeInput(e, 'productTypeCode')}
                                disabled={state.isUpdate}
                            />
                        </div>
                        <div className="productline-item">
                            <span>Product Line Name: </span>
                            <Input className='productline-input-custom' size='large'
                                placeholder="Product Type Name"
                                value={state.productTypeName}
                                onChange={(e) => handleOnChangeInput(e, 'productTypeName')}
                            />
                        </div>
                        <div className="productline-item">
                            <span>Subtype of: </span>
                            <Select className='productline-input-custom'
                                options={productLineOptions}
                                value={state.subType}
                                onChange={(e) => handleOnChangeSelect(e, 'subType')}
                            />
                        </div>
                        <Button type="primary" size='medium'
                            className="btn-create"
                            onClick={handleSubmit}
                        >
                            {state.isUpdate && 'Update' || 'Create'}
                        </Button>
                        {state.isUpdate &&
                            <Button type="primary" size='medium'
                                className="btn-cancel"
                                onClick={() => setState({
                                    productTypeCode: '',
                                    productTypeName: '',
                                    subType: '',
                                    isUpdate: false,
                                })}
                            >
                                {'Cancel'}
                            </Button>
                        }
                    </Col>
                    <Col span={18} offset={3} style={{ marginTop: '10px' }}>
                        <ListProductLine
                            processUpdateFromParent={processUpdateFromParent}
                        />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default ManageProductLine;