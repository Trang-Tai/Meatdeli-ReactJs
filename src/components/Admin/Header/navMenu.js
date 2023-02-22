export const adminMenu = [
    {
        name: 'Manage Users', 
        menus: [
            {
                name: 'Create a New Staff',
                link: '/admin/system/create-staff',
            },
            {
                name: 'List of Users',
                link: '/admin/system/manage-user',
            },
        ]
    },
    {
        name: 'Manage Products', 
        menus: [
            {
                name: 'Create Type of Product',
                link: '/admin/system/create-type-product',
            },
            {
                name: 'Create a New Product',
                link: '/admin/system/upsert-product',
            },
        ]
    },
    {
        name: 'Manage Orders', 
        link: '/admin/system/manage-order',
    },
];

export const staffMenu = [
    {
        name: 'Manage Products', 
        menus: [
            {
                name: 'Create Type of Product',
                link: '/admin/system/create-type-product',
            },
            {
                name: 'Create a New Product',
                link: '/admin/system/upsert-product',
            },
        ]
    },
    {
        name: 'Manage Orders', 
        link: '/admin/system/manage-order',
    },
];