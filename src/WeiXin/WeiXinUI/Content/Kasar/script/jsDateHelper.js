/* 
* @Author: Kasar
* @Date:   2015-03-20 22:41:00
* @Last Modified by:   Kasar
* @Last Modified time: 2015-03-28 23:50:09
*/
//日期+天
function AddDays(d, n) { 
        var t = new Date(d); //复制并操作新对象，避免改动原对象
        t.setDate(t.getDate() + n);
        return t;
    }
    //日期+月。日对日，若目标月份不存在该日期，则置为最后一日
function AddMonths(d, n) {
        var t = new Date(d);
        t.setMonth(t.getMonth() + n);
        if (t.getDate() != d.getDate()) {
            t.setDate(0);
        }
        return t;
    }
    //日期+年。月对月日对日，若目标年月不存在该日期，则置为最后一日
function AddYears(d, n) {
    var t = new Date(d);
    t.setFullYear(t.getFullYear() + n);
    if (t.getDate() != d.getDate()) {
        t.setDate(0);
    }
    return t;
}

//用JS计算两个日期之间有多少个休息日
function weekendBetween(dtStart, dtEnd) {
    if (typeof dtEnd == 'string') dtEnd = StringToDate(dtEnd);
    if (typeof dtStart == 'string') dtStart = StringToDate(dtStart);
    var days = parseInt((dtEnd - dtStart) / 86400000);
    var adds = 0;
    var m = (days + dtStart.getDay() + 1) % 7;
    if (m > 0) adds = m;
    if (m > 2) adds = 2;
    var redu = 0
    if (dtStart.getDay() > 0) redu = 2;
    if (dtStart.getDay() == 1) redu = 1;
    var subtotal = parseInt((days + dtStart.getDay() + 1) / 7) * 2;
    return subtotal - redu + adds;
}

function StringToDate(DateStr) {
        var converted = Date.parse(DateStr);
        var myDate = new Date(converted);
        if (isNaN(myDate)) {
            var arys = DateStr.split('-');
            myDate = new Date(arys[0], arys[1], arys[2]);
        }
        return myDate;
    }
    //获得工作日，从当天开始
function getworkday(itervalByDay) {
        var date = new Date();
        var millisceonds = date.getTime();
        for (var i = 1; i <= itervalByDay; i++) {
            millisceonds += 24 * 60 * 60 * 1000;
            date.setTime(millisceonds);
            if (date.getDay() == 0 || date.getDay() == 6) i--;
        }
        return date;
    }
    //计算相差的天数
function getRange(starDay, endDay) {
        starDay = new Date(starDay.replace(/-/g, "/"));
        endDay = new Date(endDay.replace(/-/g, "/"));
        var days = endDay.getTime() - starDay.getTime();
        var time = parseInt(days / (1000 * 60 * 60 * 24));
        return time;
    }
    //日期格式化 type="-","/","",
function formater(date, type) {
    var resdate = date.getFullYear();
    if ((parseInt(date.getMonth()) + 1) > 9) {
        resdate += type + (parseInt(date.getMonth()) + 1);
    } else {
        resdate += type + "0" + (parseInt(date.getMonth()) + 1);
    }
    if (date.getDate() > 9) {
        resdate += type + date.getDate();
    } else {
        resdate += type + "0" + date.getDate();
    }
    return resdate;
}
Date.prototype.formater = function(type) {
        var resdate = this.getFullYear();
        if ((parseInt(this.getMonth()) + 1) > 9) {
            resdate += type + (parseInt(this.getMonth()) + 1);
        } else {
            resdate += type + "0" + (parseInt(this.getMonth()) + 1);
        }
        if (this.getDate() > 9) {
            resdate += type + this.getDate();
        } else {
            resdate += type + "0" + this.getDate();
        }
        return resdate;
    }

//获得日期的的信息
Date.prototype.GetFestivalInfo=function () {
    // body...
    return $.GetFestivalInfo(this);
}


    //字符日期的格式化
String.prototype.DateStringFormater = function(y, m, d, t) {
        var year = y || 4;
        var month = m || 2;
        var day = d || 2;
        var type = t || "-";
        return this.substring(0, year) + type + this.substring(year, year + month) + type + this.substring(year + month,year + month + day);

    }
String.prototype.DateStringFormaterDate = function(y, m, d, t) {
        var year = y || 4;
        var month = m || 2;
        var day = d || 2;
        var type = t || "-";
        return new Date(this.substring(0, year) + type + this.substring(year, year + month) + type + this.substring(year + month,year + month + day));

    }


    //
    //#region IE7下面的Date的使用，可以写成判断当前的浏览器的功能
function NewDate(str) {
        str = str.split('-');
        var date = new Date();
        date.setUTCFullYear(str[0], str[1] - 1, str[2]);
        date.setUTCHours(0, 0, 0, 0);
        return date;
    }
    /**Parses string formatted as YYYY-MM-DD to a Date object.
     * If the supplied string does not match the format, an
     * invalid Date (value NaN) is returned.
     * @param {string} dateStringInRange format YYYY-MM-DD, with year in
     * range of 0000-9999, inclusive.
     * @return {Date} Date object representing the string.
     */
function parseISO8601(dateStringInRange) {
        var isoExp = /^s*(d{4})-(dd)-(dd)s*$/,
            date = new Date(NaN),
            month,
            parts = isoExp.exec(dateStringInRange);
        if (parts) {
            month = +parts[2];
            date.setFullYear(parts[1], month - 1, parts[3]);
            if (month != date.getMonth() + 1) {
                date.setTime(NaN);
            }
        }
        return date;
    }
    //#endregion
