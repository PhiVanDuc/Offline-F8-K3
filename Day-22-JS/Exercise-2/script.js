Object.prototype.getCurrency = function (unit) {
    let number = this;
    number = +number;

    if (typeof number !== 'number' || Number.isNaN(number) || number === Infinity || number === -Infinity) {
        return "Dữ liệu không hợp lệ!";
    }
    return number.toLocaleString("vi") + " " + unit.toLowerCase();
}

var price = 10000000;
console.log(price.getCurrency("đ"));