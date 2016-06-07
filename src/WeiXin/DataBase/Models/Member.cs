using System;
using System.Collections.Generic;

namespace DataBase.Models
{
    public partial class Member
    {
        public int ID { get; set; }
        public string MemberId { get; set; }
        public string MemberName { get; set; }
        public string MemberPhone { get; set; }
        public string MemberEmail { get; set; }
        public string MemberLevel { get; set; }
        public Nullable<System.DateTime> CreateDate { get; set; }
        public string MemberStatus { get; set; }
    }
}
