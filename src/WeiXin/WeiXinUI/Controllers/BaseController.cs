using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DataBase.Dal;
using DataBase.Models;

namespace WeiXinUI.Controllers
{
    public class BaseController : Controller
    {

        public const string OK = "OK";
        public BaseRepository<Member> MemberRepository => new BaseRepository<Member>();
        public BaseRepository<Room> RoomRepository => new BaseRepository<Room>();
        public BaseRepository<SOrder> SOrderRepository => new BaseRepository<SOrder>();
        public BaseRepository<SOrderDetail> SOrderDetailRepository => new BaseRepository<SOrderDetail>();
        
    }
}