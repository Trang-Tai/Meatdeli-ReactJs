import { TYPE } from "./constant";

const buildOptions = (inpData, type = '') => {
    let result = [{ label: '', value: '' }];
    if(type === TYPE.PROVINCE) result[0].value = null;
    if (inpData && inpData.length > 0) {
        inpData.map((item, index) => {
            let obj = {};
            if(type === TYPE.PROVINCE) {
                obj.label = item.provinceName;
                obj.value = item.provinceID;
            } else if(type === TYPE.DISTRICT) {
                obj.label = item.districtName;
                obj.value = item.districtID;
            } else if (type === TYPE.WARD) {
                obj.label = item.wardName;
                obj.value = item.wardID;
            } else if (type === TYPE.PRODUCT_LINE) {
                obj.label = item.productTypeName;
                obj.value = item.productTypeCode;
            } else {
                obj.label = item.value;
                obj.value = item.keyMap;
            }
            result.push(obj);
        })
    }
    return result;
}

export default buildOptions;