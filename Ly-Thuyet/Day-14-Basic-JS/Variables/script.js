var customer;
var customerName;
var customerShippingAddress;

// Khai bao bien tren mot dong
var user, userName, userEmail;

// Khai bao bien tren nhieu dong
var course = "Fullstack",
    price = 5000;

// Hien thi ra undefined trong console
console.log(customer);

// Hien thi ra gia tri da gan trong console
console.log(course);

// Hien thi du lieu len man hinh
document.write(course);

// var welcom = "<h2>Xin chao F8</h2>";

// Hien thi Xin chao F8 len man hinh
// document.write(welcom);



// Noi bien

var courseName = "Fullstack";
var welcom = "Chao mung ban \"den voi khoa hoc " + courseName + " 'F8'";
console.log(welcom);



// Dau backtick (`)
// Dung noi suy ${}
// Template string
// Ky hieu escape: \

var wel = `Chao mung cac ban den voi ${courseName} \`F8\``;
console.log(wel);