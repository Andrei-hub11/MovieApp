using Backend.Models;


namespace Backend.DTOs;

public record TicketDTO(string Title, decimal AmountPaid, EventDateTime EventDateTime, 
    string UserId, List<string> PurchasedSeats)
{
    public void Deconstruct(
     out List<string> purchasedSeats,
     out string title, out decimal amountPaid, out string userId
   ) => (purchasedSeats, title, amountPaid, userId) = (PurchasedSeats, Title, AmountPaid, UserId);
}