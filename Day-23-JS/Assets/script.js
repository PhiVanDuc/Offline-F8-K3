let login = document.querySelector('.login');
let overlay = document.querySelector('.overlay');
let container = document.querySelector('.container');

let tabLogin = document.querySelector('.tabs-form > .tab-login');
let loginForm = document.querySelector('.forms .login-form');
let tabRegis = document.querySelector('.tabs-form > .tab-regis');
let regisForm = document.querySelector('.forms .regis-form');

let input = document.querySelectorAll('.input');
let formGroup = document.querySelectorAll('.form-group');
let loginInput = document.querySelectorAll('.login-form .input');
let loginFormGroup = document.querySelectorAll('.login-form .form-group');
let regisInput = document.querySelectorAll('.regis-form .input');
let regisFormGroup = document.querySelectorAll('.regis-form .form-group');

let btnLogin = document.querySelector('.login-form .btn-login');
let btnRegis = document.querySelector('.regis-form .btn-regis');



function reset(setInput, setFormGroup) {
    setInput.forEach(function (element) {
        element.value = '';
    });

    setFormGroup.forEach(function (element) {
        if (element.classList.contains('invalid')) {
            element.classList.remove('invalid');
            element.querySelector('.error-msg').style.display = 'none';
        }
    });
}


login.addEventListener("click", function () {
    overlay.classList.add('active');
    container.classList.add('active');
    tabLogin.classList.add('active');
    loginForm.classList.add('active');
    tabRegis.classList.remove('active');
    regisForm.classList.remove('active');

    if (tabLogin.classList.contains('active')) {
        Validator({
            form: '.login-form',
            rules: [
                Validator.isEmail('.input-email'),
                Validator.minLength('.input-password', 6),
            ],
        });
    }
});

overlay.addEventListener("click", function () {
    overlay.classList.remove('active');
    container.classList.remove('active');

    reset(input, formGroup);
    document.querySelector('.login-form .error-login').style.display = 'none';
    document.querySelector('.regis-form .error-regis').style.display = 'none';
});

tabLogin.addEventListener("click", function () {
    tabLogin.classList.add('active');
    loginForm.classList.add('active');
    tabRegis.classList.remove('active');
    regisForm.classList.remove('active');

    Validator({
        form: '.login-form',
        rules: [
            Validator.isEmail('.input-email'),
            Validator.minLength('.input-password', 6),
        ],
    });

    reset(loginInput, loginFormGroup);
    document.querySelector('.regis-form .error-regis').style.display = 'none';
});

tabRegis.addEventListener("click", function () {
    tabLogin.classList.remove('active');
    loginForm.classList.remove('active');
    tabRegis.classList.add('active');
    regisForm.classList.add('active');

    Validator({
        form: '.regis-form',
        rules: [
            Validator.isRequired('.input-name'),
            Validator.isEmail('.input-email'),
            Validator.minLength('.input-password', 6),
        ],
    });

    reset(regisInput, regisFormGroup);
    document.querySelector('.login-form .error-login').style.display = 'none';
});


btnLogin.addEventListener("click", function () {
    let check = true;
    loginInput.forEach(function (element) {
        if (element.value === '') {
            check = false;
        }
    });

    if (!check) {
        document.querySelector('.login-form .error-login').innerHTML = 'Vui lòng nhập đủ thông tin';
        document.querySelector('.login-form .error-login').style.display = 'inline-block';
    }
    else {
        document.querySelector('.login-form .error-login').innerHTML = 'Account not existed.';
    }
});


btnRegis.addEventListener("click", function () {
    let check = true;
    regisInput.forEach(function (element) {
        if (element.value === '') {
            check = false;
        }
    });

    if (!check) {
        document.querySelector('.regis-form .error-regis').innerHTML = 'Vui lòng nhập đủ thông tin';
        document.querySelector('.regis-form .error-regis').style.display = 'inline-block';
    }
    else {
        document.querySelector('.regis-form .error-regis').style.display = 'none';
    }
});