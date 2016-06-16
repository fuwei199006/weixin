using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DataBase.Models;
using Newtonsoft.Json;
using WebGrease.Css.Extensions;

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

        [HttpPost]
        public string AddOrder(string phone,int roomId,DateTime dt)
        {
            var room = RoomRepository.LoadEntities(r => r.ID == roomId).FirstOrDefault();
            var member = MemberRepository.LoadEntities(r => r.MemberPhone==phone).FirstOrDefault();
            var orderEntity=new SOrder()
            {
                OrderNum = "1",
                OrderStatus = "1001",
                CreateDate = DateTime.Now,
                OrderDate = dt,
                MemberId = member.MemberId,
                MemberName = member.MemberName
                
            };
         
            SOrderRepository.AddEntity(orderEntity);
            var entity = new SOrderDetail()
            {
                OrderId=orderEntity.ID,
                OrderDetailNum = "1",
                OrderDetailStatus = "1001",
                CreateDate = DateTime.Now,
                RoomId = roomId,
                RoomType = room.RoomType,
                RoomePrice = room.RoomePrice,
                RoomDesc = room.RoomDesc,
                RoomData = room.RoomData,
                MemberId = member.MemberId,
                MemberName = member.MemberName
            };
            SOrderDetailRepository.AddEntity(entity);
            return OK;
        }
        [HttpPost]
        public string PayOrder(int orderId)
        {
            var order = SOrderRepository.LoadEntities(r => r.ID == orderId).FirstOrDefault();
            order.OrderStatus = "1002";
            SOrderRepository.UpdateEntity(order);
            var sorderList= SOrderDetailRepository.LoadEntities(r => r.OrderId == orderId);
            sorderList.ForEach(u =>
             {
                 u.OrderDetailStatus = "1002";
                 
             });
            SOrderDetailRepository.UpdateEntities(sorderList);
            return OK;
        }


        public JsonResult GetMemberByPhoneOrWeixinNum(string phoneOrWeixinNum)
        {
           return Json(MemberRepository.LoadEntities(r => r.MemberPhone == phoneOrWeixinNum).FirstOrDefault());
        }

 
	}
}