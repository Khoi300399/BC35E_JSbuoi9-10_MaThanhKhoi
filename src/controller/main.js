var dsnv = new DSNV();
var validation = new Validation();
getLocalStorage();

function getEle(id) {
    return document.getElementById(id);
}

function layThongTinNhanVien(isAdd) {
    var taiKhoan = getEle("tknv").value;
    var tenNV = getEle("name").value;
    var email = getEle("email").value;
    var matKhau = getEle("password").value;
    var ngayLam = getEle("datepicker").value;
    var luongCoBan = getEle("luongCB").value;
    var chucVu = getEle("chucvu").value;
    var gioLam = getEle("gioLam").value;




    /**
     * Validation
     */
    var isValid = true;

    if (isAdd) {
        //taiKhoan
        isValid &= validation.kiemTraRong(taiKhoan, "tbTKNV", "(*) Vui long nhap tai khoan")
            && validation.kiemTraNumber(taiKhoan, "tbTKNV", "(*) Vui long nhap ky tu so")
            && validation.kiemTraDoDaiKiTu(taiKhoan, "tbTKNV", "(*) Vui long nhap 4-6 ky tu", 4, 6)
            && validation.kiemTraTaiKhoanTrung(taiKhoan, "tbTKNV", "(*) Tai Khoan da ton tai trong he thong", dsnv.arr);
    }

    // Họ và tên
    isValid &= validation.kiemTraRong(tenNV, "tbTen", "(*) Vui long nhap Ho va Ten")
        && validation.kiemTraLetter(tenNV, "tbTen", "(*) Ten khong duoc chua ky tu so");

    // Email
    isValid &= validation.kiemTraRong(email, "tbEmail", "(*) Vui long nhap email")
        && validation.kiemTraEmail(email, "tbEmail", "(*) Vui long nhap dung email");

    // matkhau
    isValid &= validation.kiemTraRong(matKhau, "tbMatKhau", "(*) Vui long nhap mat khau")
        && validation.kiemTraPassword(matKhau, "tbMatKhau", "(*) Vui long nhap dung mat khau");

    // ngaylam
    isValid &= validation.kiemTraRong(ngayLam, "tbNgay", "(*) Vui long nhap ngay lam");

    // LuongCB
    isValid &= validation.kiemTraRong(luongCoBan, "tbLuongCB", "(*) Vui long nhap luong co ban");

    // giolam
    isValid &= validation.kiemTraRong(gioLam, "tbGiolam", "(*) Vui long nhap gio lam");

    // chuc vu
    isValid &= validation.kiemTraCV("chucvu", "tbChucVu", "(*) Vui long chon chuc vu");


    if (isValid) {
        var nv = new NhanVien(taiKhoan, tenNV, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam);

        // Tính lương nhân viên
        nv.tinhLuong();

        // Xếp loại nhân viên
        nv.xepLoai();

        return nv;
    }

}

getEle("btnThemNV").addEventListener("click", function () {
    var nv = layThongTinNhanVien(true);

    // thêm nv vào dnah dsnv
    dsnv.themNV(nv);

    // Render table
    renderTable(dsnv.arr);

    setLocalStorage();

});

function renderTable(data) {
    var content = "";
    data.forEach(function (sv) {
        content += `
<tr>
    <td>${sv.taiKhoan}</td>
    <td>${sv.tenNV}</td>
    <td>${sv.email}</td>
    <td>${sv.ngayLam}</td>
    <td>${sv.chucVu}</td>
    <td>${sv.tongLuong}</td>
    <td>${sv.loai}</td>
    <td>
    <button class="btn btn-danger" onclick ="btnDelete('${sv.taiKhoan}')"><i class="fa fa-trash" aria-hidden="true"></i></button>
    <hr>
     <button class="btn btn-info" onclick ="btnEdit('${sv.taiKhoan}')" data-toggle="modal" data-target="#myModal"><i class="fa fa-pencil" aria-hidden="true"></i></button>
</tr>
`;
    });
    getEle("tableDanhSach").innerHTML = content;
}

function btnDelete(taiKhoan) {
    // Xóa info nhân viên
    dsnv.xoaNV(taiKhoan);
    // render table
    renderTable(dsnv.arr);
    // Lưu data xuông lại local storage
    setLocalStorage();
}

function btnEdit(taiKhoan) {
    var nv = dsnv.timNV(taiKhoan);
    getEle("tknv").value = nv.taiKhoan;
    getEle("tknv").disabled = true;
    getEle("name").value = nv.tenNV;
    getEle("email").value = nv.email;
    getEle("password").value = nv.matKhau;
    getEle("datepicker").value = nv.ngayLam;
    getEle("luongCB").value = nv.luongCoBan;
    getEle("chucvu").value = nv.chucVu;
    getEle("gioLam").value = nv.gioLam;
}

getEle("btnCapNhat").addEventListener("click", function () {
    // Lấy thông tin nhân viên mới cập nhật
    var nv = layThongTinNhanVien(false);
    // Gán thông tin nhân viên mới cập nhật vào thông tin nhân viên cũ
    dsnv.capNhatThongTinNV(nv);
    // render table
    renderTable(dsnv.arr);
    // lưu lại local storage
    setLocalStorage();
});

getEle("searchName").addEventListener("keyup", function () {
    var keyword = getEle("searchName").value;
    var arrSearch = dsnv.searchType(keyword);
    renderTable(arrSearch);
});

function setLocalStorage() {
    // Chuyển JSON => String
    var dataString = JSON.stringify(dsnv.arr);
    // Lưu String vào local storage
    localStorage.setItem("DSNV", dataString);
}

function getLocalStorage() {
    if (localStorage.getItem("DSNV")) {
        // Lấy data từ local storage
        var dataString = localStorage.getItem("DSNV");
        // Chuyển String => JSON
        dsnv.arr = JSON.parse(dataString);
        // renderTable
        renderTable(dsnv.arr);
    }
}