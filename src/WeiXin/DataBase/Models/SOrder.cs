using System;
using System.Collections.Generic;

namespace DataBase.Models
{
    public partial class SOrder
    {
        public int ID { get; set; }
        public string OrderNum { get; set; }
        public string OrderStatus { get; set; }
        public Nullable<System.DateTime> CreateDate { get; set; }
        public Nullable<System.DateTime> OrderDate { get; set; }
        public string MemberId { get; set; }
        public string MemberName { get; set; }
    }
}
