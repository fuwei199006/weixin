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

//获得本季度的开始月份
function getQuarterStartMonth() {
    if (nowMonth <= 2) {
        return 0;
    } else if (nowMonth <= 5) {
        return 3;
    } else if (nowMonth <= 8) {
        return 6;
    } else {
        return 9;
    }
}

//周一
function getWeekStartDate() {
    return AddDays(now, -nowDayOfWeek);
}

//周日。本周一+6天
function getWeekEndDate() {
    return AddDays(getWeekStartDate(), 6);
}

//月初
function getMonthStartDate() {
    return new Date(nowYear, nowMonth, 1);
}

//月末。下月初-1天
function getMonthEndDate() {
    return AddDays(AddMonths(getMonthStartDate(), 1), -1);
}

//季度初
function getQuarterStartDate() {
    return new Date(nowYear, getQuarterStartMonth(), 1);
}

//季度末。下季初-1天
function getQuarterEndDate() {
    return AddDays(AddMonths(getQuarterStartDate(), 3), -1);
}

//用JS计算两个日期之间有多少个休息日
function weekendBetween(dtStart, dtEnd) {
    if (typeof dtEnd == "string") dtEnd = StringToDate(dtEnd);
    if (typeof dtStart == "string") dtStart = StringToDate(dtStart);
    var days = parseInt((dtEnd - dtStart) / 86400000);
    var adds = 0;
    var m = (days + dtStart.getDay() + 1) % 7;
    if (m > 0) adds = m;
    if (m > 2) adds = 2;
    var redu = 0;
    if (dtStart.getDay() > 0) redu = 2;
    if (dtStart.getDay() == 1) redu = 1;
    var subtotal = parseInt((days + dtStart.getDay() + 1) / 7) * 2;
    return subtotal - redu + adds;
}

function StringToDate(DateStr) {
    var converted = Date.parse(DateStr);
    var myDate = new Date(converted);
    if (isNaN(myDate)) {
        var arys = DateStr.split("-");
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
function getDayRange(starDay, endDay) {
    starDay = new Date(starDay);
    endDay = new Date(endDay);
    var days = endDay.getTime() - starDay.getTime();
    var time = parseInt(days / (1000 * 60 * 60 * 24));
    return time;
}

//日期格式化 type="-","/","",
function format(date, type) {
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