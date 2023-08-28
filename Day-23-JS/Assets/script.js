let login = document.querySelector('.login');
let overlay = document.querySelector('.overlay');
let container = document.querySelector('.container');

let loginForm = document.querySelector('.login-form');
let tabLogin = document.querySelector('.tabs-form .tab-login');
let regisForm = document.querySelector('.regis-form');
let tabRegis = document.querySelector('.tabs-form .tab-regis');

let input = document.querySelectorAll('.input');
let formGroup = document.querySelectorAll('.form-group');
let inputLogin = document.querySelectorAll('.login-form .input');
let formGroupLogin = document.querySelectorAll('.login-form .form-group');
let inputRegis = document.querySelectorAll('.regis-form .input');
let formGroupRegis = document.querySelectorAll('.regis-form .form-group');

let btnLogin = document.querySelector('.login-form .btn-login');
let errorLogin = document.querySelector('.login-form .error-login');


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


login.onclick = function () {
    overlay.classList.add('active');
    container.classList.add('active');
    loginForm.classList.add('active');
    tabLogin.classList.add('active');
    regisForm.classList.remove('active');
    tabRegis.classList.remove('active');

    Validator({
        form: '.login-form',
        errorSelector: '.error-msg',
        rules: [
            Validator.isRequired('.input-email'),
            Validator.isEmail('.input-email'),
            Validator.isRequired('.input-password'),
            Validator.minMaxLength('.input-password', 6, 20),
        ]
    });
}


overlay.onclick = function () {
    overlay.classList.remove('active');
    container.classList.remove('active');

    reset(input, formGroup);
}


tabLogin.onclick = function () {
    loginForm.classList.add('active');
    tabLogin.classList.add('active');
    regisForm.classList.remove('active');
    tabRegis.classList.remove('active');

    Validator({
        form: '.login-form',
        errorSelector: '.error-msg',
        rules: [
            Validator.isRequired('.input-email'),
            Validator.isEmail('.input-email'),
            Validator.isRequired('.input-password'),
            Validator.minMaxLength('.input-password', 6, 20),
        ]
    });

    reset(inputLogin, formGroupLogin);
}


tabRegis.onclick = function () {
    regisForm.classList.add('active');
    tabRegis.classList.add('active');
    loginForm.classList.remove('active');
    tabLogin.classList.remove('active');

    Validator({
        form: '.regis-form',
        errorSelector: '.error-msg',
        rules: [
            Validator.isRequired('.input-name'),
            Validator.minMaxLength('.input-name', 6, 30),
            Validator.isRequired('.input-email'),
            Validator.isEmail('.input-email'),
            Validator.isRequired('.input-password'),
            Validator.minMaxLength('.input-password', 6, 20),
        ]
    });

    reset(inputRegis, formGroupRegis);
}


btnLogin.onclick = function () {
    let check = true;

    for (let i = 0; i < inputLogin.length; i++) {
        if (inputLogin[i].value === '') {
            check = false;
        }
    }

    if (check === true) {
        errorLogin.innerHTML = 'Account not existed.';
        errorLogin.style.display = 'inline-block';
    }
    else {
        errorLogin.innerHTML = '';
        errorLogin.style.display = 'none';
    }
}