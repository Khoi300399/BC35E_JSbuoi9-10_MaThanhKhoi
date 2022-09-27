function Validation() {
    this.kiemTraRong = function (value, divError, mess) {
        if (value.trim() === "") {
            getEle(divError).innerHTML = mess;
            getEle(divError).style.display = "block";
            return false;
        }

        getEle(divError).innerHTML = "";
        getEle(divError).style.display = "none";
        return true;
    };

    this.kiemTraCV = function (idSelect, divError, mess) {
        if (getEle(idSelect).selectedIndex !== 0) {
            getEle(divError).innerHTML = "";
            getEle(divError).style.display = "none";
            return true;
        }

        getEle(divError).innerHTML = mess;
        getEle(divError).style.display = "block";
        return false;
    };

    this.kiemTraDoDaiKiTu = function (value, divError, mess, min, max) {
        if (value.length >= min && value.length <= max) {
            getEle(divError).innerHTML = "";
            getEle(divError).style.display = "none";
            return true;
        }

        getEle(divError).innerHTML = mess;
        getEle(divError).style.display = "block";
        return false;
    };

    this.kiemTraLetter = function (value, divError, mess) {
        //a-z
        var letter =
            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";

        if (value.match(letter)) {
            getEle(divError).innerHTML = "";
            getEle(divError).style.display = "none";
            return true;
        }

        getEle(divError).innerHTML = mess;
        getEle(divError).style.display = "block";
        return false;
    };

    this.kiemTraNumber = function (value, divError, mess) {
        //a-z
        var number = /^[0-9]+$/;

        if (value.match(number)) {
            getEle(divError).innerHTML = "";
            getEle(divError).style.display = "none";
            return true;
        }

        getEle(divError).innerHTML = mess;
        getEle(divError).style.display = "block";
        return false;
    };

    this.kiemTraEmail = function (value, divError, mess) {
        //a-z
        var email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (value.match(email)) {
            getEle(divError).innerHTML = "";
            getEle(divError).style.display = "none";
            return true;
        }

        getEle(divError).innerHTML = mess;
        getEle(divError).style.display = "block";
        return false;
    };

    this.kiemTraPassword = function (value, divError, mess) {
        //a-z
        var password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;

        if (value.match(password)) {
            getEle(divError).innerHTML = "";
            getEle(divError).style.display = "none";
            return true;
        }

        getEle(divError).innerHTML = mess;
        getEle(divError).style.display = "block";
        return false;
    };

    this.kiemTraTaiKhoanTrung = function (value, divError, mess, arr) {
        var isExist = false;

        for (var i = 0; i < arr.length; i++) {
            var sv = arr[i];
            if (sv.maSV === value) {
                isExist = true;
                break;
            }
        }

        if (isExist) {
            getEle(divError).innerHTML = mess;
            getEle(divError).style.display = "block";
            return false;
        }

        getEle(divError).innerHTML = "";
        getEle(divError).style.display = "none";
        return true;
    };
}