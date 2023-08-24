/*
    Chuoi trong JS co mot ham tao ten la String de dinh nghia cac thuoc tinh va phuong thuc xu ly
*/

// console.log(String, typeof String);
// console.log(String.prototype);


// Cac phuong thuc xu ly chuoi
// var str = "Xin chao F8";

// // 1. .length : Lay do dai cua chuoi
// console.log(`Do dai cua chuoi: ${str.length}`);

// // 2. .charAt(index) => Lay ki tu cua chuoi theo index (index bat dau tu 0)
// console.log(str.charAt(2));

// // 3. .charCodeAt(index) => Lay ma ASCII cua ky tu theo index
// console.log(str.charCodeAt(0));

// // 4. .concat(chuoi1, chuoi2, ...) => Noi cac chuoi lai voi nhau
// console.log(str.concat("a", "b", "c"));

// // 5. .indexOf(sub) => Tim vi tri xuat hien dau tien cua chuoi con trong chuoi cha va tra ve index. Neu khong tim thay thi tra ve - 1.
// console.log(str.indexOf("F8"));

// // 6. .lastIndexOf(sub) => Tim vi tri cuoi
// console.log(str.lastIndexOf("F8"));

// // 7. .includes(sub) => Tim chuoi con trong chuoi cha (tra ve True, False)
// console.log(str.includes("F8"));

// // 8. .slice(start, end) => Cat chuoi tu chuoi cha tu start -> end
// // console.log(str.slice(0, 3));
// // console.log(str.slice(1));
// console.log(str.slice(-4));

// // 9. .replace(tim, thay the) => Thay the chuoi
// console.log(str.replace("F8", "F88"));
// // Ham nay ho tro thay the bang regex
// // Vidu: Thay the chu so sau chu so F thanh *
// var pattern = /F\d+/g;
// console.log(str.replace(pattern, "F*"));

// // 10. .replaceAll(tim, thay the) => Tim kiem tat ca va thay the tat ca
// console.log(str.replace("F8", "F88"));

// // 11. .split(char) => Tim diem chung trong chuoi va tach chuoi thang mang
// console.log(str.split(" "));

// // 12. .trim() => Xoa khoang trang dau va cuoi chuoi
// console.log("       Phi Duc       ".trim());

// 13. .trimStart() => Loai bo khoang trang o dau chuoi
// 14. .trimStart() => Loai bo khoang trang o cuoi chuoi

// // 15. .match() => Cat chuoi dua vao regex
// var content = "Lorem ipsum, 0123456789 dolor sit amet consectetur adipisicing elit. Beatae nostrum nisi laborum illo illum molestiae quia ad velit deserunt maxime, exercitationem ab eaque iste ipsa praesentium assumenda pariatur amet nulla dignissimos, similique sit architecto. Sequi voluptas facilis quae soluta consectetur. Placeat quaerat, ipsa accusantium molestiae laudantium dolorum omnis a, 0987654321 harum, molestias delectus totam minus vel consequatur. Adipisci, ad distinctio cum eos vero quibusdam enim animi sit harum nostrum debitis eum facere totam atque reiciendis ipsa a, corrupti neque voluptas ab dolores eius. Praesentium ratione est commodi rem quam fugit, nihil incidunt sit aspernatur expedita! Fugiat molestiae iure obcaecati animi autem!"
// var pattern = /(0|\+84)\d{9}/g;
// var phones = content.match(pattern);
// console.log(phones);

// 16. .toLowerCase() => Chuyen tat ca thanh chu thuong
// 17. .toUpperCase() => Chuyen tat ca thanh chu hoa

// var str = "Học lập trình tại F8";
// var searchWord = "tại";
// var highlight = str.replace(searchWord, `<span style="background-color: yellow;">${searchWord}</span>`);
// document.write(highlight);