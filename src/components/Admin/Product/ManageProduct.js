import { Button, Col, Input, InputNumber, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import './ManageProduct.scss';
import { useEffect, useState } from "react";
import buildOptions from "../../../utils/buildOptions";
import { TYPE } from "../../../utils/constant";
import { productActions } from "../../../redux/actions";
import _ from 'lodash';
import getBase64 from "../../../utils/convertBase64";
import ListProduct from "./ListProduct";

const mdParser = new MarkdownIt(/* Markdown-it options */);

function ManageProduct() {
    const dispatch = useDispatch();
    const listProductLines = useSelector(state => state.product.listProductLines);
    const [productLineOptions, setProductLineOptions] = useState([]);

    const [state, setState] = useState({
        productName: '',
        productCode: '',
        productType: '',
        price: '',
        salePrice: '',
        quantityInStock: '',
        descriptionHTML: '',
        descriptionMarkdown: '',

        previewImg: [],
        avatar: [],

        isUpdate: false,
        listOfImgForUpdate: [],
        listOfDeletedImgForUpdate: [],
    })

    useEffect(() => {
        if (!listProductLines || listProductLines.length === 0) {
            dispatch(productActions.getAllProductLine());
        }
        let options = buildOptions(listProductLines, TYPE.PRODUCT_LINE);
        setProductLineOptions(options);
    }, [])

    const handleEditorChange = ({ html, text }) => {
        setState((prevState) => ({
            ...prevState,
            descriptionHTML: html,
            descriptionMarkdown: text,
        }))
    }

    const handleOnChangeInput = (e, type) => {
        setState((prevState) => ({
            ...prevState,
            [type]: e.target.value,
        }))
    }

    const handleOnChangeInputNumber = (e, type) => {
        setState((prevState) => ({
            ...prevState,
            [type]: e,
        }))
    }

    const handleOnChangeSelect = (selectedValue, type) => {
        console.log(selectedValue)
        setState((prevState) => ({
            ...prevState,
            [type]: selectedValue,
        }));
    }

    const handleOnChangeImg = async (e) => {
        const files = e.target.files;
        if (files) {
            let listImg = await Promise.all(Array.from(files).map(async (file, index) => {
                let base64Img = await getBase64(file);
                let objectURL = URL.createObjectURL(file);
                return {
                    base64Img,
                    objectURL,
                }
            }));
            let listBase64Img = listImg.map((item, index) => {
                return item.base64Img;
            });
            let listObjectURL = listImg.map((item, index) => {
                return item.objectURL;
            });
            listBase64Img.push(...state.avatar);
            listObjectURL.push(...state.previewImg);
            console.log(listBase64Img, listObjectURL);
            setState((prev) => {
                return {
                    ...prev,
                    avatar: listBase64Img,
                    previewImg: listObjectURL,
                }
            })
        }
    }

    const handleDeletePreviewImg = (objectURL, index) => {
        let copyPreviewImg = [...state.previewImg];
        let copyAvatar = [...state.avatar];
        let copyListOfDeletedImgForUpdate = [...state.listOfDeletedImgForUpdate];
        if (state.isUpdate) {
            let copyListOfImgForUpdate = [...state.listOfImgForUpdate];
            let deletedItem = _.remove(copyListOfImgForUpdate, function (item) {
                return item.image === copyPreviewImg[index];
            })
            copyListOfDeletedImgForUpdate.push(...deletedItem);
        }
        copyPreviewImg.splice(index, 1);
        copyAvatar.splice(index, 1);
        setState((prev) => ({
            ...prev,
            avatar: copyAvatar,
            previewImg: copyPreviewImg,
            listOfDeletedImgForUpdate: copyListOfDeletedImgForUpdate,
        }))
        console.log(state.avatar, state.previewImg);
    }

    const resetState = () => {
        setState({
            productName: '',
            productCode: '',
            productType: '',
            price: '',
            salePrice: '',
            quantityInStock: '',
            descriptionHTML: '',
            descriptionMarkdown: '',

            previewImg: [],
            avatar: [],

            isUpdate: false,
            listOfImgForUpdate: [],
            listOfDeletedImgForUpdate: [],
        })
    }

    const handleSubmit = () => {
        let data = {
            productName: state.productName,
            productCode: state.productCode,
            productType: state.productType.value,
            price: state.price,
            salePrice: state.salePrice,
            quantityInStock: +state.quantityInStock,
            descriptionHTML: state.descriptionHTML,
            descriptionMarkdown: state.descriptionMarkdown,

            avatar: state.avatar,
            deleteArrImage: state.listOfDeletedImgForUpdate,
        }
        console.log(data);
        dispatch(productActions.upsertProduct(data));
        resetState();
    }

    const handleEditFromParent = (record) => {
        setState({
            productName: record.productName,
            productCode: record.productCode,
            productType: { label: record.ProductLine?.productTypeName, value: record.ProductLine?.productTypeCode },
            price: record.price,
            salePrice: record.salePrice,
            quantityInStock: record.quantityInStock,
            descriptionHTML: record.descriptionHTML,
            descriptionMarkdown: record.descriptionMarkdown,

            previewImg: record.productImageData.length > 0 && record.productImageData.map(item => item.image) || [],
            avatar: [],

            isUpdate: true,
            listOfImgForUpdate: record.productImageData.length > 0 && record.productImageData.map(item => ({ id: item.id, image: item.image, cloudinaryId: item.cloudinaryId })) || [],
            listOfDeletedImgForUpdate: [],
        })
    }

    return (
        <div className="product-container">
            <div className="product-content">
                <Row>
                    <Col span={18} offset={3}>
                        <h1>{state.isUpdate && 'UPDATE PRODUCT' || 'CREATE PRODUCT'}</h1>
                        <div className="product-item">
                            <span>Product Code: </span>
                            <Input className='product-input-custom' size='large'
                                status='' placeholder="Product Type Code"
                                onChange={(e) => handleOnChangeInput(e, 'productCode')}
                                value={state.productCode}
                                disabled={state.isUpdate}
                            />
                        </div>
                        <div className="product-item">
                            <span>Product Name: </span>
                            <Input className='product-input-custom' size='large'
                                placeholder="Product Type Name"
                                onChange={(e) => handleOnChangeInput(e, 'productName')}
                                value={state.productName}
                            />
                        </div>
                        <div className="product-item">
                            <span>Product Type: </span>
                            <Select className='product-input-custom'
                                options={productLineOptions}
                                value={state.productType}
                                onChange={(e) => handleOnChangeSelect(e, 'productType')}
                            />
                        </div>
                        <div className="product-item">
                            <span>Price: </span>
                            <InputNumber className='product-input-custom' addonAfter="VND"
                                min={0} max={9999999999}
                                type={"number"}
                                onChange={(e) => handleOnChangeInputNumber(e, 'price')}
                                value={state.price}
                            />
                        </div>
                        <div className="product-item">
                            <span>Sale Price: </span>
                            <InputNumber className='product-input-custom' addonAfter="VND"
                                min={0} max={9999999999}
                                type={"number"}
                                onChange={(e) => handleOnChangeInputNumber(e, 'salePrice')}
                                value={state.salePrice}
                            />
                        </div>
                        <div className="product-item">
                            <span>Quantity: </span>
                            <Input className='product-input-custom' size='large'
                                placeholder="Input quantity"
                                type={'number'} min={0} max={9999}
                                onChange={(e) => handleOnChangeInput(e, 'quantityInStock')}
                                value={state.quantityInStock}
                            />
                        </div>
                        <div className='product-item'>
                            <span>Product Images: </span>
                            <div className='product-item-image'>
                                <input type={'file'} hidden id='previewImg' multiple={5} accept={'image/*'} onChange={(e) => handleOnChangeImg(e)} />
                                <label className='label-upload-img' htmlFor='previewImg'>Choose Image</label>
                                <div className="product-image-list">
                                    {state.previewImg.length > 0 && state.previewImg.map((item, index) => (
                                        <div className='preview-product-image' key={index}
                                            style={{ backgroundImage: `url(${item})` }}>
                                            <i className="fas fa-times-circle image-delete-icon"
                                                onClick={() => handleDeletePreviewImg(item, index)}></i>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="product-item">
                            <span>Description: </span>
                            <MdEditor style={{ height: '350px' }} className='product-input-custom'
                                renderHTML={text => mdParser.render(text)}
                                onChange={handleEditorChange}
                                value={state.descriptionMarkdown}
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
                                className="btn-create"
                                onClick={resetState}
                                style={{ marginRight: '10px' }}
                            >
                                Cancel
                            </Button>
                        }
                    </Col>
                    <Col xs={24} sm={24} md={22} lg={22} offset={1}>
                        <ListProduct
                            handleEditFromParent={handleEditFromParent}
                        />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default ManageProduct;