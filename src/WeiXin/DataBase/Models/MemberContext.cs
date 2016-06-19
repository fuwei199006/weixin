using System.Data.Entity;
using DataBase.Models.Mapping;
using DataBase.Models;

namespace DataBase.Models
{
    public partial class MemberContext : DbContext
    {
        static MemberContext()
        {
            Database.SetInitializer<MemberContext>(null);
        }

        public MemberContext()
            : base("Name=MemberContext")
        {
        }

        public DbSet<Member> Members { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<SOrder> SOrders { get; set; }
        public DbSet<SOrderDetail> SOrderDetails { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new MemberMap());
            modelBuilder.Configurations.Add(new RoomMap());
            modelBuilder.Configurations.Add(new SOrderMap());
            modelBuilder.Configurations.Add(new SOrderDetailMap());
        }
    }
}
