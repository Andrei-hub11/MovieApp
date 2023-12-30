using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Reflection.Emit;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System.Reflection.Metadata;

namespace Backend.Context;

public class AccountDBContext: IdentityDbContext<ApplicationUser>
{
    public DbSet<TicketModel> Tickets { get; set; }
    public AccountDBContext(DbContextOptions<AccountDBContext> options) : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
       

        // Configurar a relação entre Ticket e User
        builder.Entity<TicketModel>()
            .HasOne(ticket => ticket.User)
            .WithMany(u => u.Tickets)
            .HasForeignKey(ticket => ticket.UserId);


        builder.Entity<TicketModel>(entity =>
        {
            entity.Property(ticket => ticket.Id)
              .HasDefaultValueSql("NEWID()");
            entity.Property(ticket => ticket.MovieTitle)
               .IsRequired()
               .HasMaxLength(30);
            entity.Property(ticket => ticket.MovieTitle)
                .IsRequired()
                .HasMaxLength(30);

            entity.Property(ticket => ticket.OrderId).IsRequired().HasMaxLength(14);
            entity.Property(ticket => ticket.RoomNumber).IsRequired();

            entity.OwnsOne(ticket => ticket.EventDateTime, eventDateTime =>
            {
                eventDateTime.Property(ed => ed.Date).IsRequired().HasColumnName("EventDate");
                eventDateTime.Property(ed => ed.Time).IsRequired().HasColumnName("EventTime");
            });


            entity.Property(ticket => ticket.IsUsed)
                .IsRequired()
                .HasDefaultValue(false);

            var stringListConverter = new ValueConverter<List<string>, string>(
     v => string.Join(',', v),
     v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList()
 );

            entity.Property(ticket => ticket.PurchasedSeats).IsRequired().
            HasConversion(stringListConverter).Metadata.
            SetValueComparer(new TicketListValueComparer());

            entity.Property(ticket => ticket.AmountPaid)
                .IsRequired().HasColumnType("decimal(18, 2)");

            entity.Property(ticket => ticket.CreatedAt)
            .HasDefaultValueSql("GETDATE()");
            entity.Property(ticket => ticket.UpdatedAt)
    .HasDefaultValueSql("GETDATE()")
    .ValueGeneratedOnUpdate();
           entity
        .ToTable(Tickets => Tickets.HasTrigger("Ticket_UPDATE"));

            entity.ToTable(Tickets => Tickets.HasCheckConstraint("CK_EventDateTime_InFuture",
             "EventDate > GETDATE()"));
        });
       
    }
}


public class TicketListValueComparer : ValueComparer<List<string>>
{
    public TicketListValueComparer() : base(
        (c1, c2) => c1.SequenceEqual(c2),
        c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
        c => c.ToList())
    {
    }
}