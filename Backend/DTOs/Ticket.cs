using Backend.Models;


namespace Backend.DTOs;

public record TicketDTO(string Title, string OrderId, string RoomNumber, decimal AmountPaid, EventDateTime EventDateTime, 
    string UserId, List<string> PurchasedSeats, string? Subtitle = null)
{
    public void Deconstruct(
     out List<string> purchasedSeats,
     out string title, out string subtitle, out decimal amountPaid, out string userId, out string orderid, out string roomnumber
   ) => (purchasedSeats, title, subtitle, amountPaid, userId, orderid, roomnumber) = (PurchasedSeats, Title, Subtitle,
        AmountPaid, UserId, OrderId, RoomNumber);
}