function DSNV() {
    this.arr = [];

    this.themNV = function (nv) {
        this.arr.push(nv);
    };

    this.timViTri = function (taiKhoan) {
        var index = -1;
        this.arr.forEach(function (nv, i) {
            if (nv.taiKhoan === taiKhoan) {
                index = i;
            }
        });
        return index;
    };

    this.xoaNV = function (taiKhoan) {
        var index = this.timViTri(taiKhoan);
        if (index !== -1) {
            this.arr.splice(index, 1);
        }
    };

    this.timNV = function (taiKhoan) {
        var index = this.timViTri(taiKhoan);
        if (index !== -1) {
            return this.arr[index];
        }
        return null
    };

    this.capNhatThongTinNV = function (nv) {
        var index = this.timViTri(nv.taiKhoan);
        this.arr[index] = nv;
    };

    this.searchType = function (keyword) {
        var arrSearch = [];
        this.arr.forEach(function (nv) {
            var keySearch = keyword.toLowerCase();
            var type = nv.loai.toLowerCase();
            if (type.indexOf(keySearch) !== -1) {
                arrSearch.push(nv);
            }
        });
        return arrSearch;
    };
}