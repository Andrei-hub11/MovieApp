using Backend.Models;


namespace Backend.DTOs;

public record TicketDTO( string MovieTitle, string OrderId, string RoomNumber, decimal AmountPaid, EventDateTime EventDateTime, 
    string UserId, List<string> PurchasedSeats, Guid? Id = null, string? MovieSubtitle = null, 
    bool? IsUsed = null, DateTime? CreatedAt = null, DateTime? UpdateAt = null)
{
    public void Deconstruct(
     out List<string> purchasedSeats,
     out string title, out string subtitle, out decimal amountPaid, out string userId, out string orderid, out string roomnumber
   ) => (purchasedSeats, title, subtitle, amountPaid, userId, orderid, roomnumber) = (PurchasedSeats, MovieTitle, MovieSubtitle,
        AmountPaid, UserId, OrderId, RoomNumber);
}