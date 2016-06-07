$(function() {
    // body...
    // Initiate();
    // 
    //数据的组装
    //
    var dicTotal = new Dictionary();
    for (var j = 0; j < 100; j++) {
        var eDsy = new Dictionary();
        for (var i = 1; i < 32; i++) {
            var c = {
                "Error1": "请假" + i,
                "Error2": "出差" + i
            };
            eDsy.put("2014-11-" + i, c);
        };
        dicTotal.put("user" + j, eDsy.data);
    }
    TotalCalayr.Data = dicTotal;
    Initiate();
    $("#testDb TD").mousemove(function(e) {
        /* Act on the event */
        //详细信息的Div的处理
        $("#divInfoDetail").show();
        $("#divInfoDetail").css({
            "top": e.pageY + "px",
            "left": e.pageX + "px"
        });
    });
    $("#testDb TD").mouseout(function(e) {
        /* Act on the event */
        // $("#divInfoDetail").html("dafsdfasdfas");
        $("#divInfoDetail").hide("slow/400/fast", function() {});
        //$("#divInfoDetail").remove();
    });
    $("#testDb TD").mouseover(function(e) {
        $("#divInfoDetail").show();
        $("#divInfoDetail").css({
            "top": e.pageY + "px",
            "left": e.pageX + "px"
        });
    });
});

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
        // if(cs.Istd1==1)
        // if (cs.Istd1 == 1) tdCalayr.html("AM");
        // else tdCalayr.html("PM");
        tdCalayr.html(cs._text);
        return tdCalayr[0].outerHTML;
    };
}

CrSetTitile.prototype = new TileCalayr();

function CrSetTitile() {
    // body...
    this.divTitle = {};
    this.SetTitle = function() {
        var dayCount = getDaysInMonth();
        for (var i = 0; i < dayCount + 1; i++) {
            var cs = new cssInfo();
            cs._width = 100;
            cs._height = 40;
            cs.Istitle = 1; //这里是表头
            if (i == 0) {
                cs.IsFirst = 1;
                cs._width += 100;
                cs._text = parseInt(new Date().getMonth()) + 1 + "月"; //0列显示人名,首行显示日历时间，只有一个单元格
                var div1 = this.CrStd(cs);
                this.divTitle[i] = div1;
            } else {
                cs._text = i;
                var div1 = this.CrStd(cs);
                this.divTitle[i] = div1;
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
        var dayCount = getDaysInMonth();
        for (var i = 0; i < dayCount + 1; i++) {
            var cs = new cssInfo();
            cs._width = 100;
            cs._height = 40;
            if (i == 0) {
                cs.IsFirst = 1;
                cs._width += 50;
                cs._text = key; //0列显示人名,首行显示日历时间，只有一个单元格
                cs.IsUserDiv = 1;
                var sd = new TableCalayr();
                var div1 = sd.CrStd(cs);
                this.divCell[i] = div1;
            } else {
                cs.IsFirst = i;
                var _key = GetKey(i);
                cs._text = sData[_key]["Error1"];
                cs.Istd1 = 1;
                var div1 = this.DCreateCell(cs);
                this.divCell[i + 1] = div1;
                //CS2的修改
                var cs2 = new cssInfo();
                cs.Istd1 = 2;
                cs2._width = cs._width;
                cs2._height = cs._height;
                cs2._text = sData[_key]["Error2"];
                cs2.IsFirst = i;
                var div2 = this.DCreateCell(cs2);
                this.divCell2[i] = div2;
            }
        }
    };
    this.SettrAttr = function() {
        // body...
        for (var i = 0; i < TotalCalayr.Data.keys.length; i++) {
            try {
                var html = "<tr>";
                this.SetCell(TotalCalayr.Data.data[TotalCalayr.Data.keys[i]], TotalCalayr.Data.keys[i]); //此处有个问题，等数据格式定下来再修改//////
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
            } catch (error) {
            }
        }
        $.each(TotalCalayr.Data.keys, function(indexd, vald) {
            /* iterate through array or object */
            // alert(this);
            TotalCalayr.Data[vald];
        });
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