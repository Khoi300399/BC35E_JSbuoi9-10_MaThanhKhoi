function NhanVien(_taiKhoan, _tenNV, _email, _matKhau, _ngayLam, _luongCoBan, _chucVu, _gioLam) {
    // Property
    this.taiKhoan = _taiKhoan;
    this.tenNV = _tenNV;
    this.email = _email;
    this.matKhau = _matKhau;
    this.ngayLam = _ngayLam;
    this.luongCoBan = _luongCoBan;
    this.chucVu = _chucVu;
    this.gioLam = _gioLam;
    this.tongLuong = 0;
    this.loai = "";

    // Method 
    this.tinhLuong = function () {
        if (this.chucVu === "Sếp") {
            this.tongLuong = parseFloat(this.luongCoBan) * 3;
        } else if (this.chucVu === "Trưởng phòng") {
            this.tongLuong = parseFloat(this.luongCoBan) * 2;
        } else if (this.chucVu === "Nhân viên") {
            this.tongLuong = parseFloat(this.luongCoBan);
        }
        else {
            this.tongLuong = -1;
        }
    };

    this.xepLoai = function () {
        if (this.gioLam >= 192) {
            this.loai += "Nhân viên xuất sắc";
        } else if (this.gioLam >= 176 && this.gioLam < 192) {
            this.loai += "Nhân viên giỏi";
        } else if (this.gioLam >= 160 && this.gioLam < 176) {
            this.loai += "Nhân viên khá";
        }
        else {
            this.loai += "Nhân viên trung bình";
        }
    };
}