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

        public BaseRepository<Member> MemberRepository
        {
            // ReSharper disable once ObjectCreationAsStatement
            get
            {
               return new BaseRepository<Member>();
            }
        }

        public BaseRepository<Room> RoomRepository
        {
            // ReSharper disable once ObjectCreationAsStatement
            get
            {
                return new BaseRepository<Room>();
            }
        } 
	}
}