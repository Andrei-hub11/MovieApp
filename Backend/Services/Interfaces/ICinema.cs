using Backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using ErrorOr;
using Backend.DTOs;

namespace Backend.Services.Interfaces;

public interface ICinema
{
    Task<IEnumerable<RoomModel>> GetRoomsAsync();
    Task<IEnumerable<RoomModel>> GetRoomsByMovieTitleAsync( string movieTitle);
    Task<IEnumerable<GiftCardModel>> GetGiftCardsAsync();
    Task<string> GetOrderIdAsync();
    Task<RoomModel> CreateRoomAsync(RoomModel room);
    Task<ErrorOr<TicketModel>> CreateTicketAsync(Guid roomId, TicketDTO ticket);
    Task<GiftCardModel> CreateGiftCodigoAsync();
    Task<ErrorOr<RoomModel>> UpdateRoomAsync(Guid roomId, RoomModel roomEdit);
    Task<ErrorOr<Updated>> UseGiftCardAsync(Guid giftcode);
    Task<ErrorOr<RoomModel>> AddSeatAsync(SeatModel seat);
    Task<ErrorOr<Deleted>> DeleteRoomAsync(Guid roomId);
}
