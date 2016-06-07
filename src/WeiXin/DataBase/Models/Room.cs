using System;
using System.Collections.Generic;

namespace DataBase.Models
{
    public partial class Room
    {
        public int ID { get; set; }
        public string RoomType { get; set; }
        public string RoomePrice { get; set; }
        public string RoomDesc { get; set; }
        public string RoomData { get; set; }
        public Nullable<System.DateTime> CreateDate { get; set; }
        public Nullable<System.DateTime> StartDate { get; set; }
        public Nullable<System.DateTime> EndDate { get; set; }
    }
}
