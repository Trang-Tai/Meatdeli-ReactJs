import _ from 'lodash';
import { TYPE } from './constant';

export const searchProductByName = (productList, searchText, searchProductType = '') => {
    if(searchText || (searchProductType && searchProductType[0] !== TYPE.ALL)) {
        productList = productList.filter(item => {
            if(searchProductType && searchProductType[0] !== TYPE.ALL) {
                if(_.isArray(searchProductType)) {
                    let strTemp = '';
                    searchProductType.forEach((item, index) => {
                        strTemp += ` ${item}`;
                    })
                    searchProductType = strTemp;
                }
                if(searchProductType.includes(item.productType)) {
                    if(searchText) {
                        return (`${item.productName} ${item.productCode}`).toLowerCase().includes(searchText.toLowerCase());
                    } else {
                        return true;
                    }
                } else {
                    return false;
                }
            }
            return (`${item.productName} ${item.productCode}`).toLowerCase().includes(searchText.toLowerCase());
        })
    }
    return productList;
}