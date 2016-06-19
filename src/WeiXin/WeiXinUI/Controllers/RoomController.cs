using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DataBase.Models;
using Newtonsoft.Json;

namespace WeiXinUI.Controllers
{
    public class RoomController : BaseController
    {
        //
        // GET: /Room/
        public ActionResult GetHome()
        {
            return View();
        }

        public ActionResult Order()
        {
            return View();
        }

        public JsonResult GetHotelInfo()
        {
            try
            {
                var list = RoomRepository.LoadEntities().ToList();
                return Json(list.Select(x=>new
                {
                    x.ID,
                     x.RoomType,x.RoomData,x.RoomDesc,x.RoomePrice,
                     CreateDate = x.CreateDate.HasValue ? x.CreateDate.Value.ToString("yyyy-MM-dd") : "",
                     StartDate=x.StartDate.HasValue?x.StartDate.Value.ToString("yyyy-MM-dd"):"",
                     EndDate = x.EndDate.HasValue ? x.EndDate.Value.ToString("yyyy-MM-dd") : ""
                }));
            }
            catch (Exception)
            {  
                
                throw;
            }
         
        }
 

        [HttpPost]
        public string DeleteRole(int id)
        {
            var entity = RoomRepository.LoadEntities(r => r.ID == id).FirstOrDefault();
            RoomRepository.DeleteEntity(entity);
            return "OK";

        }

        public ActionResult AddRole()
        {
          
            return View();
        }
        [HttpPost]
        public string AddRole(string formCollect)
        {
            var entity = JsonConvert.DeserializeObject<Room>(formCollect);
            RoomRepository.AddEntity(entity);
            return "OK";
        }
        [HttpPost]
        public string EdidRole(string formCollect,int id)
        {

            var entity = RoomRepository.LoadEntities(r => r.ID == id).FirstOrDefault();
            entity = JsonConvert.DeserializeObject<Room>(formCollect);
            RoomRepository.UpdateEntity(entity);
            return "OK";
        }

        /// <summary>
        /// 获得有效房间的列表
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetRoomList(int type,DateTime starDt,DateTime endDt)
        {
            if (type != null && type!=0)
            {
                var roomList = RoomRepository.LoadEntities(r => r.Category == type && r.StartDate.Value >= starDt && r.EndDate <= endDt&&r.RoomStatus==1).GroupBy(r => r.RoomType).ToDictionary(x => x.Key, u => u);
                return Json(roomList);
            }
            else
            {
                var roomList = RoomRepository.LoadEntities(r => r.StartDate.Value >= starDt && r.EndDate <= endDt && r.RoomStatus == 1).GroupBy(r => r.RoomType).ToDictionary(x => x.Key, u => u);
                return Json(roomList);
            }
          
        }


        public ActionResult EdidRole()
        {

            return View();
        }
    }
}