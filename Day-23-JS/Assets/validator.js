function Validator(options) {
    var selectorRules = {};

    // Thực hiện kiểm tra và báo lỗi ra ngoài giao diện
    function checkValidate(inputElement, rule) {
        let errorMessage;
        let errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        // Lấy ra các rule của từng selector
        var rules = selectorRules[rule.selector];

        // Lặp qua từng rule và check luôn
        // Nếu gặp lỗi thì dừng việc kiểm tra và hiển thị lỗi ra ngoài giao diện
        for (var i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value);
            if (errorMessage) {
                break;
            }
        }

        if (errorMessage) {
            errorElement.innerHTML = errorMessage;
            errorElement.style.display = 'inline-block';
            inputElement.parentElement.classList.add('invalid');
        }
        else {
            errorElement.innerHTML = '';
            errorElement.style.display = 'none';
            inputElement.parentElement.classList.remove('invalid');
        }
    }

    // Lấy element của form cần kiểm tra lỗi
    var formElement = document.querySelector(options.form);

    if (formElement) {
        formElement.onsubmit = function (e) {
            e.preventDefault();
            options.rules.forEach(function (rule) {
                let inputElement = formElement.querySelector(rule.selector);
                checkValidate(inputElement, rule);
            });
        }

        // Lặp qua các rule và xử lý sự kiện
        options.rules.forEach(function (rule) {
            // Lưu lại các rule trong mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            }
            else {
                selectorRules[rule.selector] = [rule.test];
            }

            let inputElement = formElement.querySelector(rule.selector);
            inputElement.oninput = function () {
                checkValidate(inputElement, rule);

                options.rules.forEach(function (rule) {
                    let inputElementSecond = formElement.querySelector(rule.selector);
                    if (inputElementSecond && inputElementSecond.value === '' && inputElementSecond !== inputElement) {
                        checkValidate(inputElementSecond, rule);
                    }
                });
            }

            inputElement.onblur = function () {
                options.rules.forEach(function (rule) {
                    let inputElementSecond = formElement.querySelector(rule.selector);
                    if (inputElementSecond && inputElementSecond.value === '') {
                        checkValidate(inputElementSecond, rule);
                    }
                });
            }
        });
    }
}


Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : message || 'Vui lòng nhập thông tin';
        }
    };
}


Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Vui lòng nhập đúng định dạng email';
        }
    };
}


Validator.minMaxLength = function (selector, min, max, messageMin, messageMax) {
    return {
        selector: selector,
        test: function (value) {
            if (value.length < min) {
                return messageMin || `Vui lòng nhập ít nhất ${min} kí tự`;
            }
            else if (value.length > max) {
                return messageMax || `Vui lòng chỉ nhập tối đa ${max} kí tự`;
            }
            else {
                return undefined;
            }
        }
    };
}