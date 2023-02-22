import { Input } from 'antd';
import { Col, Row, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import * as userActions from '../../../redux/actions/userActions';
import { useEffect, useState } from 'react';
import './CreateStaff.scss';
import getBase64 from '../../../utils/convertBase64';
import { useLocation } from 'react-router-dom';
import { TYPE } from '../../../utils/constant';
import buildOptions from '../../../utils/buildOptions';
import useFetchDistrict from '../../../customHook/useFetchDistrict';
import useFetchWard from '../../../customHook/useFetchWard';

function CreateStaff() {
    const dispatch = useDispatch();
    let location = useLocation();

    let genders = useSelector(state => state.user.genders);
    let roles = useSelector(state => state.user.roles);
    let [genderOptions, setGenderOptions] = useState(() => { return genders && buildOptions(genders) || [] });
    let [roleOptions, setRoleOptions] = useState(() => { return roles && buildOptions(roles) ||[{ label: 'Staff', value: 'R2' }]});
    
    let provinces = useSelector(state => state.user.listProvinces);
    let [provinceOptions, setProvinceOptions] = useState(() => { return provinces && buildOptions(provinces, TYPE.PROVINCE) || []});
    
    let [state, setState] = useState({
        email: location.state?.userInfo.email || '',
        firstName: location.state?.userInfo.firstName || '',
        lastName: location.state?.userInfo.lastName || '',
        password: '',
        phone: location.state?.userInfo.phone || '',
        gender: location.state?.userInfo.genderData && { label: location.state.userInfo.genderData.value, value: location.state.userInfo.genderData.keyMap } || '',
        role: location.state?.userInfo.roleData && { label: location.state.userInfo.roleData.value, value: location.state.userInfo.roleData.keyMap } || { label: 'Staff', value: 'R2' },
        avatar: '',

        previewImg: location.state?.userInfo.userImageData?.image || '',
        isUpdate: location.state?.userInfo.isUpdate || false,

        province: location.state?.userInfo.Address && { label: location.state.userInfo.Address.provinceName, value: location.state.userInfo.Address.provinceId } || '',
        district: location.state?.userInfo.Address && { label: location.state.userInfo.Address.districtName, value: location.state.userInfo.Address.districtId } || '',
        ward: location.state?.userInfo.Address && { label: location.state.userInfo.Address.wardName, value: location.state.userInfo.Address.wardId } || '',
        address: location.state?.userInfo.Address?.address || '',
    })
    
    let { districts, districtOptions } = useFetchDistrict(state.province.value);
    let { wards, wardOptions } = useFetchWard(state.district.value);
    
    useEffect(() => {
        if (!genders) {
            dispatch(userActions.fetchGender());
        }
        if (!roles) {
            dispatch(userActions.fetchRole());
        }
        let listGenders = buildOptions(genders);
        let listRoles = buildOptions(roles);
        setGenderOptions(listGenders);
        setRoleOptions(listRoles);
    }, [genders, roles])

    useEffect(() => {
        if(!(provinces.length > 0)) { 
            dispatch(userActions.fetchProvince()); 
        }
        const options = buildOptions(provinces, TYPE.PROVINCE);
        setProvinceOptions(options);
    }, [provinces])

    useEffect(() => {
        return () => {
            state.previewImg && URL.revokeObjectURL(state.previewImg);
        }
    }, [state.previewImg])

    const handleChangeInput = (e, type) => {
        setState((prevState) => ({
            ...prevState,
            [type]: e.target.value,
        }))
    }

    const handleOnChangeSelect = (selectedValue, type) => {
        const obj = {};
        if (type === 'province') { obj.district = ''; obj.ward = ''; }
        if (type === 'district') { obj.ward = ''; }
        setState((prevState) => ({
            ...prevState,
            [type]: selectedValue,
            ...obj,
        }));
    }

    const handleOnChangeImg = async (e) => {
        console.log(e.target.files);
        if(state.previewImg) { URL.revokeObjectURL(state.previewImg); }
        const file = e.target.files[0];
        if(file) {
            let base64Img = await getBase64(file);
            let objectURL = URL.createObjectURL(file);
            setState((prevState) => ({
                ...prevState,
                avatar: base64Img,
                previewImg: objectURL,
            }))
        }
        console.log(state)
    }

    const handleSubmit = () => {
        console.log(state);
        const data = new FormData();
        data.append('email', state.email);
        data.append('firstName', state.firstName);
        data.append('lastName', state.lastName);
        data.append('password', state.password);
        data.append('phone', state.phone);
        data.append('gender', state.gender.value);
        data.append('role', state.role.value);
        data.append('avatar', state.avatar);
        data.append('isUpdate', state.isUpdate);
        data.append('provinceName', state.province.label);
        data.append('provinceId', state.province.value);
        data.append('districtName', state.district.label);
        data.append('districtId', state.district.value);
        data.append('wardName', state.ward.label);
        data.append('wardId', state.ward.value);
        data.append('address', state.address);
        console.log(data);
        dispatch(userActions.createUser(data));
    }

    return (
        <div className="staff-creation-container">
            <div className="staff-creation-content">
                <Row>
                    <Col span={18} offset={3}>
                        <h1>{state.isUpdate && 'Update Staff' || 'Create Staff'}</h1>
                        <div className="staff-item">
                            <span>Email: </span>
                            <Input className='staff-input-custom' size='large' 
                                status='' placeholder="Email" 
                                value={state.email}
                                onChange={(e) => handleChangeInput(e, 'email')}
                                disabled={state.isUpdate}
                            />
                        </div>
                        <div className="staff-item">
                            <span>First Name: </span>
                            <Input className='staff-input-custom' size='large' 
                                status='' placeholder="First Name"
                                value={state.firstName}
                                onChange={(e) => handleChangeInput(e, 'firstName')}
                            />
                            <span>Last Name: </span>
                            <Input className='staff-input-custom' size='large' 
                                status='' placeholder="Last Name" 
                                value={state.lastName}
                                onChange={(e) => handleChangeInput(e, 'lastName')}
                            />
                        </div>
                        <div className="staff-item">
                            <span>Password: </span>
                            <Input.Password
                                className='staff-input-custom'
                                size='large'
                                placeholder="Input password"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                value={state.password}
                                onChange={(e) => handleChangeInput(e, 'password')}
                                disabled={state.isUpdate}
                            />
                        </div>
                        <div className="staff-item">
                            <span>Phone: </span>
                            <Input className='staff-input-custom' size='large' 
                                placeholder="Phone" 
                                value={state.phone}
                                onChange={(e) => handleChangeInput(e, 'phone')}
                            />
                        </div>
                        <div className="staff-item">
                            <span>Gender: </span>
                            <Select className='staff-input-custom' 
                                options={genderOptions} 
                                value={state.gender}
                                onChange={(e) => handleOnChangeSelect(e, 'gender')}
                            />
                        </div>
                        <div className="staff-item">
                            <span>Role: </span>
                            <Select className='staff-input-custom' 
                                options={roleOptions} 
                                value={state.role}
                                isDisabled={true} 
                                defaultValue={roleOptions[0]}
                            />
                        </div>
                        <div className='staff-item'>
                            <span>Avatar: </span>
                            <div className='preview-image-container'>
                                <input type={'file'} hidden id='previewImg' accept={'image/*'} onChange={(e) => handleOnChangeImg(e)}/>
                                <label className='label-upload-img' htmlFor='previewImg'>Choose Image</label>
                                <div className='preview-image-content'
                                    style={{ backgroundImage: `url(${state.previewImg})` }}>
                                </div>
                            </div>
                        </div>
                        <div className="staff-item">
                            <span>Province: </span>
                            <Select className='staff-input-custom' 
                                options={provinceOptions} 
                                value={state.province}
                                onChange={(e) => handleOnChangeSelect(e, 'province')}
                            />
                        </div>
                        <div className="staff-item">
                            <span>District: </span>
                            <Select className='staff-input-custom' 
                                options={districtOptions} 
                                value={state.district}
                                onChange={(e) => handleOnChangeSelect(e, 'district')}
                            />
                        </div>
                        <div className="staff-item">
                            <span>Ward: </span>
                            <Select className='staff-input-custom' 
                                options={wardOptions} 
                                value={state.ward}
                                onChange={(e) => handleOnChangeSelect(e, 'ward')}
                            />
                        </div>
                        <div className="staff-item">
                            <span>Address: </span>
                            <Input className='staff-input-custom' size='large' 
                                placeholder="Address" 
                                value={state.address}
                                onChange={(e) => handleChangeInput(e, 'address')}
                            />
                        </div>
                        <Button type="primary" size='medium' className="btn-create" onClick={() => handleSubmit()}>
                            {state.isUpdate && 'Update' || 'Create'}
                        </Button>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default CreateStaff;
