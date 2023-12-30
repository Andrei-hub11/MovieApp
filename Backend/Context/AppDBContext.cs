using System.Collections.Generic;
using System;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System.Reflection.Emit;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata;

namespace Backend.Context;

public class AppDBContext: DbContext
{
    public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
    {
    }
    public DbSet<SeatModel> Seats { get; set; }
    public DbSet<RoomModel> Room { get; set; }
    public DbSet<GiftCardModel> GiftCard { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {

        builder.Entity<RoomModel>()
       .HasMany(room => room.Seats) // Uma sala tem muitos assentos
       .WithOne(seat => seat.Room)  // Um assento pertence a uma sala
       .HasForeignKey(seat => seat.RoomId); //


        builder.Entity<RoomModel>()
        .Property(room => room.Id)
        .HasDefaultValueSql("NEWID()");
        builder.Entity<SeatModel>()
            .Property(s => s.Id)
            .HasDefaultValueSql("NEWID()");
        builder.Entity<RoomModel>()
       .Property(room => room.EventDateTime).IsRequired();
        builder.Entity<RoomModel>()
     .Property(room => room.MovieTitle).IsRequired();
        builder.Entity<RoomModel>()
      .Property(room => room.RoomNumber).IsRequired();
        builder.Entity<RoomModel>()
   .Property(room => room.MovieCategory).IsRequired();
        builder.Entity<RoomModel>().Property(room => room.CreatedAt)
  .HasDefaultValueSql("GETDATE()");
        builder.Entity<RoomModel>().Property(room => room.UpdatedAt)
 .HasDefaultValueSql("GETDATE()")
 .ValueGeneratedOnUpdate();
        builder.Entity<RoomModel>()
        .ToTable(room => room.HasTrigger("Room_UPDATE"));

        builder.Entity<SeatModel>()
           .Property(s => s.SeatNumber).IsRequired();

        
        var stringListConverter = new ValueConverter<List<string>, string>(
        v => string.Join(',', v),
        v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList()
    );

        builder.Entity<SeatModel>()
            .Property(e => e.SeatNumber)
            .HasConversion(stringListConverter).Metadata.
            SetValueComparer( new StringListValueComparer());
        builder.Entity<SeatModel>()
            .Property(s => s.SeatPrice)
            .IsRequired()
                .HasColumnType("decimal(18, 2)") // Define o tipo decimal no banco de dados
                .HasPrecision(18, 2);
        builder.Entity<SeatModel>().
           ToTable(seat => seat
           .HasCheckConstraint("CK_Seating_SeatPrice", "SeatPrice > 0.01"));

        builder.Entity<GiftCardModel>()
      .Property(room => room.Id)
      .HasDefaultValueSql("NEWID()");
        builder.Entity<GiftCardModel>().Property(gift => gift.IsUsed)
            .IsRequired()
            .HasDefaultValue(false);
        builder.Entity<GiftCardModel>().Property(gift => gift.GiftCodigo).HasDefaultValueSql("NEWID()");
        builder.Entity<GiftCardModel>().Property(gift => gift.CreatedAt)
.HasDefaultValueSql("GETDATE()");
        builder.Entity<GiftCardModel>().Property(gift => gift.UpdatedAt)
 .HasDefaultValueSql("GETDATE()")
 .ValueGeneratedOnUpdate();
     builder.Entity<GiftCardModel>()
      .ToTable(gift => gift.HasTrigger("GiftCard_UPDATE"));


        base.OnModelCreating(builder);
    }

}

public class StringListValueComparer : ValueComparer<List<string>>
{
    public StringListValueComparer() : base(
        (c1, c2) => c1.SequenceEqual(c2),
        c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
        c => c.ToList())
    {
    }
}