var a = 9;
console.log(`Xin chao f8`);
console.log(`Xin chao f8`);
console.log(`Xin chao f8`);

if (a >= 10) {
    console.log(`Hoang An`);
    console.log(`Hoang An`);
    console.log(`Hoang An`);
}

/*
    Cau lenh re nhanh

    1. if else
        1.1. Cau lenh if thieu 
            if (dieukien) {

            }
            Thieu dieu kien sai
        
        1.2. Cau lenh if du
            if (dieukien) {
                Noi dung dung
            }
            else {
                Noi dung sai
            }
            Du ca dieu kien dung va sai
        
        1.3. Cau lenh if nhieu nhanh
            if (dieukien) {
                Noi dung 1
            }
            else if (dieukien) {
                Noi dung 2
            }
            else if (dieukien) {
                Noi dung 3
            }
            ....
            else {
                Noi dung cuoi cung
            }

            1.4. Cau lenh if long nhau
                if (dieukien1) {
                    Noi dung dung 1
                    if (dieukien2) {
                        Noi dung dung 2
                    }
                    else {
                        Noi dung sai 1
                    }
                }
                else {
                    Noi dung sai 2
                }

    2. switch case
*/

/*
    Bai Tap Tinh Luong
    var total = 15000000

    Tinh luong thuc nhan sau khi da tru thue:

    Neu luong < 5tr => thue = 3%
    Neu luong tu 5 - 15tr => thue = 5%;
    Neu luong tren 15tr => thue = 10%;
*/

var total = 15000000;
var income, tax;

if (total < 5000000) {
    tax = 3;
}
else if (total > 15000000) {
    tax = 10
}
else {
    tax = 5;
}

income = total - (total * (tax / 100));
console.log(income);