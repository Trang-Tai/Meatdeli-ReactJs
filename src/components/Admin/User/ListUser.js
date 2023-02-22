import { Table, Image, Button } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import NoImage from '../../../assets/No-image-found.jpg'
import useFetchUserInfo from '../../../customHook/useFetchUserInfo';
import { userServices } from '../../../services';
import { ACTIONS } from '../../../utils/constant';
import ConfirmModal from '../../ConfirmModal';
import './ListUser.scss';

function ListUser(props) {
    const { emailSearch = '' } = props;
    const [paranoidSearch, setParanoidSearch] = useSearchParams({});
    const [paranoid, setParanoid] = useState(() => {
        if(paranoidSearch.get('paranoid') === 'true' || paranoidSearch.get('paranoid') == null) {
            return true;
        } else {
            return false;
        }
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [usersInfo, setUsersInfo] = useState([]);
    const [actions, setActions] = useState('');

    const [reload, setReload] = useState(false);
    let data = useFetchUserInfo({
        paranoid: paranoidSearch.get('paranoid') || '',
        email: emailSearch || '',
        reload,
    });

    useEffect(() => {
        if(paranoidSearch.get('paranoid') === 'true' || paranoidSearch.get('paranoid') == null) {
            setParanoid(true);
        } else {
            setParanoid(false);
        }
    }, [paranoidSearch.get('paranoid')])

    const columns = [
        {
            title: 'email',
            dataIndex: 'email',
            fixed: 'left',
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: 'fullname',
            dataIndex: 'fullname',
            fixed: 'left',
            sorter: (a, b) => a.fullname.localeCompare(b.fullname),
        },
        {
            title: 'phone',
            dataIndex: 'phone',
        },
        {
            title: 'gender',
            dataIndex: 'gender',
            sorter: (a, b) => a.gender.localeCompare(b.gender),
        },
        {
            title: 'role',
            dataIndex: 'role',
            sorter: (a, b) => a.role.localeCompare(b.role),
        },
        {
            title: 'image',
            dataIndex: 'userImageData',
            render: (userImageData) => (
                <Image
                    width={30}
                    height={30}
                    src={userImageData?.image || NoImage}
                />
            )
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => (
                <>
                    {paranoid && <Link to={'/admin/system/create-staff'} state={{ userInfo: { ...record, isUpdate: true, } }} className='update-user-btn'>Update</Link>}
                    <span className='delete-user-btn' 
                        onClick={() => {setIsModalOpen(true); 
                            setUsersInfo([record]); 
                            setTitle(`Are you sure you want to delete ${record.fullname} ${!paranoid && 'permanently' || ''}?`);
                            setActions(!paranoid && ACTIONS.PERMANENT_DELETE || ACTIONS.SOFT_DELETE);
                        }}
                    >Delete</span>
                    {!paranoid && 
                        <span className='restore-user-btn' 
                            onClick={() => {setIsModalOpen(true); 
                                setUsersInfo([record]); 
                                setTitle(`restore ${record.fullname}?`);
                                setActions(ACTIONS.RESTORE);
                            }}
                    >Restore</span>}
                </>
            ),
        },
    ];

    const handleChangeParanoid = (value) => {
        setParanoid(value);
        setParanoidSearch(prev => {
            return {
                paranoid: value,
                email: '',
            }
        }, { replace: true })
    }

    const onCancelModal = () => {
        setIsModalOpen(false);
    }

    const handleSoftDelete = async () => {
        try {
            console.log(usersInfo, actions)
            const res = await userServices.deleteUser(usersInfo);
            if(res && res.errCode === 0) {
                toast.success('succeed');
                setReload((prev) => !prev);
                setUsersInfo([]);
                setIsModalOpen(false);
            } else {
                toast.error(`${res?.errMessage}`);
                setIsModalOpen(false);
            }
        } catch (error) {
            toast.error('failed')
            setIsModalOpen(false);
        }
    }

    const handleRestore = async () => {
        try {
            console.log(usersInfo, actions)
            const res = await userServices.restoreUser(usersInfo);
            if(res && res.errCode === 0) {
                toast.success('succeed');
                setReload((prev) => !prev);
                setUsersInfo([]);
                setIsModalOpen(false);
            } else {
                toast.error(`${res?.errMessage}`);
                setIsModalOpen(false);
            }
        } catch (error) {
            toast.error('failed')
            setIsModalOpen(false);
        }
    }

    const handlePermanentDelete = async () => {
        try {
            console.log(usersInfo, actions)
            const res = await userServices.deletePermanentUser(usersInfo);
            if(res && res.errCode === 0) {
                toast.success('succeed');
                setReload((prev) => !prev);
                setUsersInfo([]);
                setIsModalOpen(false);
            } else {
                toast.error(`${res?.errMessage}`);
                setIsModalOpen(false);
            }
        } catch (error) {
            toast.error('failed')
            setIsModalOpen(false);
        }
    }

    const onConfirmModal = () => {
        if(actions === ACTIONS.SOFT_DELETE) handleSoftDelete();
        if(actions === ACTIONS.RESTORE) handleRestore();
        if(actions === ACTIONS.PERMANENT_DELETE) handlePermanentDelete();
    }

    return (
        <div className='table-list-container'>
            {
                paranoid && (
                    <div className='removed-user-list'>
                        <span className='change-list' onClick={() => handleChangeParanoid(false)}>Move to blocked users</span>
                        <span className='list-title'>List of User</span>
                    </div>
                ) || (
                    <div className='removed-user-list'>
                        <span className='change-list' onClick={() => handleChangeParanoid(true)}>Move to active users</span>
                        <span className='list-title'>List of Blocked User</span>
                    </div>
                )
            }
            <Table
                rowKey={obj => obj.id}
                rowSelection={{
                    type: 'checkbox',
                    onChange: (selectedRowKeys, selectedRows) => {
                        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                        setUsersInfo(selectedRows);
                    },
                }}
                columns={columns}
                dataSource={data}
                pagination={{
                    pageSize: 7,
                }}
                onChange={(pagination, filters, sorter, extra) => {
                    console.log('params', pagination, filters, sorter, extra);
                }}
            />
            <div className='handle-table-options' style={usersInfo.length > 0 ? { transform: 'translateY(0%)', } : {}} >
                <div className='selected-users'>
                    <span><b>{usersInfo.length}</b> user has been selected</span>
                </div>
                <div>
                    <Button type='primary'
                        danger
                        onClick={() => {
                            setIsModalOpen(true); 
                            setTitle(`Are you sure you want to delete selected item ${!paranoid && 'permanently' || ''}?`);
                            setActions(!paranoid && ACTIONS.PERMANENT_DELETE || ACTIONS.SOFT_DELETE);
                        }}
                    >
                        Delete
                    </Button>
                    {paranoid || 
                        <Button type='primary' 
                            style={{ backgroundColor: 'purple', marginLeft: '5px' }}
                            onClick={() => {
                                setIsModalOpen(true); 
                                setTitle(`restore selected item?`);
                                setActions(ACTIONS.RESTORE);
                            }}
                        >
                            Restore
                        </Button>
                    }
                </div>
            </div>
            <ConfirmModal 
                title={title}
                isOpen={isModalOpen}
                onCancel={onCancelModal}
                onConfirm={onConfirmModal}
            />
        </div>
    )
}

export default ListUser;