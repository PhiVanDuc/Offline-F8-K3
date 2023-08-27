function Validator(object) {

    function validate(inputElement, element) {
        var errorMsg = element.test(inputElement.value);
        var errorElement = inputElement.parentElement.querySelector('.error-msg');

        if (errorMsg) {
            errorElement.innerHTML = errorMsg;
            errorElement.style.display = 'inline-block';
            inputElement.parentElement.classList.add('invalid');
        }
        else {
            errorElement.innerHTML = '';
            errorElement.style.display = 'none';
            inputElement.parentElement.classList.remove('invalid');
        }
    }

    var formElement = document.querySelector(object.form);
    if (formElement) {

        object.rules.forEach(function (element) {
            let inputElement = formElement.querySelector(element.selector);

            if (inputElement) {
                // Xử lý trường hợp khi đang nhập input
                inputElement.oninput = function () {
                    validate(inputElement, element);

                    object.rules.forEach(function (element) {
                        let inputElementSecond = formElement.querySelector(element.selector);
                        if (inputElementSecond && inputElementSecond !== inputElement && inputElementSecond.value === '') {
                            validate(inputElementSecond, element);
                        }
                    });
                };

                inputElement.onblur = function () {
                    object.rules.forEach(function (element) {
                        let inputElementSecond = formElement.querySelector(element.selector);
                        if (inputElementSecond && inputElementSecond.value === '') {
                            validate(inputElementSecond, element);
                        }
                    });
                }
            }
        });
    }
}


Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : 'Vui lòng nhập thông tin';
        }
    }
}


Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            var emailRgx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (Validator.isRequired(selector).test(value) === undefined) {
                return emailRgx.test(value) ? undefined : 'Vui lòng nhập đúng định dạng Email';
            }
            else {
                return Validator.isRequired(selector).test(value);
            }
        }
    }
}


Validator.minLength = function (selector, min) {
    return {
        selector: selector,
        test: function (value) {
            if (Validator.isRequired(selector).test(value) !== undefined) {
                return 'Vui lòng nhập thông tin';
            }
            else {
                return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} ký tự`;
            }
        }
    }
}