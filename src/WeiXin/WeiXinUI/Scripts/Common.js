//日期转换(/Date(1232131313)/)
function ChangeToDate(jsondate, all) {
    jsondate = jsondate.replace("/Date(", "").replace(")/", "");
    if (jsondate.indexOf("+") > 0) {
        jsondate = jsondate.substring(0, jsondate.indexOf("+"));
    } else if (jsondate.indexOf("-") > 0) {
        jsondate = jsondate.substring(0, jsondate.indexOf("-"));
    }
    var date = new Date(parseInt(jsondate, 10));
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var currentHour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();

    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    if (all == undefined) {
        return date.getFullYear() + "-" + month + "-" + currentDate;
    } else {
        return date.getFullYear() + "-" + month + "-" + currentDate + " " + hours + ":" + minutes + ":" + seconds;
    }
}
function DateDiff(sDate1, sDate2) {  //sDate1和sDate2是2004-10-18格式
    var aDate, oDate1, oDate2, iDays
    aDate = sDate1.split("-")
    oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]); //转换为10-18-2004格式
    aDate = sDate2.split("-")
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)  //把相差的毫秒数转换为天数
    return iDays
}

function ChangeServerDate(jsondate) {
    jsondate = jsondate.replace("/Date(", "").replace(")/", "");
    if (jsondate.indexOf("+") > 0) {
        jsondate = jsondate.substring(0, jsondate.indexOf("+"));
    } else if (jsondate.indexOf("-") > 0) {
        jsondate = jsondate.substring(0, jsondate.indexOf("-"));
    }
    var date = new Date(parseInt(jsondate, 10));

}
//弹窗
function OpenWin(title, url, width, height) {
    var href = '<iframe scrolling="no" frameborder="0"  src="' + url + '" style="width:100%;height:99%;"></iframe>';
    $("#win").window({
        maximized: false,
        inline: true,
        title: title,
        minimizable: false,
        maximizable: true,
        resizable: false,
        collapsible: false,
        draggable: false,
        shadow: true,
        width: width,
        height: height,
        content: href,
        modal: true
    });
}

//弹窗
function OpenWin1(title, url, width, height) {
    var href = '<iframe scrolling="yes" frameborder="0"  src="' + url + '" style="width:100%;height:99%;"></iframe>';
    $("#win").window({
        maximized: false,
        inline: true,
        title: title,
        minimizable: false,
        maximizable: true,
        resizable: false,
        collapsible: false,
        draggable: false,
        shadow: true,
        width: width,
        height: height,
        content: href,
        modal: true
    });
}

//弹窗
function OpenViewWin(title, url, width, height) {
    var href = '<iframe scrolling="auto" frameborder="0"  src="' + url + '" style="width:100%;height:100%;"></iframe>';
    $("#win").window({
        maximized: true,
        inline: true,
        title: title,
        maximizable: false,
        minimizable: false,
        resizable: false,
        collapsible: false,
        draggable: false,
        shadow: true,
        width: width,
        height: height,
        content: href,
        modal: true
    });
}

function CloseWin() {
    $("#win").window("close");
}
// 格式化日期 
Date.prototype.toFormatString = function (format) {
    var d = [this.getFullYear().toString(), (this.getMonth() + 1).toString(), this.getDate().toString(), this.getHours().toString(), this.getMinutes().toString(), this.getSeconds().toString()];
    for (var i = 1; i < d.length; i++) { d[i] = d[i].length == 1 ? "0" + d[i] : d[i]; }
    format = typeof (format) == "undefined" ? "date" : format;
    switch (format.toLowerCase()) {
        case "datetime": return d[0] + "-" + d[1] + "-" + d[2] + " " + d[3] + ":" + d[4] + ":" + d[5];
        default: return d[0] + "-" + d[1] + "-" + d[2];
    }
};

function BlockUI() { 
        $.blockUI({ message: '<img src="../Content/Kasar/images/loading.gif" alt=""/>处理中... ...' });
}
function UnblockUI() {
    $.unblockUI();
}


//打开一个窗口

function openWindow(url, width, height) {
    return window.open(url, "_blank", "height=" + height + "px, width=" + width + "px, toolbar= no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}


//键值对 类
function Map() {
    this.keys = new Array();
    this.data = new Array();
    //添加键值对
    this.set = function (key, value) {
        if (this.data[key] == null) {//如键不存在则身【键】数组添加键名
            this.keys.push(key);
        }
        this.data[key] = value; //给键赋值
    };
    //获取键对应的值
    this.get = function (key) {
        return this.data[key];
    };
    //判断是否存在
    this.hasKey = function (key) {
        return this.data[key] != null;
    };
    //去除键值，(去除键数据中的键名及对应的值)
    this.remove = function (key) {
        this.keys.remove(key);
        this.data[key] = null;
    };
    //判断键值元素是否为空
    this.isEmpty = function () {
        return this.keys.length == 0;
    };
    //获取键值元素大小
    this.size = function () {
        return this.keys.length;
    };
}

//js获得Url数值
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}


// 如：{Name:'Kasar',position:'IT技术'}
// ps:注意将同名的放在一个数组里
function getFormJson(form) {
    var o = {};
    var a = $(form).serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
}


//#region easyui的日期框的数据格式
function myformatter(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
}
function myparser(s) {
    if (!s) return new Date();
    var ss = (s.split('-'));
    var y = parseInt(ss[0], 10);
    var m = parseInt(ss[1], 10);
    var d = parseInt(ss[2], 10);
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
        return new Date(y, m - 1, d);
    } else {
        return new Date();
    }
}
//#endregion