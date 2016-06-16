function addCookie(objName, objValue, objHours) { //添加cookie 
    var str = objName + "=" + escape(objValue);
    if (objHours > 0) { //为0时不设定过期时间，浏览器关闭时cookie自动消失 
        var date = new Date();
        var ms = objHours * 3600 * 1000;
        date.setTime(date.getTime() + ms);
        str += "; expires=" + date.toGMTString();
    }
    document.cookie = str;
}

function getCookie(objName) { //获取指定名称的cookie的值 
    var arrStr = document.cookie.split("; ");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == objName) return unescape(temp[1]);
    }
}

function delCookie(name) { //为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间 
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    document.cookie = name + "=a; expires=" + date.toGMTString();
}
//读取出来所有的cookie字筗串了 
function allCookie() { //读取所有保存的cookie字符串 
    var str = document.cookie;
    if (str == "") {
        str = "没有保存任何cookie";
    }
}

function $(m, n) {
    return document.forms[m].elements[n].value;
}

function add_() {
    var cookie_name = $("myform", "cookie_name");
    var cookie_value = $("myform", "cookie_value");
    var cookie_expireHours = $("myform", "cookie_expiresHours");
    addCookie(cookie_name, cookie_value, cookie_expireHours);
}

function get_() {
    var cookie_name = $("myform", "cookie_name");
    var cookie_value = getCookie(cookie_name);
}

function del_() {
    var cookie_name = $("myform", "cookie_name");
    delCookie(cookie_name);
}
/ /添加
cookie

function addCookie(name, value, expires, path, domain) {
    var str = name + "=" + escape(value);
    if (expires != "") {
        var date = new Date();
        date.setTime(date.getTime() + expires * 24 * 3600 * 1000); //expires单位为天 
        str += ";expires=" + date.toGMTString();
    }
    if (path != "") {
        str += ";path=" + path; //指定可访问cookie的目录 
    }
    if (domain != "") {
        str += ";domain=" + domain; //指定可访问cookie的域 
    }
    document.cookie = str;
}
//取得cookie 
function getCookie(name) {
    var str = document.cookie.split(";")
    for (var i = 0; i < str.length; i++) {
        var str2 = str[i].split(” = ”);
        if (str2[0] == name) return unescape(str2[1]);
    }
}
//删除cookie 
function delCookie(name) {
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    document.cookie = name + ” = n;
    expire = ”+date.toGMTString();
}