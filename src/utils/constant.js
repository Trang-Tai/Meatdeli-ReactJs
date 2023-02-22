export const TYPE = Object.freeze({
    GENDER: 'GENDER',
    PAYMENT: 'PAYMENT',
    ROLE: 'ROLE',
    STATUS: 'STATUS',
    IMAGE: 'IMAGE',

    PROVINCE: 'PROVINCE',
    DISTRICT: 'DISTRICT',
    WARD: 'WARD',

    PRODUCT_LINE: 'PRODUCT_LINE',
    ALL: 'ALL',
})

export const ACTIONS = Object.freeze({
    SOFT_DELETE: 'SOFT_DELETE',
    RESTORE: 'RESTORE',
    PERMANENT_DELETE: 'PERMANENT_DELETE',

    CHANGE_DIRECTLY: 'CHANGE_DIRECTLY',
    DELETE_DIRECTLY: 'DELETE_DIRECTLY',
})

export const PRODUCT_LINE = Object.freeze({
    MEAT: 'MEAT171222',
    PREMIUM: 'PREM171222',
    VISCERA: 'VISCM171222',
    STANDARD: 'MEDELI171222',
    CHICKEN: 'CHICK171222',
    INSTANT_FOOD: 'INSPR171222',
    PROCESSED_FOOD: 'PROCF171222',
    SPICE: 'SPICE171222',
})

export const HOTLINE = '1800 6828';
export const EMAIL = 'meatdeli@mml.masangroup.com';

export const path = Object.freeze({
    HOME: '/',
})

export const KEYCODE = Object.freeze({
    ENTER: 'Enter',
})

export const PRODUCT_INFO_GHN = {
    service_id_standard:53320, // chuẩn // 53319: Nhanh // 53321: Tiết kiệm
    height:40, // cm
    length:20, // cm
    weight:5000, // g
    width:20, // cm
}