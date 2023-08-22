function sum(...args) {
    let arr = [];
    arr.push(...args);

    return arr.reduce(function (pre, curr) {
        curr = +curr;
        if (typeof curr === 'number' && !Number.isNaN(curr) && curr !== Infinity && curr !== -Infinity) {
            pre = pre + curr;
        }
        return pre;
    }, 0);
}

console.log(sum(1, "2", 3, Infinity, 4, {}, null));