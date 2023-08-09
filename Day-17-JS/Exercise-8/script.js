function sum(n) {
    if (n < 1) {
        return 0;
    }
    else if (n === 1) {
        return 1;
    }
    else {
        return (1 / n) + sum(n - 1);
    }
}

var n = 0;
var result = sum(n);
console.log(` Kết quả: ${result} `);