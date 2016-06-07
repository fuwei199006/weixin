using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace DataBase.Models.Mapping
{
    public class RoomMap : EntityTypeConfiguration<Room>
    {
        public RoomMap()
        {
            // Primary Key
            this.HasKey(t => t.ID);

            // Properties
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

            // Table & Column Mappings
            this.ToTable("Room");
            this.Property(t => t.ID).HasColumnName("ID");
            this.Property(t => t.RoomType).HasColumnName("RoomType");
            this.Property(t => t.RoomePrice).HasColumnName("RoomePrice");
            this.Property(t => t.RoomDesc).HasColumnName("RoomDesc");
            this.Property(t => t.RoomData).HasColumnName("RoomData");
            this.Property(t => t.CreateDate).HasColumnName("CreateDate");
            this.Property(t => t.StartDate).HasColumnName("StartDate");
            this.Property(t => t.EndDate).HasColumnName("EndDate");
        }
    }
}
