var km = 1.5;
var total;

const POINT_1 = 1;
const POINT_2 = 5;
const POINT_3 = 120;
const PRICE_1 = 15000;
const PRICE_2 = 13500;
const PRICE_3 = 11000;
const DISCOUNT = 0.1;

if (km <= POINT_1) {
    total = km * PRICE_1;
}
else if (km <= POINT_2) {
    total = PRICE_1 + ((km - 1) * PRICE_2);
}
else {
    total = PRICE_1 + (4 * PRICE_2) + ((km - 5) * PRICE_3);
    if (total > POINT_3) {
        total = total - (total * DISCOUNT);
    }
}

console.log(`Tổng tiền taxi: ${total}vnđ`);