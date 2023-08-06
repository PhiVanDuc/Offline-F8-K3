var a = 10;
var b = 30;
var c = 8;

console.log(`Cho dãy số: ${a}, ${b}, ${c}`);

if (a < b) {
    [a, b] = [b, a];
}
if (a < c) {
    [a, c] = [c, a];
}

console.log(`Số lớn nhất trong dãy số trên: ${a}`);