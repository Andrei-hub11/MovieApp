using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Models;


[Table("Seat")]
public class SeatModel
{
    public Guid Id { get; set; }
    public bool IsReserved { get; set; }
    public List<string> SeatNumber { get; set; }
    public decimal SeatPrice { get; set; }
    public Guid RoomId { get; set; }
    [JsonIgnore]
    public RoomModel Room { get; set; }
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