using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Runtime.Remoting.Contexts;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using Calayr.Common;
using DataBase.Common;
using DataBase.Models;
using Cookie = DataBase.Common.Cookie;

namespace WeiXinUI.Controllers
{
	public class HomeController : BaseController
	{
		//
		// GET: /Home/
		public ActionResult Home()
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

	    public string IsLogin(string phone, string pwd)
	    {
	        var login = MemberRepository.LoadEntities(r => r.MemberPhone == phone && r.Password == pwd&&r.MemberStatus=="1").FirstOrDefault();
	        if (login!=null )
	        {
                Cookie.Save("userName", login.MemberName, 7 * 24);
                Cookie.Save("MemberId", login.MemberId, 7 * 24);
                Cookie.Save("phone", login.MemberPhone, 7 * 24);
                
                return OK;
            }
	        return string.Empty;
	    }

	    public string GetRadom(int n)
	    {
	        var str = string.Empty;
            var r = new Random();
	        for (var i = 0; i < n; i++)
	        {
                
	            str += r.Next(10);
	        }
	        return str;
	    }
        //public string SentMsg(string phone)
        //{
        //    string mobile = phone,
        //    con = "【昇悦酒店】您的验证码是：" + GetRadom(6) + "，3分钟内有效。如非您本人操作，可忽略本消息。",
        //    uid = "FohNhxE0x0ho",
        //    pas = "tkz687kc",
        //    url = "http://api.weimi.cc/2/sms/send.html";
        //    byte[] byteArray = Encoding.UTF8.GetBytes("mob=" + mobile + "&con=" + con + "&uid=" + uid + "&pas=" + pas + "&type=json");
        //    HttpWebRequest webRequest = (HttpWebRequest)WebRequest.Create(new Uri(url));
        //    webRequest.Method = "POST";
        //    webRequest.ContentType = "application/x-www-form-urlencoded";
        //    webRequest.ContentLength = byteArray.Length;
        //    Stream newStream = webRequest.GetRequestStream();
        //    newStream.Write(byteArray, 0, byteArray.Length);
        //    newStream.Close();
        //    HttpWebResponse response = (HttpWebResponse)webRequest.GetResponse();
        //    StreamReader php = new StreamReader(response.GetResponseStream(), Encoding.UTF8);
        //    string Message = php.ReadToEnd();
        //    return OK;
        //}
        public string SentMsg(string phone)
        {
            var code = GetRadom(6);
            string mobile = phone,
                con = "您的验证码是：【"+code+"】。请不要把验证码泄露给其他人。如非本人操作，可不用理会";
            sms.smsSoapClient client=new sms.smsSoapClient();
          var res=  client.Submit("dahaia", "fw199006", phone, con);
            Cookie.Save("code",code);
            return OK;
        }

	    public string Register(string phone, string pwd,string userName)
	    {
	        var _member = MemberRepository.LoadEntities(r => r.MemberPhone == phone && r.MemberStatus == "1").FirstOrDefault();
	        if (_member != null) return "1";
	        var member=new Member()
	        {
                MemberName = userName,
                MemberEmail = "",
	            MemberPhone = phone,
                MemberStatus = "1",
                MemberId = GetRadom(8),
                MemberLevel = "A",
                CreateDate = DateTime.Now,
                Password = pwd
                
	        };

	        MemberRepository.AddEntity(member);
	        return OK;
	    }

	}
}