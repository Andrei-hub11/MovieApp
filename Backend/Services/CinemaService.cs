using Backend.Context;
using Backend.DTOs;
using Backend.Models;
using Backend.Services.Interfaces;
using ErrorOr;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using shortid;
using shortid.Configuration;
using System.Linq;
using Web_API_JWT.Exceptons;

namespace Backend.Services;

public class CinemaService : ICinema
{

    private readonly AppDBContext _context;
    private readonly AccountDBContext _accountDBContext;
    private readonly UserManager<ApplicationUser> _userManager;

    public CinemaService(AppDBContext context, AccountDBContext accountDBContext, UserManager<ApplicationUser> userManager) { 
        _context = context; 
        _accountDBContext = accountDBContext;
        _userManager = userManager;
    }


    public async Task<IEnumerable<RoomModel>> GetRoomsAsync()
    {

        

        return await _context.Room 
            .OrderBy(r => r.EventDateTime) 
            .ToListAsync();
    }

    public async Task<IEnumerable<RoomModel>> GetRoomsByMovieTitleAsync(string movieTitle)
    {

        return await _context.Room
         .Where(r => r.MovieTitle == movieTitle)
         .Include(r => r.Seats.OrderBy(s => s.SeatNumber))
         .OrderBy(r => r.EventDateTime)
         .ToListAsync();
    }


    public async Task<IEnumerable<GiftCardModel>> GetGiftCardsAsync()
    {

        return await _context.GiftCard.ToListAsync();
    }

    public async Task<string> GetOrderIdAsync()
    {
        return await Task.Run(() =>
        {
            var options = new GenerationOptions(useNumbers: true, length: 13);
            string id = ShortId.Generate(options);
            return "#" + id;
        });
    }
    public async Task<RoomModel> CreateRoomAsync(RoomModel room)
    {

        _context.Room.Add(room);
        await _context.SaveChangesAsync();
        return room;
    }

   public async Task<ErrorOr<TicketModel>> CreateTicketAsync(Guid roomId, TicketDTO ticket)
    {
        List<Error> errors = new();

        decimal amount = 0;
        var existingRoom = await _context.Room.FindAsync(roomId);
        var (purchasedSeats, title, amountPaid, userId) = ticket;

        var user = await _userManager.FindByIdAsync(userId);

        if (user == null)
        {
            errors.Add(
           Error.Validation(
               description: $"O usuário com o id {userId} não foi encontrado"
           )
       );
            return errors;
        }

        foreach (var seat in purchasedSeats)
        {
            var seatsInMemory = _context.Seats.ToList();
            var existingSeat = seatsInMemory.FirstOrDefault(s => 
            s.SeatNumber.Contains(seat) && s.RoomId == roomId);

            if (existingSeat == null) {
                errors.Add(
               Error.Validation(
                   description: $"O assento não foi encontrado"
               )
           );
                return errors;
            }

            if (existingSeat.IsReserved == true)
            {
                errors.Add(
             Error.Validation(
                 description: $"O assento já está reservado."
             )
         );
                return errors;
            }

            existingSeat.IsReserved = true;
            amount += existingSeat.SeatPrice;

        }

        var newTicket = new TicketModel
        {
            Title = title,
            AmountPaid = amount,
            UserId = userId,
            EventDateTime = ticket.EventDateTime,
            IsUsed = false,
            PurchasedSeats = purchasedSeats,
        };

        await _userManager.UpdateAsync(user);
        _accountDBContext.Tickets.Add(newTicket);
        await _accountDBContext.SaveChangesAsync();
        await _context.SaveChangesAsync();
        return newTicket;
    }

    public async Task<GiftCardModel> CreateGiftCodigoAsync()
    {
        var newGift = new GiftCardModel
        {

        };
        _context.GiftCard.Add(newGift);
        await _context.SaveChangesAsync();
        return newGift;
    }

    public async Task<ErrorOr<RoomModel>> UpdateRoomAsync(Guid roomId, RoomModel roomEdit)
    {
        List<Error> errors = new();
        
        var existingRoom = await _context.Room.FindAsync(roomId);

        if (existingRoom == null)
        {
            errors.Add(
            Error.Validation(
                description: $"A sala com o id {roomId} não foi encontrada"
            )
        );
            return errors;
        }


       existingRoom.RoomNumber = roomEdit.RoomNumber ?? existingRoom.RoomNumber;
        existingRoom.EventDateTime = roomEdit.EventDateTime ?? existingRoom.EventDateTime;

        await _context.SaveChangesAsync();
        return existingRoom;
    }

    public async Task<ErrorOr<Updated>> UseGiftCardAsync(Guid giftcode)
    {
        List<Error> errors = new();

        var gift = _context.GiftCard.
            FirstOrDefault(gift => gift.GiftCodigo == giftcode);

        if (gift == null)
        {
            errors.Add(
             Error.Validation(
                 description: $"O gift com o código {giftcode} não foi encontrado"
             )
         );
            return errors;
        }

        if (gift.IsUsed)
        {
            errors.Add(
            Error.Validation(
                description: $"O gift com o código {giftcode} já foi utilizado."
            )
        );
            return errors;
        }
        gift.IsUsed = true;

        await _context.SaveChangesAsync();
        return Result.Updated;
    }

   

    public async Task<ErrorOr<RoomModel>> AddSeatAsync(SeatModel seat)
    {
        List<Error> errors = new();

        var room = await _context.Room.FindAsync(seat.RoomId);
        if (room == null)
        {
            throw new NotFoundException($"A sala com o id {seat.RoomId} não foi encontrada");
        }

        //para evitar assentos duplicados enviados na solicitação
        var seenSeatNumbers = new HashSet<string>();


        foreach (var seatnumber in seat.SeatNumber)
        {
           
            var seatsInMemory = _context.Seats.ToList(); // Carrega todos os registros do banco de dados na memória

            var existingSeat = seatsInMemory.FirstOrDefault(s => s.SeatNumber.Contains(seatnumber) && s.RoomId == seat.RoomId);


            if (existingSeat != null || seenSeatNumbers.Contains(seatnumber))
            {
                errors.Add(
             Error.Validation(
                 description: $"Existem assentos duplicado na sala de id {seat.RoomId}"
             )
         );
                return errors;
            }

            seenSeatNumbers.Add(seatnumber);

            var newSeat = new SeatModel
            {
                SeatNumber = new List<string> { seatnumber },
                SeatPrice = seat.SeatPrice,
                RoomId = seat.RoomId,
                IsReserved = false // Os novos assentos são inicialmente não reservados
            };
            _context.Seats.Add(newSeat);

        }
        await _context.SaveChangesAsync();
        return room;
    }

    public async Task<ErrorOr<Deleted>> DeleteRoomAsync(Guid roomId)
    {
        List<Error> errors = new();

        var room = _context.Room.FirstOrDefault(r => r.Id == roomId);

        if (room == null)
        {
            errors.Add(
             Error.Validation(
                 description: $"A sala com o id {roomId} não foi encontrada"
             )
         );
            return errors;  
        }
         
        _context.Room.Remove(room);
        await _context.SaveChangesAsync();
        return Result.Deleted;
    }

   
}