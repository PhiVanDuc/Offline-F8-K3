// Bài 1:

var errors = {
    name: {
        required: "Vui lòng nhập họ và tên",
        min: "Họ tên phải từ 5 kí tự",
    },
    email: {
        email: "Định dạng email không hợp lệ",
        unique: "Email đã có người sử dụng",
        required: "Vui lòng nhập địa chỉ email",
    },
    password: {
        required: "Vui lòng nhập mật khẩu",
        same: "Mật khẩu phải khớp với mật khẩu nhập lại"
    }
}

function getError(field) {
    let keyArr = Object.keys(errors);

    for (let element of keyArr) {
        if (field === element) {
            return errors[element]['required'];
        }
    }
}

console.log(getError("name"));
console.log(getError("email"));
console.log(getError("password"));



// Bài 2:

function Person(name, age, address) {
    this.name = name;
    this.age = age;
    this.address = address;
}

function createCustomers(customers) {
    var result = customers.map(function (element) {
        let firstName = element['name'].slice(0, element['name'].indexOf(' '));
        let lastname = element['name'].slice(element['name'].lastIndexOf(' '));

        let customer = new Person(element['name'], element['age'], element['address']);
        customer.shortName = firstName + lastname;
        return customer;
    });

    result.sort(function (a, b) {
        if (a['age'] < b['age']) {
            return -1;
        }
    });

    return result;
}

const customers = [
    {
        name: "Nguyễn Văn A",
        age: 11,
        address: "Hà Nội",
    },
    {
        name: "Nguyễn Văn B",
        age: 2,
        address: "Hải Phòng",
    },
    {
        name: "Nguyễn Văn C",
        age: 12,
        address: "TP.HCM",
    },
];

console.log(createCustomers(customers));



// Bài 3:

function Account(name, password, email) {
    this.name = name;
    this.password = password;
    this.email = email;
}

const data = [];

function handleRegister(name, password, email) {
    if (!name || !password || !email) {
        return;
    }

    let account = new Account(name, password, email);
    account.role = 'user';

    if (data.length === 0) {
        data.push(account);
    }
    else {
        for (var i = 0; i < data.length; i++) {
            if (data[i].email === email) {
                return;
            }
        }
        data.push(account);
    }
}

handleRegister("Phí Văn Đức", "12345", "phivanduc325@gmail.com");
handleRegister("Phí Văn Đức", "12345", "phivanduc325@gmail.com");
handleRegister("Phí Văn Đức", "12345", "phid808@gmail.com");
console.log(data);

function handleLogin(email, password) {
    if (!email || !password) {
        return "Vui lòng nhập đầy đủ thông tin và đúng định dạng";
    }

    let result = data.filter(function (account) {
        return account.email === email && account.password === password;
    });

    if (result.length === 0) {
        return "Thông tin tài khoản không tồn tại!";
    }
    return result[0];
}

console.log(handleLogin("ledinhdung@gmail.com", "12345"));
console.log(handleLogin("phid808@gmail.com", "12345"));