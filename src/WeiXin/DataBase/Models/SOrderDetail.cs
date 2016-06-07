using System;
using System.Collections.Generic;

namespace DataBase.Models
{
    public partial class SOrderDetail
    {
        public int ID { get; set; }
        public string OrderDetailNum { get; set; }
        public string OrderDetailStatus { get; set; }
        public Nullable<System.DateTime> CreateDate { get; set; }
        public Nullable<int> RoomId { get; set; }
        public string RoomType { get; set; }
        public string RoomePrice { get; set; }
        public string RoomDesc { get; set; }
        public string RoomData { get; set; }
        public string MemberId { get; set; }
        public string MemberName { get; set; }
    }
}
