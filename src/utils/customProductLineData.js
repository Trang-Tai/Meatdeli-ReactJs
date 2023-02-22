const customData = (arrList) => {
    const copyArr = arrList.length > 0 ? [...arrList] : [];
    if (copyArr.length > 0) {
        for (let i = 0; i < copyArr.length; i++) {
            if (copyArr[i].subType !== null) {
                for (let y = 0; y < copyArr.length; y++) {
                    if (copyArr[y].productTypeCode === copyArr[i].subType) {
                        if (!copyArr[y].children) {
                            copyArr[y] = { ...copyArr[y], children: [copyArr[i]] }
                        } else {
                            copyArr[y].children.push(copyArr[i]);
                        }
                        copyArr.splice(i, 1);
                        i--;
                        break;
                    }
                }
            }
        }
    }
    return copyArr;
}

export default customData;