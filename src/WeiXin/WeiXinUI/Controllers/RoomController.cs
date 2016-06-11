using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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

        public JsonResult GetHotelInfo()
        {
            try
            {
                var list = RoomRepository.LoadEntities().ToList();
                return Json(list.Select(x=>new
                {
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

        public ActionResult DeleteRole()
        {
            return View();

        }

        public ActionResult AddRole()
        {
            return View();
        }

        public ActionResult EdidRole()
        {
            return View();
        }
    }
}