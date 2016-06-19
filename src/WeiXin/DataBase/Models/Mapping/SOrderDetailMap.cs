using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using DataBase.Models;

namespace DataBase.Models.Mapping
{
    public class SOrderDetailMap : EntityTypeConfiguration<SOrderDetail>
    {
        public SOrderDetailMap()
        {
            // Primary Key
            this.HasKey(t => t.ID);

            // Properties
            this.Property(t => t.OrderDetailNum)
                .IsRequired()
                .HasMaxLength(8);

            this.Property(t => t.OrderDetailStatus)
                .HasMaxLength(4);

            this.Property(t => t.RoomType)
                .IsRequired()
                .HasMaxLength(10);

            this.Property(t => t.RoomePrice)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.RoomDesc)
                .HasMaxLength(500);

            this.Property(t => t.RoomData)
                .HasMaxLength(500);

            this.Property(t => t.MemberId)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.MemberName)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("SOrderDetail");
            this.Property(t => t.ID).HasColumnName("ID");
            this.Property(t => t.OrderDetailNum).HasColumnName("OrderDetailNum");
            this.Property(t => t.OrderDetailStatus).HasColumnName("OrderDetailStatus");
            this.Property(t => t.CreateDate).HasColumnName("CreateDate");
            this.Property(t => t.RoomId).HasColumnName("RoomId");
            this.Property(t => t.RoomType).HasColumnName("RoomType");
            this.Property(t => t.RoomePrice).HasColumnName("RoomePrice");
            this.Property(t => t.RoomDesc).HasColumnName("RoomDesc");
            this.Property(t => t.RoomData).HasColumnName("RoomData");
            this.Property(t => t.MemberId).HasColumnName("MemberId");
            this.Property(t => t.MemberName).HasColumnName("MemberName");
            this.Property(t => t.OrderId).HasColumnName("OrderId");
        }
    }
}
