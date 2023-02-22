import { Input } from 'antd';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ListUser from './ListUser';
import './ManageUser.scss';
const { Search } = Input;

function ManageUser() {
    const [email, setEmail] = useState('');
    const [emailSearchParams, setEmailSearchParams] = useSearchParams({});

    const handleOnChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleSearch = () => {
        setEmailSearchParams(prev => {
            console.log(prev);
            return {
                paranoid: prev.get('paranoid') || '',
                email: email,
            }
        }, { replace: true })
    }

    return (
        <div className='manage-user-container'>
            <div className='manage-user-content'>
                <div className='manage-user-search'>
                    <h1>Manage Users</h1>
                    <Search
                        placeholder="email search text"
                        className='search-list-user-btn'
                        allowClear
                        // enterButton="Search"
                        enterButton
                        size="large"
                        onChange={(e) => handleOnChangeEmail(e)}
                        onSearch={() => handleSearch()}
                    />
                </div>
                <div className='manage-user-list'>
                    <ListUser emailSearch={emailSearchParams.get('email')} />
                </div>
            </div>
        </div>
    )
}

export default ManageUser;