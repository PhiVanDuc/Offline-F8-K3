function totalBill(kWh) {
    // Tạo ra một mảng, mỗi phần tử là một object đại diện cho từng bậc
    const ranks = [
        { beginKWh: 0, endKWh: 50, price: 1678 },
        { beginKWh: 51, endKWh: 100, price: 1734 },
        { beginKWh: 101, endKWh: 200, price: 2014 },
        { beginKWh: 201, endKWh: 300, price: 2.536 },
        { beginKWh: 301, endKWh: 400, price: 2834 },
        { beginKWh: 401, price: 2927 }
    ];

    var total = 0;
    var leftKWh = kWh;

    for (var i = 1; i <= ranks.length; i++) {
        // Gán từng bậc trong mảng vào hằng số để lưu trữ bậc đó.
        const rank = ranks[i];
        // Tính toán số kWh cho mỗi lần nhân với số tiền của từng bậc.
        const rankKWh = Math.min(leftKWh, rank.endKWh - rank.beginKWh + 1);

        total = total + (rankKWh * rank.price);
        leftKWh = leftKWh - rankKWh;

        if (leftKWh <= 0) {
            break;
        }
    }

    return total;
}

var kWh = 120;
var total = totalBill(kWh);
console.log(`Tổng số tiền điện: ${total}vnđ`);