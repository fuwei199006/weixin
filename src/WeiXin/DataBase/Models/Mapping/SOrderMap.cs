using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using DataBase.Models;

namespace DataBase.Models.Mapping
{
    public class SOrderMap : EntityTypeConfiguration<SOrder>
    {
        public SOrderMap()
        {
            // Primary Key
            this.HasKey(t => t.ID);

            // Properties
            this.Property(t => t.OrderNum)
                .IsRequired()
                .HasMaxLength(8);

            this.Property(t => t.OrderStatus)
                .HasMaxLength(4);

            this.Property(t => t.MemberId)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.MemberName)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("SOrder");
            this.Property(t => t.ID).HasColumnName("ID");
            this.Property(t => t.OrderNum).HasColumnName("OrderNum");
            this.Property(t => t.OrderStatus).HasColumnName("OrderStatus");
            this.Property(t => t.CreateDate).HasColumnName("CreateDate");
            this.Property(t => t.OrderDate).HasColumnName("OrderDate");
            this.Property(t => t.MemberId).HasColumnName("MemberId");
            this.Property(t => t.MemberName).HasColumnName("MemberName");
        }
    }
}
