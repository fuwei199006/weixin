
var __Period;

function SetInfo(data, per) {
    __Period = per;
    TotalCalayr.Data = data;
    Initiate();

    return $("#testDb")[0].outerHTML;
    //$("#testDb TD").mousemove(function (e) {
    //    /* Act on the event */
    //    //详细信息的Div的处理
    //    $("#divInfoDetail").show();
    //    $("#divInfoDetail").css({
    //        "top": (e.pageY + 5) + "px",
    //        "left": (e.pageX + 5)+ "px"
    //    });
    //});
    //$("#testDb TD").mouseout(function (e) {
    //    /* Act on the event */
    //    // $("#divInfoDetail").html("dafsdfasdfas");
    //    $("#divInfoDetail").hide('slow/400/fast', function () { });
    //    //$("#divInfoDetail").remove();
    //});
    //$("#testDb TD").mouseover(function (e) {
    //    $("#divInfoDetail").show('slow/400/fast', function () { });
    //    $("#divInfoDetail").css({
    //        "top": (e.pageY + 5) + "px",
    //        "left": (e.pageX + 5) + "px"
    //    });
    //});
}

function Initiate() {
    //起始页面的HtmL的生成
    var cTable = $("<table></table>");
    cTable.attr({
        id: "testDb",
        class: "fc-border-separate"
    });
    var tbody = $("<thead></thead>");
    var tr = $("<tr></tr>");
    tr.attr({
        id: "trTest",
        class: "fc-first fc-last"
    });
    tbody.append(tr);
    cTable.append(tbody);
    $("#cal").append(cTable);
    //表头的设计
    var CrTitle = new CrSetTitile();
    CrTitle.SetTitle();
    var div = CrTitle.divTitle;
    $.each(div, function(index, val) {
        /* iterate through array or object */
        $("#trTest").append(val);
    });
    //悬浮Div的设计 
    var divDetail = $("<div></div>");
    divDetail.attr({
        id: "divInfoDetail",
        style: "position:absolute;border:solid #aaa 1px;background-color:#F9F9F9;display:none;"
    });
    $("body").append(divDetail);
    $("#divInfoDetail").html("<br\>Detail1:MouseTest1<br\>Detail2:MouseTest2<br\>Detail3:MouseTest3<br\><br\>");
    //   /* Act on the event */
    //人员信息的添加
    var cl = new TotalCalayr();
    cl.SettrAttr();
    $.each(cl.trCell, function(index, val) {
        /* iterate through array or object */
        $("#testDb").append(val);
    });
}

//样式设定
function cssInfo() {
    this._height; //先定义下固定的
    this._width;
    this._text;
    this._color;
    this.IsUserDiv;
    this.Istitle;
    this.InfoDiv;
    this.IsFirst;
    this.Istd1; //是不是用第一个td
    this.IsError; //是不是异常
}

//创建一个DIV
function CrDivCalyr() {
    this.CreatDiv = function(cs) {
        // body...
        var calayrDiv = $("<div></div>");
        calayrDiv.html(cs._text);
        calayrDiv.height(cs._height);
        calayrDiv.width(cs._width);
        return calayrDiv[0].outerHTML;
    };
}

//继承div
TileCalayr.prototype = new CrDivCalyr();

//单元格 含有一个Div
//表头 
function TileCalayr() {
    this.CrStd = function(cs) {
        var tdCalayr = $("<th></th>");
        //表头只用th 不加DIV
        tdCalayr.addClass("fc-day-header fc-sun fc-widget-header"); //设置样式
        tdCalayr.html(cs._text);
        tdCalayr.height(cs._height);
        tdCalayr.width(cs._width);
        if (cs.IsFirst == 1) {
            tdCalayr.attr({
                colSpan: "2"
            });
        }
        return tdCalayr[0].outerHTML;
    };
}

TableCalayr.prototype = new CrDivCalyr();

//异常的内容修改
function TableCalayr() {
    this.CrStd = function(cs) {
        var tdCalayr = $("<th></th>");
        //表头只用th 不加DIV
        if (cs.IsUserDiv == 1) {
            tdCalayr.addClass("fc-day-header fc-sun fc-widget-header"); //设置样式
            tdCalayr.html(cs._text);
            tdCalayr.height(cs._height);
            tdCalayr.width(cs._width);
            //第一列的值的值 是行合并两行
            tdCalayr.attr({
                rowSpan: "2"
            });
        }
        return tdCalayr[0].outerHTML;
    };
}

//两个单元格
dtdCalayr.prototype = new CrDivCalyr();

//含有两个Div
function dtdCalayr() {
    this.DCreateCell = function(cs) {
        var tdCalayr = $("<td></td>");
        tdCalayr.width(cs._width);
        tdCalayr.height(cs._height);
        if (cs.IsError == 1) {
            tdCalayr.addClass("Error");
        }
        tdCalayr.html(cs._text);
        return tdCalayr[0].outerHTML;
    };
}

CrSetTitile.prototype = new TileCalayr();

function CrSetTitile() {
    // body...
    this.divTitle = new Array();
    this.SetTitle = function() {

        //var dayCount = getDaysInMonth();
        var range = getDayRange(__Period.MH020_START, __Period.MH020_END);
        for (var i = 0; i < range + 1; i++) {
            var cs = new cssInfo();
            cs._width = 100;
            cs._height = 60;
            cs.Istitle = 1; //这里是表头
            if (i == 0) {
                cs.IsFirst = 1;
                cs._width += 100;
                cs._text = __Period.MH020_YM; //0列显示人名,首行显示日历时间，只有一个单元格
                var div1 = this.CrStd(cs);
                this.divTitle[0] = div1;


                cs.IsFirst = 0;
                cs._width = 100;
                cs._height = 60;
                cs._text = format(AddDays(__Period.MH020_START, i), "-");;
                var div1 = this.CrStd(cs);
                this.divTitle.push(div1);
            } else {
                cs.IsFirst = 0;
                cs._text = format(AddDays(__Period.MH020_START, i), "-");;
                var div1 = this.CrStd(cs);
                this.divTitle.push(div1);
            }

        }
    };
}

//一个人的信息应该是占有一行包含<tr></tr>
//trCalayr.prototype= new DCalayr();
//总的单元格
TotalCalayr.prototype = new dtdCalayr();

function TotalCalayr() {
    this.divCell = new Array();
    this.divCell2 = new Array();
    this.trCell = new Array();
    this.SetCell = function(sData, key) {
        var td = $("<th></th>");
        td.html("AM");
        td.width(100);
        td.height(40);
        this.divCell[1] = td[0].outerHTML;
        td.html("PM");
        this.divCell2[0] = td[0].outerHTML;


        var range = getDayRange(__Period.MH020_START, __Period.MH020_END);


        var cs = new cssInfo();
        cs._width = 100;
        cs._height = 60;

        cs.IsFirst = 1;
        //cs._width += 50;
        cs._text = key; //0列显示人名,首行显示日历时间，只有一个单元格
        cs.IsUserDiv = 1;
        var sd = new TableCalayr();
        var div1 = sd.CrStd(cs);
        this.divCell[0] = div1;

        for (var i = 0; i < range + 1; i++) {
            var curday = format(AddDays(__Period.MH020_START, i), "-");
            var flag = false;


            /*2014-11-21
            *1、异常信息分为一天有两个异常时间段，一天有一个异常时间段、一天没有异常
            *2、异常有两个异常时间段包括，上午有多个异常，下午有多个异常
            *3、一天有一个异常时间段：上午有多个异常，下午有多个异常
            *
            */
            for (var j = 0; j < sData.length; j++) {
                if (sData[j].h11date == curday) { //说明这天有异常
                    flag = true;
                    var errorDesc; //异常的描述

                    if (sData[j].H111_ABNORMAL_REASON == null && sData[j].MH060_DESC == null) { //如果H111_ABNORMAL_REASON和MH060_DESC 描述都为空 说明异常没有确认
                        errorDesc = "异常未确认";
                    } else {
                        //如果描述不为空 先显示描述，如果描述为空 ，应该是休假占用异常
                        errorDesc = sData[j].MH060_DESC != null && sData[j].MH060_DESC != "" ? sData[j].MH060_DESC : sData[j].H111_ABNORMAL_REASON;
                    }
                    //一天有两个异常时间段
                    if ((sData[j + 1] != undefined && sData[j + 1].h11date == curday) || (sData[j - 1] != undefined && sData[j - 1].h11date == curday)) {

                        //有两个异常
                        if (sData[j].timeRange == "AM") { //上午的异常
                            cs.IsFirst = 0;
                            cs.IsError = 1;
                            cs._text = errorDesc; //sData[j].H111_ABNORMAL_REASON == null ? "异常未确认" : sData[j].H111_ABNORMAL_REASON;
                            cs.Istd1 = 1;
                            //如果上午多个异常,则在td内创建Div使用
                            if (sData[j].AMCOUNT > 1) {
                                var cDiv = "";
                                cs._height = cs._height / sData[j].AMCOUNT; //高度的平均化
                                for (var am = 0; am < sData[j].AMCOUNT; am++, j++) { //j++是路过后面的异常，因为在此已经加载
                                    cDiv += this.CreatDiv(cs);

                                }
                                cs._text = cDiv; //把样式里面的内容变成DivHtml
                            }
                            var div1 = this.DCreateCell(cs);
                            this.divCell.push(div1);
                        } else {
                            //CS2的修改
                            var cs2 = new cssInfo();
                            cs.Istd1 = 2;
                            cs2.IsError = 1;
                            cs2._width = cs._width;
                            cs2._height = cs._height;
                            cs2._text = errorDesc;
                            cs2.IsFirst = 0;
                            //注释同上
                            if (sData[j].PMCOUNT > 1) {
                                var cDiv = "";
                                cs2._height = cs._height / sData[j].PMCOUNT;
                                for (var am = 0; am < sData[j].PMCOUNT; am++, j++) {
                                    cDiv += this.CreatDiv(cs2);

                                }

                                cs2._text = cDiv;
                            }
                            var div2 = this.DCreateCell(cs2);
                            this.divCell2.push(div2);
                        }

                    } else {

                        //有一个异常
                        if (sData[j].timeRange == "AM") {
                            cs.IsFirst = 0;
                            cs.IsError = 1;
                            cs._text = errorDesc; // sData[j].H111_ABNORMAL_REASON == null ?  : sData[j].H111_ABNORMAL_REASON;
                            cs.Istd1 = 1;
                            if (sData[j].AMCOUNT > 1) {
                                var cDiv = "";
                                cs._height = cs._height / sData[j].AMCOUNT;
                                for (var am = 0; am < sData[j].AMCOUNT; am++, j++) {
                                    cDiv += this.CreatDiv(cs);
                                }

                                cs._text = cDiv;
                            }
                            var div1 = this.DCreateCell(cs);
                            this.divCell.push(div1);
                            //CS2的修改
                            var cs2 = new cssInfo();
                            cs2.IsError = 0;
                            cs2.Istd1 = 2;
                            cs2._width = cs._width;
                            cs2._height = cs._height;
                            cs2._text = "正常"; //sData[j].H111_ABNORMAL_REASON == null ? "异常未确认" : sData[j].H111_ABNORMAL_REASON;
                            cs2.IsFirst = 0;
                            var div2 = this.DCreateCell(cs2);
                            this.divCell2.push(div2);
                        } else {

                            cs.IsFirst = 0;
                            cs.IsError = 0;
                            cs._text = "正常"; //sData[j].H111_ABNORMAL_REASON == null ? "异常未确认" : sData[j].H111_ABNORMAL_REASON;
                            cs.Istd1 = 1;
                            var div1 = this.DCreateCell(cs);
                            this.divCell.push(div1);

                            //CS2的修改
                            var cs2 = new cssInfo();
                            cs2.Istd1 = 2;
                            cs2.IsError = 1;
                            cs2._width = cs._width;
                            cs2._height = cs._height;
                            cs2._text = errorDesc; // sData[j].H111_ABNORMAL_REASON == null ? "异常未确认" : sData[j].H111_ABNORMAL_REASON;
                            cs2.IsFirst = 0;
                            if (sData[j].PMCOUNT > 1) {
                                var cDiv = "";
                                cs2._height = cs._height / sData[j].PMCOUNT;
                                for (var am = 0; am < sData[j].PMCOUNT; am++, j++) {
                                    cDiv += this.CreatDiv(cs2);

                                }

                                cs2._text = cDiv;
                            }
                            var div2 = this.DCreateCell(cs2);
                            this.divCell2.push(div2);
                        }
                    }

                }

            }

            //没异常 
            if (!flag) {
                flag = false;
                cs.IsFirst = 0;
                cs.IsError = 0;
                cs._text = "正常"; //sData[i].H111_ABNORMAL_REASON;
                cs.Istd1 = 1;
                var div1 = this.DCreateCell(cs);
                this.divCell.push(div1);

                //CS2的修改
                var cs2 = new cssInfo();
                cs2.Istd1 = 2;
                cs2.IsError = 0;
                cs2._width = cs._width;
                cs2._height = cs._height;
                cs2._text = "正常"; // sData[i].H111_ABNORMAL_REASON;
                cs2.IsFirst = i;
                var div2 = this.DCreateCell(cs2);
                this.divCell2.push(div2);


            }


        }


    };
    this.SettrAttr = function() {
        // body...
        try {
            for (var i = 0; i < TotalCalayr.Data.length; i++) {

                var html = "<tr>";
                this.SetCell(TotalCalayr.Data[i], TotalCalayr.Data[i][0].H11_STAFF_NM); //此处有个问题，等数据格式定下来再修改//////
                $.each(this.divCell, function(index, val) {
                    /* iterate through array or object */
                    html += val;
                });
                html += "</tr>";
                html += "<tr>";
                $.each(this.divCell2, function(index, val) {
                    /* iterate through array or object */
                    if (val != "undefined" && val != undefined) {
                        html += val;
                    }
                });
                html += "</tr>";
                this.trCell[i] = html;
                this.divCell2.clear();
                this.divCell.clear();

            }
        } catch (error) {

            alert(error);
        }
        //$.each(TotalCalayr.Data.keys, function (indexd, vald) {
        //    /* iterate through array or object */
        //    // alert(this);
        //    TotalCalayr.Data[vald];
        //});
    };
}

//获得当月最大天数
function getDaysInMonth() {
    var nowDate = new Date();
    var year = nowDate.getYear();
    var month = parseInt(nowDate.getMonth()) + 1;
    month = parseInt(month, 10); //parseInt(number,type)这个函数后面如果不跟第2个参数来表示进制的话，默认是10进制。 
    var temp = new Date(year, month, 0);
    return temp.getDate();
}

function Dsy() {
    this.Items = {};
}

Dsy.prototype.add = function(id, iArray) {
    if (this.Exists(id)) {
        this.Items[id] = this.Items[id] + "," + JSON.stringify(iArray);
    } else {
        this.Items[id] = iArray;
    }
};
Dsy.prototype.Exists = function(id) {
    if (typeof (this.Items[id]) == "undefined") return false;
    return true;
};

//
function GetKey(i) {
    return "2014-11-" + i;
}

//字典定义
function Dictionary() {
    this.keys = new Array();
    this.data = new Array();
    //添加键值对
    this.put = function(key, value) {
        if (this.data[key] == null) { //如键不存在则身【键】数组添加键名
            this.keys.push(key);
        }
        this.data[key] = value; //给键赋值
    };
    //获取键对应的值
    this.get = function(key) {
        return this.data[key];
    };
    //判断是否存在
    this.hasKey = function(key) {
        return this.data[key] != null;
    };
    //去除键值，(去除键数据中的键名及对应的值)
    this.remove = function(key) {
        this.keys.remove(key);
        this.data[key] = null;
    };
    //判断键值元素是否为空
    this.isEmpty = function() {
        return this.keys.length == 0;
    };
    //获取键值元素大小
    this.size = function() {
        return this.keys.length;
    };
}