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
        public virtual DbSet<UserConversation> UserConversation { get; set; }
        public virtual DbSet<Message> Message { get; set; }
        public virtual DbSet<Conversation> Conversation { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity => 
            {
                entity.Property(e => e.ID).HasColumnName("ID")
                .HasDefaultValueSql("NEWID()");
                entity.HasKey(e => e.ID);
                entity.Property(e => e.FirstName).HasColumnName("FirstName");
                entity.Property(e => e.LastName).HasColumnName("LastName");
                entity.Property(e => e.Email).HasColumnName("Email");
                entity.Property(e => e.UserID).HasColumnName("UserID");
            });
            modelBuilder.Entity<UserConversation>(entity => 
            {
                entity.Property(e => e.ID).HasColumnName("ID")
                .HasDefaultValueSql("NEWID()");
                entity.HasKey(e => e.ID);
                entity.Property(e => e.ConvID).HasColumnName("ConvID");
                entity.Property(e => e.UserID).HasColumnName("UserID");
                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserConversation)
                    .HasForeignKey(d=>d.UserID)
                    .HasConstraintName("FK_User_Conv_User");
                entity.HasOne(d => d.Conversation)
                    .WithMany(p => p.UserConversation)
                    .HasForeignKey(d => d.ConvID)
                    .HasConstraintName("FK__USER_CONV__ConvI__5CD6CB2B");
            });
            modelBuilder.Entity<Conversation>(entity => 
            {
                entity.Property(e => e.ID).HasColumnName("ID")
                .HasDefaultValueSql("NEWID()");
                entity.HasKey("ID");
                entity.Property(e => e.StartDate).HasColumnName("startDate")
                .HasDefaultValueSql("SYSDATETIMEOFFSET()");
                entity.Property(e => e.Topic).HasColumnName("topic");
                
            });
            modelBuilder.Entity<Message>(entity =>
            {
                entity.Property(e => e.ID).HasColumnName("ID")
                .HasDefaultValueSql("NEWID()");
                entity.HasKey("ID");
                entity.Property(e => e.Body).HasColumnName("Body");
                entity.Property(e => e.MessageTimeStamp)
                    .HasColumnName("MessageTimeStamp")
                    .HasDefaultValueSql("GETDATE()");
                entity.Property(e => e.AuthorID).HasColumnName("AuthorID");
                entity.Property(e => e.ConversationID).HasColumnName("ConversationID");
                entity.HasOne(d => d.Conversation)
                    .WithMany(p => p.Message)
                    .HasForeignKey(d=>d.ConversationID)
                    .HasConstraintName("FK_MESSAGE_Convers619B8048");
            });
        }
    }
}