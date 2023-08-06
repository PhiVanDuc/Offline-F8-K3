var a = 10;
var b = 30;
console.log(`a trước khi hoán đổi: ${a}`);
console.log(`b trước khi hoán đổi: ${b}`);

[a, b] = [b, a];
console.log(`a sau khi hoán đổi: ${a}`);
console.log(`b sau khi hoán đổi: ${b}`);