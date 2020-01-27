using Microsoft.EntityFrameworkCore;
using iCloset.Models;

namespace iCloset.DataAccess
{
    public class ClothsyDBContext : DbContext
    {

        public ClothsyDBContext()
        {

        }
        public ClothsyDBContext(DbContextOptions<ClothsyDBContext> options) : base(options)
        {

        }
        public virtual DbSet<User> AppUser { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity => 
            {
                entity.Property(e => e.ID).HasColumnName("ID");
                entity.HasKey(e => e.ID);
                entity.Property(e => e.FirstName).HasColumnName("FirstName");
                entity.Property(e => e.LastName).HasColumnName("LastName");
                entity.Property(e => e.Email).HasColumnName("Email");
            });
        }
    }
}