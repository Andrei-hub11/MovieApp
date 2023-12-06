
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;


namespace Backend.Models;

[Table("Ticket")]
public class TicketModel
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public decimal AmountPaid { get; set; }
    public EventDateTime EventDateTime { get; set; }
    public List<string> PurchasedSeats { get; set; }
    public bool IsUsed { get; set; }
    public DateTime CreatedAt { get; set; }
    public string UserId { get; set; }
    [JsonIgnore]
    public ApplicationUser User { get; set; }
}

public class EventDateTime
{
    public DateTime Date { get; set; }
    public TimeSpan Time { get; set; }
}


