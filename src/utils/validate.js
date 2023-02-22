// const input = [
//     {
//         email: 'ttt',
//         constraint: ['required', 'isEmail'],
//     },
//     {
//         password: 'ttt',
//         constraint: ['required', 'min=3'],
//     },
// ]
// result:
// [0:{email: "Vui lòng nhập email hợp lệ"...}
// 1:{password: null}]

// update:
// {
//     email: "Vui lòng nhập email hợp lệ",
//     password: null
// }


const validRules = {
    required: function (value, message) {
        return value ? null : message || 'Vui lòng nhập trường này'
    },
    isEmail: function (value) {
        const emailRex = /^([\w\.])+@([a-zA-Z0-9\-])+\.([a-zA-Z]{2,10})(\.[a-zA-Z]{2,4})?(\.[a-zA-Z]{2,4})?$/;
        return value.trim().match(emailRex) ? null : 'Vui lòng nhập email hợp lệ';
    },
    max: function (value, max) {
        return value.length <= max ? null : `Vui lòng nhập tối đa ${max} kí tự`
    },
    min: function (value, min) {
        return value.length >= min ? null : `Vui lòng nhập tối thiểu ${min} kí tự`
    },
}

export default function validate(input) {
    let objResult = {};
    let result = input.map((item, index) => {
        let prop = Object.keys(item);
        let valObjName = prop.find(x => item[x] !== item.constraint);
        let errMessage = '';
        for (let itemRule of item.constraint) {
            let subItemRule;
            let isRuleHasValue = itemRule.includes('=');
            if (isRuleHasValue) {
                subItemRule = itemRule.split('=');
                itemRule = subItemRule[0];
            }
            errMessage = validRules[itemRule](item[valObjName], subItemRule && subItemRule[1] || '');
            if (errMessage) break;
        }
        return {
            [valObjName]: errMessage,
        };
    })
    for (const objValidInput of result) {
        objResult = { ...objResult, ...objValidInput }
    }
    return objResult;
}