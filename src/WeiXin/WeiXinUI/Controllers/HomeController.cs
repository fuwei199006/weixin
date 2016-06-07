using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Calayr.Common;
using DataBase.Common;

namespace WeiXinUI.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }

        public virtual ActionResult VerifyImage()
        {
            var validateCodeType = new ValidateCode_Style10();
            string code = "6666";
            byte[] bytes = validateCodeType.CreateImage(out code);
            Cookie.Save("VerifyCode", code, 1);//保存验证码


            return File(bytes, @"image/jpeg");
        }
        public string LoginIn(string userName, string pwd, string verifyCode)
        {

            if (!Cookie.GetValue("VerifyCode").Equals(verifyCode))
            {
                return "验证码不正确！";
            }
            else
            {
                if (userName == "admin" && pwd == "111")//登录成功后
                {
                    Cookie.Save("userName", userName);

                    //SaveLoginInfo();

                    return "OK";
                }
                else
                {
                    return "用户名或密码错误！";
                }
            }
        }
        public JsonResult GetMenu()
        {
            var menu = XmlOperate.LoadXmlMenu(Server.MapPath("~/MenuData/Menu.xml"));
            menu = menu.Replace("@", "");
            return Json(menu, JsonRequestBehavior.AllowGet);
        }


	}
}