//1、用于清空数组

//Js代码  收藏代码
Array.prototype.clear = function() {
    this.length = 0;
}; //2、判断数据项在数组中的位置
var oldArrayIndexOf = Array.indexOf; //判断是否原始浏览器是否存在indexOf方法
Array.prototype.indexOf = function(obj) {
    if (!oldArrayIndexOf) {
        for (var i = 0, imax = this.length; i < imax; i++) {
            if (this[i] === obj) {
                return i;
            }
        }
        return -1;
    } else {
        return oldArrayIndexOf(obj);
    }
}; //3、判断数据项是否在该数组中
Array.prototype.contain = function(obj) {
    returnthis.indexOf(obj) !== -1;
}; //4、把数据项添加到指定的位置
Array.prototype.insertAt = function(index, obj) {
    if (index < 0) index = 0;
    if (index > this.length) index = this.length;
    this.length++;
    for (var i = this.length - 1; i > index; i--) {
        this[i] = this[i - 1];
    }
    this[index] = obj;
}; //5、返回最有一项数据
Array.prototype.last = function() {
    return this[this.length - 1];
}; //6、移除数组指定索引的值
Array.prototype.removeAt = function(index) {
    if (index < 0 || index >= this.length) return;
    var item = this[index];
    for (var i = index, imax = this.length - 2; i < imax; i++) {
        this[i] = this[i + 1];
    }
    this.length--;
    returnitem;
}; //7、移除数据项的数据
Array.prototype.removeAt = function(obj) {
    var index = this.indexOf(obj);
    if (index >= 0)
        this.removeAt(index);
}; //$(function () {
//    $("tr:even").addClass("tr_color");
//    $("#tb a").mouseover(function (e) {
//        var toolTip = "<div id='tooltip' width='100px' height='12px' style='position:absolute;border:solid #aaa 1px;background-color:#F9F9F9'>" + $(this).html() + "</div>";
//        $("body").append(toolTip);
//        $("#tooltip").css({
//            "top": e.pageY + "px",
//            "left": e.pageX + "px"
//        });
//        $("#tb a").mouseout(function () {
//            $("#tooltip").remove();
//        });
//        $("#tb a").mousemove(function (e) {
//            $("#tooltip").css({
//                "top": (e.pageY + 5) + "px",
//                "left": (e.pageX + 2) + "px"
//            });
//        });
//    });
//});