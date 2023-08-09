function checkSNT(snt) {
    if (snt < 2) {
        return false;
    }
    else {
        for (var i = 2; i <= Math.sqrt(snt); i++) {
            if (snt % i === 0) {
                return false;
            }
        }
        return true;
    }
}

var snt = 4;
checkSNT(snt) === false ? console.log(snt + ' Không phải là số nguyên tố') : console.log(snt + ' Là số nguyên tố');