/*
    Toan tu - Bieu thuc

    Bieu thuc = Toan hang + Toan tu

    var s = a + b;

    1. Toan tu so hoc
        +, -, *, /, % (Chia lay du), ** (Luy thua), ++ (Phep tang), -- (Phep dam).
*/

// var a = "10", b = 20;

// // Ep kieu
// // parseInt() kieu so nguyen
// // parseFloat() kieu so thuc
// var c = parseInt(a) + b;
// console.log(c);

// // Meo ep kieu tu dong
// var d = +a + +b;
// console.log(d);


// var aa = 10, bb = 3;
// var cc = aa ** b; // a ^ b

// var count = 1, s;
// count++; // count = count + 1
// ++count; // count = count + 1
// console.log(count);

// s = count++;
// console.log(`S = ${s}`);
// console.log(`Count = ${count}`);

// var count = 1;
// var total = count++ + ++count;
// console.log(total);


/*
    2. Toan tu logic

    >, <, >=, <=, ==, ===, !=, !==

    => Tra ve boolean (true, false)
*/

// var a = "10";
// var b = 10;

// var c = +a === +b;
// console.log(c);



/*
    3. Toan tu gan ( = )
*/

// var a = 10;
// a += 5; // a = a + 5
// a -= 5; // a = a - 5
// a *= 5; // a = a * 5
// a /= 5; // a = a / 5
// a %= 5; // a = a % 5

// console.log(a);

// var str = "F8";
// str += " F8";
// str += " F8";
// console.log(str);



/*
    4. Toan tu ly luan (ket hop)
    && - Va (Chi dung khi tat ca deu dung)
    || - Hoac (Dung khi mot bieu thuc dung va sai khi ca bieu thuc sai)
    ! - Phu dunh (No se dao nguoc lai kq, true thanh false, false thanh true)
*/

// var a = 10;
// var b = a >= 5 && a <= 10;

// var c = 10;
// var d = !(c < 0 || c >= 5);
// console.log(b, d);



/*
    5. Toan tu ba ngoi
    bieuthuc ? giatridung : giatrisai;
*/

// var a = 10;
// var b = (a >= 10) ? "Dung" : "Sai";
// console.log(b);

// document.write(`${a >= 10 ? "Dung" : "Sai"}`);

// var a = 10;

// var b = (1 + 2 + 3 + a >= 5) ? 10 : 20 + 4 + 5;
// console.log(b);



/*
    6. Toan tu nillish (??)
        Toan tu check khac null va khac undefined
        => Bai tap chuyen toan tu nullish thang ba ngoi
*/

// var a = 10;
// var b = a ?? "F8";
// console.log(b);

// var c = (a !== null || a !== undefined) ? a : "F8";
// console.log(c);

// var a = 10;
// var b = a ? "F8" : "Hoang An";
// console.log(b);

/*
    Khai niem tu dong chuyen ve boolen trong truong hop phaur dung de so sanh

    Neu tu chuyen ve false => Falsy
        0, "", undefined, null, NaN
    
    Neu ma tu chuyen ve true => Truthy
        Cac truong hop con lai
*/



/*
    7. Toan tu &&
*/

// Neu la true thi se hien thi value ngay sau &&. Neu la false thi se hien thi value ngay sau dau =
// var a = 10;
// var b = a && "F8";
// console.log(b);

/*
    8. Toan tu ||

    Nếu a là đúng thì lấy a
    Nếu a là sai thì lấy "F8"
*/

var a = "Hoàng An";
var b = a || "F8";
console.log(b);