import React from 'react';
import { Link } from 'react-router-dom';

function MenuGroup({ children, ...props }) {
    const groupMenu = props.groupMenu;
    return (
        <React.Fragment>
            {
                groupMenu?.menus ? 
                (<li className='nav-menu-group'>
                    <span>{groupMenu.name}</span>
                    <ul className='nav-list-menu'>
                        {children}
                    </ul>
                </li>) :
                (<li className='nav-menu-group'>
                    <Link to={groupMenu.link}>{groupMenu.name}</Link>
                </li>)
            }
        </React.Fragment>
    )
}

function Menu({ children, ...props }) {
    const menu = props.menu;
    return (
        <li className='nav-menu'>
            <Link to={menu.link}>{menu.name}</Link>
        </li>
    )
}

function Navigator(props) {
    const listMenu = props?.listMenu;
    return (
        <ul className="nav-list-menu-group">
            {
                listMenu.map((item, index) => {
                    return (
                        <MenuGroup key={index} groupMenu={item}>
                            {
                                item?.menus && item.menus.map((item, index) => {
                                    return (
                                        <Menu key={index} menu={item}></Menu>
                                    )
                                })
                            }
                        </MenuGroup>
                    )
                })
            }
        </ul>
    )
}

export default Navigator;