// Mô phòng lại vòng lặp for thông thường

// var i = 1;
// var s = 0;

// while (i <= 10) {
//     s += i;
//     i++;
// }
// console.log(`s = ${s}`);

/*
    While: Ban đầu vòng lặp sẽ kiểm tra điều kiện
        TH1: Nếu đúng, vòng lặp sẽ tiếp tục chạy nội dung
        TH2: Nếu chạy đến lúc không thỏa mãn điều kiện thì sẽ ko chạy nội dung bên trong nữa
    Được áp dụng khi chúng ta không biết số lần lặp là bao nhiêu lần
*/

/*
    do While: Ban đầu nó sẽ chạy một lầu đầu tiên trước rồi lần chạy thứ 2 nó mới bắt đầu kiểm tra điều kiện
    => Dù có sai điều kiện 1 lần vẫn chạy lần đầu đó.
*/

// var i = 10;
// do {
//     console.log(i);
// }
// while (i > 10);

// Từ khóa continue, break

// for (var i = 1; i <= 10; i++) {
//     console.log(`Lần chạy thứ ${i}`);
//     if (i === 5) {
//         break;
//     }
// }

// Tìm số chẵn nhỏ nhất trong khoảng từ begin đến end
// var begin = 3;
// var end = 10;
// var even;

// for (var i = begin; i <= end; i++) {
//     if (i % 2 === 0) {
//         even = i;
//         break;
//     }
// }
// console.log(`Số chẵn nhỏ nhất ${even}`);

for (var i = 1; i <= 10; i++) {
    if (i === 4) {
        continue;
    }
    console.log(`Lan lap thu ${i}`);
}