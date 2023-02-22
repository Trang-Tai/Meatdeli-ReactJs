// const numberFormatter = new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'VND',
//     maximumFractionDigits: 0,

//     // These options are needed to round to whole numbers if that's what you want.
//     //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
//     //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
// });

// console.log(numberFormatter.format('2500'));

/**
 * Number.prototype.format(n, x, s, c)
 * 
 * @param integer x: length of whole part
 * @param integer n: length of decimal
 * @param mixed   s: sections delimiter
 * @param mixed   c: decimal delimiter
 */
const formatCurrency = ({ number, x, n, s, c }) => {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = (+number).toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

// console.log(formatCurrency({ number: 12345678.9, n: 1, x: 3, s: ':', c: '.' }))
// 12:345:678.9

export default formatCurrency;