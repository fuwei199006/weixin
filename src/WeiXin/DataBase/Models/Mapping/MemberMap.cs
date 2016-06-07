using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace DataBase.Models.Mapping
{
    public class MemberMap : EntityTypeConfiguration<Member>
    {
        public MemberMap()
        {
            // Primary Key
            this.HasKey(t => t.ID);

            // Properties
            this.Property(t => t.MemberId)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.MemberName)
                .HasMaxLength(50);

            this.Property(t => t.MemberPhone)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.MemberEmail)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.MemberLevel)
                .HasMaxLength(10);

            this.Property(t => t.MemberStatus)
                .HasMaxLength(10);

            // Table & Column Mappings
            this.ToTable("Member");
            this.Property(t => t.ID).HasColumnName("ID");
            this.Property(t => t.MemberId).HasColumnName("MemberId");
            this.Property(t => t.MemberName).HasColumnName("MemberName");
            this.Property(t => t.MemberPhone).HasColumnName("MemberPhone");
            this.Property(t => t.MemberEmail).HasColumnName("MemberEmail");
            this.Property(t => t.MemberLevel).HasColumnName("MemberLevel");
            this.Property(t => t.CreateDate).HasColumnName("CreateDate");
            this.Property(t => t.MemberStatus).HasColumnName("MemberStatus");
        }
    }
}
