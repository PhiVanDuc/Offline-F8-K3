var n = 5;
var save;
var result = 0;

for (var i = 1; i <= n; i++) {
    save = i * (i + 1);
    result += save;
}

console.log(`Kết quả: ${result}`);