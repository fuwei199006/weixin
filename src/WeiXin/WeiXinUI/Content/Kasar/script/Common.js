/* 
 * @Author: anchen
 * @Date:   2015-03-04 13:46:42
 * @Last Modified by:   anchen
 * @Last Modified time: 2015-03-06 14:21:45
 */


//BlockUI
function BlockUI() {

    var msg = arguments[0] || "";
    if (msg != "") {
        $.blockUI({
             
            message: '<h4><img src="Images/loading/loading.gif" /><br/>' + msg + '</h4>'
        });

    } else {
        $.blockUI({
           
            message: '<h4><img src="Images/loading/loading.gif" /><br/>loading......</h4>'
        });
    }

}


//得到从0-n-1的随机数
function GetRandom(n)
{
    
    return Math.floor(Math.random()*n);
 
}