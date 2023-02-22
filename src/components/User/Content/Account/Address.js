
import { Button, Input, Table } from 'antd';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import useFetchDistrict from '../../../../customHook/useFetchDistrict';
import useFetchProvince from '../../../../customHook/useFetchProvince';
import useFetchUserInfo from '../../../../customHook/useFetchUserInfo';
import useFetchWard from '../../../../customHook/useFetchWard';
import './Address.scss'
import { useDispatch } from 'react-redux';
import { userActions } from '../../../../redux/actions';
import { randomString } from '../../../../utils/randomString';

function Address() {
    const dispatch = useDispatch();
    const userInfo = useOutletContext();
    const moreUserInfo = useFetchUserInfo({ email: userInfo.email || randomString })[0];

    let [state, setState] = useState({
        isUpdate: true,

        phone: userInfo.phone || '',
        province: moreUserInfo?.Address && { label: moreUserInfo.Address.provinceName, value: moreUserInfo.Address.provinceId } || '',
        district: moreUserInfo?.Address && { label: moreUserInfo.Address.districtName, value: moreUserInfo.Address.districtId } || '',
        ward: moreUserInfo?.Address && { label: moreUserInfo.Address.wardName, value: moreUserInfo.Address.wardId } || '',
        address: moreUserInfo?.Address && moreUserInfo.Address.address || '',
    })

    let { provinces, provinceOptions } = useFetchProvince();
    let { districts, districtOptions } = useFetchDistrict(state.province.value);
    let { wards, wardOptions } = useFetchWard(state.district.value);

    useEffect(() => {
        setState((prev) => ({
            ...prev,
            phone: moreUserInfo?.phone || '',
            province: moreUserInfo?.Address && { label: moreUserInfo.Address.provinceName, value: moreUserInfo.Address.provinceId } || '',
            district: moreUserInfo?.Address && { label: moreUserInfo.Address.districtName, value: moreUserInfo.Address.districtId } || '',
            ward: moreUserInfo?.Address && { label: moreUserInfo.Address.wardName, value: moreUserInfo.Address.wardId } || '',
            address: moreUserInfo?.Address && moreUserInfo.Address.address || '',
        }))
    }, [moreUserInfo])

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
        console.log(selectedValue)
        setState((prevState) => ({
            ...prevState,
            [type]: selectedValue,
            ...obj,
        }));
    }

    const handleSubmit = () => {
        const data = {
            email: userInfo.email,
            isUpdate: true,
            phone: state.phone,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            phone: state.phone,
            gender: userInfo.gender,
            role: userInfo.role,
            password: '',

            provinceName: state.province.label,
            provinceId: state.province.value,
            districtName: state.district.label,
            districtId: state.district.value,
            wardName: state.ward.label,
            wardId: state.ward.value,
            address: state.address,
        }
        console.log(data);
        dispatch(userActions.createUser(data)); // upsert
    }

    return (
        <div className="address-container">
            <div className='grid wide'>
                <div className='address-content'>
                    <span className='address-title'>Địa chỉ của bạn</span>
                    <div className='address-block'>
                        <div className="address-item">
                            <span>Phone: </span>
                            <Input className='address-input-custom' size='large'
                                value={state.phone}
                                onChange={(e) => handleChangeInput(e, 'phone')}
                            />
                        </div>
                        <div className="address-item">
                            <span>Province: </span>
                            <Select className='address-input-custom'
                                options={provinceOptions}
                                value={state.province}
                                onChange={(e) => handleOnChangeSelect(e, 'province')}
                            />
                        </div>
                        <div className="address-item">
                            <span>District: </span>
                            <Select className='address-input-custom'
                                options={districtOptions}
                                value={state.district}
                                onChange={(e) => handleOnChangeSelect(e, 'district')}
                            />
                        </div>
                        <div className="address-item">
                            <span>Ward: </span>
                            <Select className='address-input-custom'
                                options={wardOptions}
                                value={state.ward}
                                onChange={(e) => handleOnChangeSelect(e, 'ward')}
                            />
                        </div>
                        <div className="address-item">
                            <span>Address: </span>
                            <Input className='address-input-custom' size='large'
                                placeholder="Address"
                                value={state.address}
                                onChange={(e) => handleChangeInput(e, 'address')}
                            />
                        </div>
                        <Button type="primary" size='large'
                            className="btn-create"
                            onClick={handleSubmit}
                        >
                            Cập nhật
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Address;