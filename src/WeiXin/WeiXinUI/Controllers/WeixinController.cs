using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DataBase.Models;
using Newtonsoft.Json;

namespace WeiXinUI.Controllers
{
    public class WeixinController : BaseController
    {
        //
        // GET: /Weixin/
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Search()
        {
            return View();
        }

        public ActionResult Detail()
        {
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }

        public ActionResult Register()
        {
            return View();
        }
        public JsonResult GetHotelList()
        {
            return Json("");
        }


        public string AddOrder(string order,int roomId)
        {
            var room = RoomRepository.LoadEntities(r => r.ID == roomId).FirstOrDefault();
            var orderEntity = JsonConvert.DeserializeObject<SOrder>(order);
            var orderDetailEntity = JsonConvert.DeserializeObject<SOrderDetail>(order);
            orderEntity.CreateDate=DateTime.Now;
            orderDetailEntity.CreateDate=DateTime.Now;
            
            SOrderRepository.AddEntity(orderEntity);
            SOrderDetailRepository.AddEntity(orderDetailEntity);
            return OK;
        }

        public JsonResult GetMemberByPhoneOrWeixinNum(string phoneOrWeixinNum)
        {
           return Json(MemberRepository.LoadEntities(r => r.MemberPhone == phoneOrWeixinNum).FirstOrDefault());
        }

        //public JsonResult GetOrderByMemberIdOrPhone(string memberIdOrPhone)
        //{
        //    return Json(SOrderRepository.)
        //}
	}
}