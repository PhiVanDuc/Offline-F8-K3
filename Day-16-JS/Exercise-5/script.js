var a = 9;
var b = 4;
var c = 10;

console.log(`Dãy số ban đầu: ${a}, ${b}, ${c}`);

if (a > b) {
    [a, b] = [b, a];
}
if (b > c) {
    [b, c] = [c, b];
}
if (a > b) {
    [a, b] = [b, a];
}

console.log(`Dãy số sau khi sắp xếp tăng dần: ${a}, ${b}, ${c}`);